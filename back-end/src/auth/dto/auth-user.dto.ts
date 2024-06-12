import { IsEmail, IsStrongPassword } from "class-validator";

export class AuthUserDTO
{
  @IsEmail()
  email: string

  @IsStrongPassword()
  password: string
}