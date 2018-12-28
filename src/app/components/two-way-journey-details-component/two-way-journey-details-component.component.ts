import { Component, OnInit, Input } from '@angular/core';
import * as moment from 'moment';

@Component({
  selector: 'app-two-way-journey-details-component',
  templateUrl: './two-way-journey-details-component.component.html',
  styleUrls: ['./two-way-journey-details-component.component.scss']
})
export class TwoWayJourneyDetailsComponentComponent implements OnInit {

  @Input() flightDataGoing: any;
  @Input() flightDataComing: any;
  @Input() passengersGoing: any;
  @Input() passengersComing: any;

  totalDurationGoing: any;
  totalDurationComing: any[];
  noOfFlightsGoing: any;
  noOfFlightsComing: any;
  finalTimeGoing: string;
  finalTimeComing: string;
  displayTotalFareGoing: boolean;
  displayTotalFareComing: boolean;

  constructor() { }
  
  ngOnInit() {

    var flightDuration = [];

    for (let i in this.flightDataGoing) {
     var time1 = moment(this.flightDataGoing[i].arrivalTime, 'HH:mm');
     var time2 = moment(this.flightDataGoing[i].departureTime, 'HH:mm');
     var duration = moment.duration(time1.diff(time2));
     var milliseconds = duration.asMilliseconds();
  
     //Function to get duration in hours, minutes and seconds
     this.finalTimeGoing = this.parseMillisecondsIntoReadableTime(milliseconds);
  
     flightDuration.push(this.finalTimeGoing);
     this.totalDurationGoing = flightDuration;
     this.flightDataGoing[i]["timeDuration"] = this.totalDurationGoing[i];

     this.noOfFlightsGoing = this.flightDataGoing.length;
    }
  
    var flightDuration2 = [];
    for (let i in this.flightDataComing) {
     var time3 = moment(this.flightDataComing[i].arrivalTime, 'HH:mm');
     var time4 = moment(this.flightDataComing[i].departureTime, 'HH:mm');
     var duration = moment.duration(time3.diff(time4));
     var milliseconds = duration.asMilliseconds();
  
     //Function to get duration in hoursminutes and seconds
     this.finalTimeComing = this.parseMillisecondsIntoReadableTime(milliseconds);
  
     flightDuration2.push(this.finalTimeComing);
     this.totalDurationComing = flightDuration2;
     this.flightDataComing[i]["timeDuration2"] = this.totalDurationComing[i];
     
     this.noOfFlightsComing = this.flightDataComing.length;
    }
   }
  
   parseMillisecondsIntoReadableTime(milliseconds) {
    var hours = milliseconds / (1000 * 60 * 60);
    var absoluteHours = Math.floor(hours);
    var h = absoluteHours > 9 ? absoluteHours : '0' + absoluteHours;
  
    //Get remainder from hours and convert to minutes
    var minutes = (hours - absoluteHours) * 60;
    var absoluteMinutes = Math.floor(minutes);
    var m = absoluteMinutes > 9 ? absoluteMinutes : '0' + absoluteMinutes;
  
    //Get remainder from minutes and convert to seconds
    var seconds = (minutes - absoluteMinutes) * 60;
    var absoluteSeconds = Math.floor(seconds);
    var s = absoluteSeconds > 9 ? absoluteSeconds : '0' + absoluteSeconds;
  
    return h + 'h' + " " + m + 'm';
   };
  
   bookFlightGoing(flight) {
    flight.displayTotalFareGoing = !flight.displayTotalFareGoing;
   }
  
   bookFlightComing(flight2) {
    flight2.displayTotalFareComing = !flight2.displayTotalFareComing;
   }
   }
