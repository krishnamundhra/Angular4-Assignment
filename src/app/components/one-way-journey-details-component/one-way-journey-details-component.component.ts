import { Component, OnInit, Input } from '@angular/core';
import { FlightService } from 'src/app/services/flight.service';
import * as moment from 'moment';

@Component({
  selector: 'app-one-way-journey-details-component',
  templateUrl: './one-way-journey-details-component.component.html',
  styleUrls: ['./one-way-journey-details-component.component.scss']
})
export class OneWayJourneyDetailsComponentComponent {

  //@Input() flightDataGoing: any;
  //@Input() passengersGoing: any;
  //finalTime: string;
  //noOfFlightsGoing: any;
  //displayTotalFareGoing: boolean;
  showFlightDetails: boolean;
  multipleData: any;

  @Input() flightDataGoing: any;
  @Input() flightDataComing: any;
  @Input() passengersGoing: any;
  @Input() passengersComing: any;

  //totalDurationGoing: any;
  //totalDurationComing: any[];
  noOfFlightsGoing: any;
  noOfFlightsComing: any;
  //finalTimeGoing: string;
  //finalTimeComing: string;
  displayTotalFareGoing: boolean;
  displayTotalFareComing: boolean;

  constructor(private flightService: FlightService) { }

  ngOnChanges() {
    
    if(this.flightDataGoing){
      this.flightDataGoing = this.flightService.calculateDuration(this.flightDataGoing);
      this.noOfFlightsGoing = this.flightDataGoing.length;
    }
   else  {
    this.flightDataComing = this.flightService.calculateDuration2(this.flightDataComing);
    this.noOfFlightsComing = this.flightDataComing.length;
    
   }
  }



  showMultipleFlightDetails(data, flight) {
    this.multipleData = data;
    flight.showFlightDetails = !flight.showFlightDetails;
  }

  //krishna
  
   bookFlightGoing(flight) {
    flight.displayTotalFareGoing = !flight.displayTotalFareGoing;
   }
  
   bookFlightComing(flight2) {
    flight2.displayTotalFareComing = !flight2.displayTotalFareComing;
   }

  
}

