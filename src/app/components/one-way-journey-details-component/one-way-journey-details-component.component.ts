import { Component, OnInit, Input } from '@angular/core';
import { FlightService } from 'src/app/services/flight.service';

@Component({
  selector: 'app-one-way-journey-details-component',
  templateUrl: './one-way-journey-details-component.component.html',
  styleUrls: ['./one-way-journey-details-component.component.scss']
})
export class OneWayJourneyDetailsComponentComponent {

  @Input() flightDataGoing: any;
  @Input() passengersGoing: any;
  finalTime: string;
  noOfFlights: any;
  displayTotalFareGoing: boolean;
  showFlightDetails: boolean;
  multipleData: any;

  constructor(private flightService: FlightService) { }

  ngOnChanges() {
    this.noOfFlights = this.flightDataGoing.length;
    this.flightDataGoing = this.flightService.calculateDuration(this.flightDataGoing);
  }

  bookFlight(flight) {
    flight.displayTotalFareGoing = !flight.displayTotalFareGoing;
  }

  showMultipleFlightDetails(data, flight) {
    this.multipleData = data;
    flight.showFlightDetails = !flight.showFlightDetails;
  }
}

