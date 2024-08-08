import { Injectable } from '@nestjs/common';
import axios, { Method } from 'axios';
import { FlightDto } from './dtos/flight.dto';

@Injectable()
export class FlightService {
  private readonly apiUrl = 'https://sky-scanner3.p.rapidapi.com/flights/search-one-way';
  private readonly apiHost = 'sky-scanner3.p.rapidapi.com';
  // private readonly apiKey = '715696da99msh4eb66db00001963p17718bjsneb0c681d5fa1';
  // private readonly apiKey = '574679b39emsh4ab6b34a8e5646bp1b5f4ajsn38891a3a3403';
  private readonly apiKey = 'c033ec79demshb519127d006c588p126f0ajsna590df900cea';

  async fetchOneWayFlights(params: FlightDto): Promise<any> {
    try {
      console.log('Request Params:', params);

      const options = {
        method: 'GET' as Method,
        url: this.apiUrl,
        params: {
          fromEntityId: params.fromEntityId,
          toEntityId: params.toEntityId,
          departDate: params.departDate,
          adults: params.adults,
          children: params.children,
          cabinClass: params.cabinClass,
        },
        headers: {
          'x-rapidapi-host': this.apiHost,
          'x-rapidapi-key': this.apiKey,
        },
      };

      // Fetch flight data from the API
      const response = await axios.request(options);
      console.log('One-Way Flight Search Response:', response.data);

      const originalResponse = response.data;
      const sortedFlights = this.sortFlightsByPrice(response.data);

      if (params.sorted === true) {
        return sortedFlights;
      } 
    
      return originalResponse; // Default to original if no responseType specified
    } catch (error) {
      console.error('Error fetching one-way flights:', error.response ? error.response.data : error.message);
      throw new Error('Failed to fetch one-way flights');
    }
  }

  private sortFlightsByPrice(data: any): any {
    if (data && data.data && data.data.itineraries && Array.isArray(data.data.itineraries) && data.data.itineraries.length > 0) {
      const sortedItineraries = data.data.itineraries
        .map((itinerary: any) => ({
          id: itinerary.id,
          price: itinerary.price.raw,
        }))
        .sort((a: any, b: any) => a.price - b.price); // Sort by price descending
  
      return {
        itineraries: sortedItineraries,
      };
    }
  
    // Return empty itineraries array if no itineraries are present
    return {
      itineraries: []
    };
  }
  
}