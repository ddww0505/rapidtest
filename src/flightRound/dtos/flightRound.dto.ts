import { IsNumber, IsString } from "class-validator";
import { Min, IsOptional, IsDateString, IsBoolean } from "class-validator";

export class FlightRoundDto{
  @IsString()
  fromEntityId: string;

  @IsString()
  toEntityId: string;

  @IsString()
  departDate: string;

  @IsString()
  returnDate: string;

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

  @IsOptional()
  @IsNumber()
  minDuration?: number;

  @IsOptional()
  @IsNumber()
  maxDuration?: number;

  @IsOptional()
  @IsDateString()
  minDeparture?: string;

  @IsOptional()
  @IsDateString()
  maxDeparture?: string;

  @IsOptional()
  @IsDateString()
  minArrival?: string;

  @IsOptional()
  @IsDateString()
  maxArrival?: string;
}