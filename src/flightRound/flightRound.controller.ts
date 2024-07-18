// flight.controller.ts
import { Controller, Get, Body } from '@nestjs/common';
import { FlightRoundService } from './flightRound.service';
import { FlightRoundDto } from './dtos/flightRound.dto';

@Controller('flights')
export class FlightRoundController {
  constructor(private readonly flightRoundService: FlightRoundService) {}

  @Get('search-roundtrip')
  async searchRoundTrip(@Body() query: FlightRoundDto){
    return this.flightRoundService.fetchRoundFlights(query);
  }
}


