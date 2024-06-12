import { Body, Controller, Post } from '@nestjs/common';
import { GetUser } from 'src/auth/decorators/get_user.decorator';
import { JWTPayloadInterface } from 'src/auth/entities/jwt-payload.interface';
import { TravelsService } from './travels.service';
import { CreateTravelDTO } from './dto/create-travel.dto';

@Controller( '/travels' )
export class TravelsController
{
  constructor( private readonly travel_service: TravelsService ){}

  @Post()
  create_travel( @GetUser() user: JWTPayloadInterface, @Body() create_travel_dto: CreateTravelDTO )
  {
    return this.travel_service.create_travel( user, create_travel_dto );
  }
}
