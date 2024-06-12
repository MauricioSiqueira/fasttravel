import { BadRequestException, Injectable, Logger } from '@nestjs/common';
import { JWTPayloadInterface } from 'src/auth/entities/jwt-payload.interface';
import { CreateTravelDTO } from './dto/create-travel.dto';
import { PrismaService } from 'src/prisma/prisma.service';

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
}
