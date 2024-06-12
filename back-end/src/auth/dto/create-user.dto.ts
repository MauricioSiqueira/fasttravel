import { IsEmail, IsOptional, IsString, IsStrongPassword } from "class-validator";

export class createUserDTO
{
  @IsOptional()
  @IsString()
  name: string

  @IsEmail()
  email: string

  @IsStrongPassword()
  password: string
}