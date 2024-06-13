import { BadRequestException, Injectable, Logger, NotFoundException } from '@nestjs/common';
import { JWTPayloadInterface } from 'src/auth/entities/jwt-payload.interface';
import { CreateTravelDTO } from './dto/create-travel.dto';
import { PrismaService } from 'src/prisma/prisma.service';
import { UpdateTravelDTO } from './dto/update-travel.dto';
import { SearchTravelDTO } from './dto/search-travel.dto';

@Injectable()
export class TravelsService
{
  private logger = new Logger( 'TravelService' );
  constructor( private readonly prisma: PrismaService ){}

  async create_travel( user: JWTPayloadInterface, create_travel_dto: CreateTravelDTO )
  {
    const { startDate, endDate } = create_travel_dto;

    this.check_valid_isodatetime( startDate );
    this.check_valid_isodatetime( endDate );

    const travel = await this.prisma.travel.create({
      data: {
        ...create_travel_dto,
        user: { connect: { id: user.sub } }
      }
    });

    this.logger.verbose(`User ${user.name} will travel!\nData: ${JSON.stringify(create_travel_dto)}`);
    return travel;
  }

  async get_user_travels( user: JWTPayloadInterface, filter_dto: SearchTravelDTO )
  {
    const { search, startDate, endDate } = filter_dto;

    const query: any = {
      userId: user.sub
    }

    if ( search )
    {
      query.OR = [
        { description: { contains: search, mode: 'insensitive' } },
        { name: { contains: search, mode: 'insensitive' } }
      ]
    }

    if ( startDate || endDate )
    {
      query.AND = [];
      
      if ( startDate )
      {
        query.AND.push( { startDate: { gte: startDate } } );
      }

      if ( endDate )
      {
        query.AND.push( { endDate: { lte: endDate } } )
      }
    }

    const travels = await this.prisma.travel.findMany({ 
      where: query,
      select: { id: true, name:true, description: true, startDate: true, endDate: true } 
    });

    return travels;
  }

  async get_travel_by_id( user: JWTPayloadInterface, id: string )
  {
    const travel = await this.prisma.travel.findUnique({ 
      where: { userId: user.sub, id }, 
      select: { id: true, name:true, description: true, startDate: true, endDate: true } 
    });

    if ( !travel )
    {
      throw new NotFoundException(`We couldn't find your trip`);
    }

    return travel;
  }

  async update_travel( user: JWTPayloadInterface, id: string, update_travel_dto: UpdateTravelDTO )
  {
    if ( update_travel_dto?.startDate )
      this.check_valid_isodatetime( update_travel_dto?.startDate );
    if ( update_travel_dto?.endDate )
      this.check_valid_isodatetime( update_travel_dto?.endDate );
    
    let travel;
    try
    {
      travel = await this.prisma.travel.update({
        where: { userId: user.sub, id },
        data: update_travel_dto
      });
    }
    catch ( error )
    {
      throw new NotFoundException("We couldn't find this travel");
    }
  
    this.logger.verbose(`User ${user.name} updated travel: ${id}. Data: ${JSON.stringify(update_travel_dto)}`);
    return travel;
  }

  async delete_travel( user: JWTPayloadInterface, id: string )
  {
    try
    {
      await this.prisma.travel.delete( { where: { userId: user.sub, id: id } } );
    }
    catch ( error )
    {
      throw new NotFoundException("Can't delete, travel not found");
    }
  }

  private check_valid_isodatetime( start_date: string )
  {
    const iso_datetime_regex = /^(\d{4})-(\d{2})-(\d{2})[T](\d{2}):(\d{2}):(\d{2})(\.\d+)?(Z|([+-]\d{2}:\d{2}))$/;
    
    if ( !iso_datetime_regex.test( start_date ) )
    {
      throw new BadRequestException(`Dates should be in YYYY-MM-DDTHH:MM:SS.sssZ format. Example: 2024-06-12T14:30:00Z`)
    }
  }
}
