import { Injectable } from '@nestjs/common';
import axios, { Method } from 'axios';
import { RateLimiterMemory } from 'rate-limiter-flexible';

const rateLimiter = new RateLimiterMemory({
  points: 10, // Number of points
  duration: 1, // Per second
});

@Injectable()
export class FlightService {
  private readonly apiUrl = 'https://sky-scanner3.p.rapidapi.com/flights/search-one-way';
  private readonly apiHost = 'sky-scanner3.p.rapidapi.com';
  private readonly apiKey = '715696da99msh4eb66db00001963p17718bjsneb0c681d5fa1';

  async fetchOneWayFlights(fromEntityId: string, toEntityId: string, departDate: string, adults: number, children: number, cabinClass: string): Promise<any> {
    try {
      await rateLimiter.consume('flightSearch', 1); // Consume 1 point per request

      const options = {
        method: 'GET' as Method,
        url: this.apiUrl,
        params: {
          fromEntityId: fromEntityId,
          toEntityId: toEntityId,
          departDate: departDate,
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
      console.log('One-Way Flight Search Response:', response.data);
      return response.data;
    } catch (error) {
      console.error('Error fetching one-way flights:', error);
      throw new Error('Failed to fetch one-way flights');
    }
  }
}

