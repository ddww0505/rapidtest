// flight.controller.ts
import { Controller, Get, Query } from '@nestjs/common';
import { FlightRoundService } from './flightRound.service';

@Controller('flights')
export class FlightRoundController {
  constructor(private readonly flightRoundService: FlightRoundService) {}

  @Get('search-roundtrip')
  async searchRoundTrip(
    @Query('fromEntityId') fromEntityId: string,
    @Query('toEntityId') toEntityId: string,
    @Query('departDate') departDate: string,
    @Query('returnDate') returnDate: string,
    @Query('adults') adults: number,
    @Query('children') children: number,
    @Query('cabinClass') cabinClass: string,
  ): Promise<any> {
    return this.flightRoundService.fetchRoundFlights(fromEntityId, toEntityId, departDate, returnDate, adults, children, cabinClass);
  }
}