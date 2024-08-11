import { Injectable } from '@nestjs/common';
import axios, { Method } from 'axios';
import { FlightDto } from './dtos/flight.dto';

@Injectable()
export class FlightService {
  private readonly apiUrl = 'https://sky-scanner3.p.rapidapi.com/flights/search-one-way';
  private readonly apiHost = 'sky-scanner3.p.rapidapi.com';
  private readonly apiKey = '715696da99msh4eb66db00001963p17718bjsneb0c681d5fa1';
  //private readonly apiKey = '574679b39emsh4ab6b34a8e5646bp1b5f4ajsn38891a3a3403';
  //private readonly apiKey = 'c033ec79demshb519127d006c588p126f0ajsna590df900cea';

  async fetchOneWayFlights(params: FlightDto): Promise<any> {
    try {
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
  
      // Extract sessionId from the response
      const sessionId = response.data.data?.context?.sessionId;
      if (!sessionId) {
        throw new Error('Session ID not found in response');
      }
  
      // Fetch additional details using sessionId
      const incompleteFlightDetails = await this.fetchIncompleteFlightDetails(sessionId);
  
      // Process and return the combined results
      let filteredFlights = this.filterFlightsByPrice(incompleteFlightDetails, params.minPrice, params.maxPrice);
      const sortedFlights = this.sortFlightsByPrice(filteredFlights);
  
      if (params.sorted === true) {
        return sortedFlights;
      }
      
      return filteredFlights;

    } catch (error) {
      console.error('Error fetching one-way flights:', error.response ? error.response.data : error.message);
      throw new Error('Failed to fetch one-way flights');
    }
  }  

  private async fetchIncompleteFlightDetails(sessionId: string): Promise<any> {
    const options = {
      method: 'GET' as Method,
      url: 'https://sky-scanner3.p.rapidapi.com/flights/search-incomplete',
      params: { sessionId },
      headers: {
        'x-rapidapi-host': this.apiHost,
        'x-rapidapi-key': this.apiKey,
      },
    };

    try {
      const response = await axios.request(options);
      console.log('Incomplete Flight Details:', response.data);
      return response.data;
    } catch (error) {
      console.error('Error fetching incomplete flight details:', error.response ? error.response.data : error.message);
      throw new Error('Failed to fetch incomplete flight details');
    }
  }

  private sortFlightsByPrice(data: any): any {
    if (data && data.data && data.data.itineraries && Array.isArray(data.data.itineraries) && data.data.itineraries.length > 0) {
      const sortedItineraries = data.data.itineraries
        .map((itinerary: any) => ({
          id: itinerary.id,
          price: itinerary.price.raw,
          departure: itinerary.legs[0].departure,
          arrival: itinerary.legs[0].arrival,
          durationInMinutes: itinerary.legs[0].durationInMinutes,
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
 
  private filterFlightsByPrice(data: any, minPrice?: number, maxPrice?: number): any {
    if (data && data.data && data.data.itineraries && Array.isArray(data.data.itineraries)) {
      // 如果沒有提供 minPrice 和 maxPrice，返回原始結果
      if (minPrice === undefined && maxPrice === undefined) {
        return data;
      }
      
      const filteredItineraries = data.data.itineraries.filter((itinerary: any) => {
        const price = itinerary.price.raw;
        return (!minPrice || price >= minPrice) && (!maxPrice || price <= maxPrice);
      });
  
      return {
        ...data,
        data: {
          ...data.data,
          itineraries: filteredItineraries,
        },
      };
    }
  
    // 返回空的 itineraries 如果沒有找到任何數據
    return {
      ...data,
      data: {
        itineraries: [],
      },
    };
  }
}