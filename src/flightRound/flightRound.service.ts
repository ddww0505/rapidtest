import { Injectable } from '@nestjs/common';
import axios, { Method } from 'axios';
import { RateLimiterMemory } from 'rate-limiter-flexible';

const rateLimiter = new RateLimiterMemory({
  points: 1, // Number of points
  duration: 1, // Per second
});

@Injectable()
export class FlightRoundService {
  private readonly apiUrl = 'https://sky-scanner3.p.rapidapi.com/flights/search-roundtrip';
  private readonly apiHost = 'sky-scanner3.p.rapidapi.com';
  private readonly apiKey = '715696da99msh4eb66db00001963p17718bjsneb0c681d5fa1';

  async fetchRoundFlights(fromEntityId: string, toEntityId: string, departDate: string, returnDate: string, adults: number, children: number, cabinClass: string): Promise<any> {
    try {
      await rateLimiter.consume('flightSearch', 1); // Consume 1 point per request

      const options = {
        method: 'GET' as Method,
        url: this.apiUrl,
        params: {
          fromEntityId: fromEntityId,
          toEntityId: toEntityId,
          departDate: departDate,
          returnDate: returnDate,
          adults: adults,
          children: children,
          cabinClass: cabinClass,
        },
        headers: {
          'x-rapidapi-host': this.apiHost,
          'x-rapidapi-key': this.apiKey,
        },
      };

      const response = await axios.request(options);
      console.log('Round Flight Search Response:', response.data);
      return response.data;
    } catch (error) {
      console.error('Error fetching round flights:', error);
      throw new Error('Failed to fetch round flights');
    }
  }
}

