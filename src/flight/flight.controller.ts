import { Body, Controller, Get, Query } from '@nestjs/common';
import { FlightService } from './flight.service';
import { FlightDto } from './dtos/flight.dto';


@Controller('flights')
export class FlightController {
  constructor(private readonly flightService: FlightService) {}

  @Get('/search-one-way')
  async searchOneWayFlights(@Body() query: FlightDto){
    return this.flightService.fetchOneWayFlights(query);
  }
}
