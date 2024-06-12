import { Body, Controller, Post } from '@nestjs/common';
import { createUserDTO } from './dto/create-user.dto';
import { AuthService } from './auth.service';

@Controller('/auth')
export class AuthController
{
  constructor( private readonly auth_service: AuthService ){}

  @Post( '/sign_up' )
  sign_up( @Body() create_user_dto: createUserDTO )
  {
    return this.auth_service.create_user( create_user_dto );
  }
}
