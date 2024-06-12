import { Body, Controller, Get, Param, Patch, Post } from '@nestjs/common';
import { GetUser } from 'src/auth/decorators/get_user.decorator';
import { JWTPayloadInterface } from 'src/auth/entities/jwt-payload.interface';
import { TravelsService } from './travels.service';
import { CreateTravelDTO } from './dto/create-travel.dto';
import { UpdateTravelDTO } from './dto/update-travel.dto';

@Controller( '/travels' )
export class TravelsController
{
  constructor( private readonly travel_service: TravelsService ){}

  @Post()
  create_travel( @GetUser() user: JWTPayloadInterface, @Body() create_travel_dto: CreateTravelDTO )
  {
    return this.travel_service.create_travel( user, create_travel_dto );
  }

  @Get()
  get_user_travels( @GetUser() user: JWTPayloadInterface )
  {
    return this.travel_service.get_user_travels( user );
  }

  @Get( '/:id' )
  get_travel_detail( @GetUser() user: JWTPayloadInterface, @Param( 'id' ) id: string )
  {
    return this.travel_service.get_travel_by_id( user, id );
  }

  @Patch( '/:id' )
  update_travel_details( 
    @GetUser() user: JWTPayloadInterface, 
    @Param( 'id' ) id: string, 
    @Body() update_travel_dto: UpdateTravelDTO
  )
  {
    return this.travel_service.update_travel( user, id, update_travel_dto );
  }
}
