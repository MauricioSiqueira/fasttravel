import { Injectable } from '@nestjs/common';
import { createUserDTO } from './dto/create-user.dto';
import { PrismaService } from 'src/prisma/prisma.service';
import { hash } from 'bcrypt';

@Injectable()
export class AuthService
{
  constructor( private readonly prisma: PrismaService ){}

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
}
