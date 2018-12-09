import { Component, OnInit, Input } from '@angular/core';
import { MockFlightJSONService } from '../../services/mock-flight-json.service';
import * as moment from 'moment';

@Component({
  selector: 'app-one-way-journey-details-component',
  templateUrl: './one-way-journey-details-component.component.html',
  styleUrls: ['./one-way-journey-details-component.component.scss']
})
export class OneWayJourneyDetailsComponentComponent implements OnInit {

  @Input() flightDataGoing: any;
  @Input() passengersGoing: any;
  finalTime: string;
  totalDuration: any;

  noOfFlights: any;
  displayTotalFareGoing: boolean;

  constructor(private MockFlightJSONService: MockFlightJSONService) { }
  
  ngOnInit() {
        var flightDuration = [];
        for (let i in this.flightDataGoing) {

          var time1 = moment(this.flightDataGoing[i].arrivalTime, 'HH:mm');
          var time2 = moment(this.flightDataGoing[i].departureTime, 'HH:mm');
          var duration = moment.duration(time1.diff(time2));
          var milliseconds = duration.asMilliseconds();    
         
          //Function to get duration in hours, minutes and seconds
          this.finalTime = this.parseMillisecondsIntoReadableTime(milliseconds);
          
          flightDuration.push(this.finalTime);      
          this.totalDuration = flightDuration;
          this.flightDataGoing[i]["timeDuration"] = this.totalDuration[i];  

          this.noOfFlights = this.flightDataGoing.length;
        }
      }

  public parseMillisecondsIntoReadableTime(milliseconds){
    var hours = milliseconds / (1000*60*60);
    var absoluteHours = Math.floor(hours);
    var h = absoluteHours > 9 ? absoluteHours : '0' + absoluteHours;

    //Get remainder from hours and convert to minutes
    var minutes = (hours - absoluteHours) * 60;
    var absoluteMinutes = Math.floor(minutes);
    var m = absoluteMinutes > 9 ? absoluteMinutes : '0' +  absoluteMinutes;

    //Get remainder from minutes and convert to seconds
    var seconds = (minutes - absoluteMinutes) * 60;
    var absoluteSeconds = Math.floor(seconds);
    var s = absoluteSeconds > 9 ? absoluteSeconds : '0' + absoluteSeconds;

    return h + 'h' + " " + m + 'm';
  };

  public bookFlight(index) {
    this.displayTotalFareGoing = true; 
  }                  
}

