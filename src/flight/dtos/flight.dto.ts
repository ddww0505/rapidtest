import { IsNumber, IsString, IsOptional, IsBoolean } from "class-validator";
import { Min } from "class-validator";

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
  stops?: 'direct' | '1stop' | '2stops';

  @IsOptional()
  @IsBoolean()
  sorted?: boolean;

  @IsOptional()
  @IsNumber()
  @Min(0)
  minPrice?: number; // Optional minimum price

  @IsOptional()
  @IsNumber()
  @Min(0)
  maxPrice?: number; // Optional maximum price
}