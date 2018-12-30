import { Component, OnInit, Input } from '@angular/core';
import { FlightService } from 'src/app/services/flight.service';

@Component({
  selector: 'app-one-way-journey-details-component',
  templateUrl: './one-way-journey-details-component.component.html',
  styleUrls: ['./one-way-journey-details-component.component.scss']
})
export class OneWayJourneyDetailsComponentComponent {

  @Input() flightDataGoing: any;
  @Input() flightDataComing: any;
  @Input() passengersGoing: any;
  @Input() passengersComing: any;

  noOfFlightsGoing: any;
  noOfFlightsComing: any;
  displayTotalFareGoing: boolean;
  displayTotalFareComing: boolean;
  showFlightDetails: boolean;
  multipleData: any;
  section :any[]=[];
  multipleflight: any[];

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

  bookFlightGoing(flight) {
    flight.displayTotalFareGoing = !flight.displayTotalFareGoing;
  }
  
  bookFlightComing(flight2) {
    flight2.displayTotalFareComing = !flight2.displayTotalFareComing;
  }

  showMultipleFlightDetails(data, flight) {
    this.multipleflight = this.flightService.calculateDuration3(data);
    this.multipleData = data;
    flight.showFlightDetails = !flight.showFlightDetails;    
  }
}
