import { Injectable } from '@angular/core';
import * as moment from 'moment';

@Injectable({
  providedIn: 'root'
})
export class FlightService {

  constructor() { }

  private parseMillisecondsIntoReadableTime(milliseconds){
    const hours = milliseconds / (1000*60*60);
    const absoluteHours = Math.floor(hours);
    const h = absoluteHours > 9 ? absoluteHours : '0' + absoluteHours;

    //Get remainder from hours and convert to minutes
    const minutes = (hours - absoluteHours) * 60;
    const absoluteMinutes = Math.floor(minutes);
    const m = absoluteMinutes > 9 ? absoluteMinutes : '0' +  absoluteMinutes;

    //Get remainder from minutes and convert to seconds
    const seconds = (minutes - absoluteMinutes) * 60;
    const absoluteSeconds = Math.floor(seconds);
    const s = absoluteSeconds > 9 ? absoluteSeconds : '0' + absoluteSeconds;

    return h + 'h' + " " + m + 'm';
  };

  public calculateDuration(flightDataGoing: any[]): any[] {
    flightDataGoing = flightDataGoing.map(flight => {
      const time1 = moment(flight.item.arrivalDt);
      const time2 = moment(flight.item.departureDt);
      
      const duration = moment.duration(time1.diff(time2));
      const milliseconds = duration.asMilliseconds();    
      
      //Function to get duration in hours, minutes and seconds
      const finalTime = this.parseMillisecondsIntoReadableTime(milliseconds);
      flight.item.duration = finalTime; 

      return flight;
    });
    return flightDataGoing;
  }
  
}
