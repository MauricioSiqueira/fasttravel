import { BadRequestException, Injectable, Logger, NotFoundException } from '@nestjs/common';
import { JWTPayloadInterface } from 'src/auth/entities/jwt-payload.interface';
import { CreateTravelDTO } from './dto/create-travel.dto';
import { PrismaService } from 'src/prisma/prisma.service';
import { NotFoundError } from 'rxjs';

@Injectable()
export class TravelsService
{
  private logger = new Logger( 'TravelService' );
  constructor( private readonly prisma: PrismaService ){}

  async create_travel( user: JWTPayloadInterface, create_travel_dto: CreateTravelDTO )
  {
    const { startDate, endDate } = create_travel_dto;
    
    const iso_datetime_regex = /^(\d{4})-(\d{2})-(\d{2})[T](\d{2}):(\d{2}):(\d{2})(\.\d+)?(Z|([+-]\d{2}:\d{2}))$/;
    
    if ( !iso_datetime_regex.test( startDate ) || !iso_datetime_regex.test( endDate ) )
    {
      throw new BadRequestException(`Dates should be in YYYY-MM-DDTHH:MM:SS.sssZ format. Example: 2024-06-12T14:30:00Z`)
    }

    const travel = await this.prisma.travel.create({
      data: {
        ...create_travel_dto,
        user: { connect: { id: user.sub } }
      }
    });

    this.logger.verbose(`User ${user.name} will travel!\nData: ${JSON.stringify(create_travel_dto)}`);
    return travel;
  }

  async get_user_travels( user: JWTPayloadInterface )
  {
    const travels = await this.prisma.travel.findMany({ 
      where: { userId: user.sub }, 
      select: { id: true, name:true, description: true, startDate: true, endDate: true } 
    });

    this.logger.verbose(`User ${user.name} requested own travels`);
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

    this.logger.verbose(`User ${user.name} requested travel of id ${id}`);
    return travel;
  }
}
