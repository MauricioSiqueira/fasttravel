import { IsDateString, IsISO8601, IsOptional, IsString } from "class-validator";

export class CreateTravelDTO
{
  @IsString()
  name: string

  @IsOptional()
  @IsString()
  description: string

  @IsISO8601({ strict: true })
  startDate: string

  @IsISO8601({ strict: true })
  endDate: string
}