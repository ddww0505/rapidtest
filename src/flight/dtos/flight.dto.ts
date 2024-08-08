import { IsNumber, IsString, IsOptional, IsBoolean } from "class-validator";

export class FlightDto{
  @IsString()
  fromEntityId: string;

  @IsString()
  toEntityId: string;

  @IsString()
  departDate: string;

  @IsNumber()
  adults: number;

  @IsNumber()
  children: number;

  @IsString()
  cabinClass: string;

  @IsOptional()
  @IsBoolean()
  sorted?: boolean;

  @IsOptional()
  @IsNumber()
  expectedMoney?: number;    //still doing
}