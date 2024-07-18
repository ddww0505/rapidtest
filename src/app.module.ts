import { Module } from '@nestjs/common';
import { FlightModule } from './flight/flight.module';
import { FlightRoundModule } from './flightRound/flightRound.module';

@Module({
  imports: [FlightModule, FlightRoundModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
