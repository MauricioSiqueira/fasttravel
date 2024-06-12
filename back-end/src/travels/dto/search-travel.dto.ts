import { IsISO8601, IsOptional, IsString } from "class-validator";

export class SearchTravelDTO
{
  @IsOptional()
  @IsString()
  search: string

  @IsOptional()
  @IsISO8601()
  date: string
}