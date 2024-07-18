// flight.controller.ts
import { Controller, Get, Query } from '@nestjs/common';
import { FlightService } from './flight.service';

@Controller('flights')
export class FlightController {
  constructor(private readonly flightService: FlightService) {}

  @Get('search-one-way')
  async searchOneWayFlights(
    @Query('fromEntityId') fromEntityId: string,
    @Query('toEntityId') toEntityId: string,
    @Query('departDate') departDate: string,
    @Query('adults') adults: number,
    @Query('children') children: number,
    @Query('cabinClass') cabinClass: string,
  ): Promise<any> {
    return this.flightService.fetchOneWayFlights(fromEntityId, toEntityId, departDate, adults, children, cabinClass);
  }
}
