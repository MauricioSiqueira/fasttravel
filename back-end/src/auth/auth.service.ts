import { Injectable, UnauthorizedException } from '@nestjs/common';
import { createUserDTO } from './dto/create-user.dto';
import { PrismaService } from 'src/prisma/prisma.service';
import { compare, hash } from 'bcrypt';
import { AuthUserDTO } from './dto/auth-user.dto';
import { JwtService } from '@nestjs/jwt';
import { JWTPayloadInterface } from './entities/jwt-payload.interface';

@Injectable()
export class AuthService
{
  constructor( private readonly prisma: PrismaService, private readonly jwt_service: JwtService ){}

  async create_user( create_user_dto: createUserDTO )
  {
    const user = this.prisma.user.create({
      data: {
        ...create_user_dto,
        password: await hash( create_user_dto.password, 10 )
      },
      select: {
        id: true,
        name: true,
        email: true
      }
    });

    return user;
  }

  async validate_user( auth_user_dto: AuthUserDTO )
  {
    const { email, password } = auth_user_dto;

    const user = await this.prisma.user.findUnique( { where: { email: email } } );

    if ( user && await compare( password, user.password ) )
    {
      const payload: JWTPayloadInterface = { sub: user.id, email: email, name: user.name };
      return { 
        user_id: user.id, 
        name: user.name, 
        access_token: await this.jwt_service.signAsync( payload ) 
      };
    }
    
    throw new UnauthorizedException('Invalid credentials');
  }

  
}
