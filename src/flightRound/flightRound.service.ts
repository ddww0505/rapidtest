import { Injectable } from '@nestjs/common';
import axios, { Method } from 'axios';
import { FlightRoundDto } from './dtos/flightRound.dto';

@Injectable()
export class FlightRoundService {
  private readonly apiUrl = 'https://sky-scanner3.p.rapidapi.com/flights/search-roundtrip';
  private readonly apiHost = 'sky-scanner3.p.rapidapi.com';
  // private readonly apiKey = '715696da99msh4eb66db00001963p17718bjsneb0c681d5fa1';
  // private readonly apiKey = '574679b39emsh4ab6b34a8e5646bp1b5f4ajsn38891a3a3403';
  private readonly apiKey = 'c033ec79demshb519127d006c588p126f0ajsna590df900cea';

  async fetchRoundFlights(params: FlightRoundDto): Promise<any> {
    try {
      console.log('Request Params:', params);

      const options = {
        method: 'GET' as Method,
        url: this.apiUrl,
        params,
        headers: {
          'x-rapidapi-host': this.apiHost,
          'x-rapidapi-key': this.apiKey,
        },
      };

      const response = await axios.request(options);
      console.log('One-Way Flight Search Response:', response.data);
      return response.data;
    } catch (error) {
      console.error('Error fetching one-way flights:', error.response ? error.response.data : error.message);
      throw new Error('Failed to fetch one-way flights');
    }
  }
}

    
