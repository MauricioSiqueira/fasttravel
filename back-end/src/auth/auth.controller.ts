import { Body, Controller, Post } from '@nestjs/common';
import { createUserDTO } from './dto/create-user.dto';
import { AuthService } from './auth.service';
import { SkipAuth } from './decorators/skip_auth.decorator';
import { AuthUserDTO } from './dto/auth-user.dto';

@Controller('/auth')
export class AuthController
{
  constructor( private readonly auth_service: AuthService ){}

  @SkipAuth()
  @Post( '/sign_up' )
  sign_up( @Body() create_user_dto: createUserDTO )
  {
    return this.auth_service.create_user( create_user_dto );
  }

  @SkipAuth()
  @Post( '/sign_in' )
  sign_in( @Body() auth_user_dto: AuthUserDTO )
  {
    return this.auth_service.validate_user( auth_user_dto );
  }
}
