// flight.module.ts
import { Module } from '@nestjs/common';
import { FlightRoundService } from './flightRound.service';
import { FlightRoundController } from './flightRound.controller';

@Module({
  controllers: [FlightRoundController],
  providers: [FlightRoundService],
})
export class FlightRoundModule {}