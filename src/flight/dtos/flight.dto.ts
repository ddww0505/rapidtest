import { IsNumber, IsString, IsOptional } from "class-validator";

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
  @IsString()
  responseType?: 'original' | 'sorted' | 'both';

  @IsOptional()
  @IsNumber()
  expectedMoney?: number;    //still doing
}