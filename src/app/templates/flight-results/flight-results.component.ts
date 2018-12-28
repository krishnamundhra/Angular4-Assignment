import { Component, OnInit } from '@angular/core';
import { MockFlightJSONService } from '../../services/mock-flight-json.service';
import { Observable } from 'rxjs';
import { map, debounceTime, distinctUntilChanged } from 'rxjs/operators';
import { Options } from 'ng5-slider';
import { FlightItem, FlightDTO } from 'src/app/models/flight-item';
import { DateService } from 'src/app/services/date.service';

const states = ['Pune (PNQ)', 'Mumbai (BOM)', 'Bengaluru (BLR)', 'Delhi (DEL)'];

@Component({
  selector: 'app-flight-results',
  templateUrl: './flight-results.component.html',
  styleUrls: ['./flight-results.component.scss']
})
export class FlightResultsComponent implements OnInit {

  flightDTOGoing: FlightDTO[] = [];
  flightDTOComing: FlightDTO[] = [];
  flightData: any;
  origin: any;
  destination: any;
  dtmodel: any;
  rdmodel: any;

  finalDateGoing: string;
  finalDateComing: string;

  disabled: boolean;
  journey = true;

  flightValue: number = 15000;
  options: Options = {
    floor: 0,
    ceil: 15000
  };

  search = (text$: Observable<string>) =>
    text$.pipe(
      debounceTime(200),
      distinctUntilChanged(),
      map(term => term.length < 1 ? []
        : states.filter(v => v.toLowerCase().indexOf(term.toLowerCase()) > -1).slice(0, 10))
    )


  constructor(
    private MockFlightJSONService: MockFlightJSONService,
    private dateService: DateService
    ) { }

  ngOnInit() {
    this.disabled = true;
  }

  searchResults() {
    this.MockFlightJSONService.getMockData().subscribe(
     res => {
      this.flightData = res;


        if (this.dtmodel != null && this.rdmodel == null) {
          const flightRouteGoing = [];
            for (let i in this.flightData) {
        this.finalDateGoing = this.dtmodel.year + "/" + this.dtmodel.month + "/0" + this.dtmodel.day;
        if ((this.origin == this.flightData[i].origin) && (this.destination == this.flightData[i].destination) && (this.finalDateGoing == this.flightData[i].date) && (this.flightValue >= this.flightData[i].price)) {
         flightRouteGoing.push(this.flightData[i]);
        }
        
               // One Way - Multiple-Flights Details
       let flightData = this.flightData;
       flightData = flightData.map(flight => {
        const atime = this.dateService.parseDate(flight.date, flight.arrivalTime);
        const dtime = this.dateService.parseDate(flight.date, flight.departureTime);
  
        flight.atime = atime;
        flight.dtime = dtime;
        return flight;
       });
  
       const from = this.origin;
       const to = this.destination;
  
       const departingFlights = flightData.filter(flight => flight.origin === from);
       const arrivalFlights = flightData.filter(flight => flight.destination === to);

  
       let finalFlights = [];
  
       departingFlights.forEach((dFlight) => {
        const arrival = dFlight.destination;
        const arrivalTime = dFlight.atime;
        const dflightPrice = dFlight.price;
  
        const finalArrivalFlights = arrivalFlights.filter(
         (flight) => {
          const timeDiff = (flight.dtime.getTime() - arrivalTime.getTime()) / (30 * 60 * 1000);
          const arrFlightPrice = flight.price;
          const finalPrice = dflightPrice + arrFlightPrice;
  
          if (flight.origin === arrival && timeDiff >= 1 && (this.flightValue >= finalPrice)) {
           return flight;
          }
          return null;
         }
        );
        finalArrivalFlights.forEach(aFlight => {
         finalFlights.push([dFlight, aFlight]);
        });
       });
  
       // Direct flight Model
       this.flightDTOGoing = flightRouteGoing.map(flight => {
        const flightItem: FlightItem = {
         origin: flight.origin,
         destination: flight.destination,
         arrivalTime: flight.arrivalTime,
         departureTime: flight.departureTime,
         flightNo: flight.flightNo,
         duration: null,
         name: flight.name,
         price: flight.price,
         arrivalDt: flight.atime,
         departureDt: flight.dtime
        };
        const _dto: FlightDTO = {
         isMultiple: false,
         data: null,
         item: flightItem
        }
        return _dto;
       });
  
       // Connecting flight Model
       const temp = finalFlights.map(flights => {
        const flightItem: FlightItem = {
         origin: flights[0].origin,
         destination: flights[1].destination,
         arrivalTime: flights[1].arrivalTime,
         departureTime: flights[0].departureTime,
         flightNo: null,
         duration: null,
         name: null,
         price: flights[0].price + flights[1].price,
         arrivalDt: flights[1].atime,
         departureDt: flights[0].dtime
        };
  
        const _dto: FlightDTO = {
         data: flights,
         isMultiple: true,
         item: flightItem
        };
        return _dto;
       });
  
       this.flightDTOGoing.push(...temp);


       }
      }
  

      if (this.dtmodel != null && this.rdmodel != null)  {
        // Two-Way Details
       const flightRouteComing = [];
       for (let i in this.flightData) {
         this.finalDateComing = this.rdmodel.year + "/" + this.rdmodel.month + "/0" + this.rdmodel.day;
         if ((this.origin == this.flightData[i].destination) && (this.destination == this.flightData[i].origin) && (this.finalDateComing == this.flightData[i].date)) {
          flightRouteComing.push(this.flightData[i]);
          //this.finalComing = flightRouteComing;
         }

         // Multiple-Flights Details
       let flightData = this.flightData;
       flightData = flightData.map(flight => {
        const atime = this.dateService.parseDate(flight.date, flight.arrivalTime);
        const dtime = this.dateService.parseDate(flight.date, flight.departureTime);
  
        flight.atime = atime;
        flight.dtime = dtime;
        return flight;
       });
  
       const from = this.destination;
       const to = this.origin;
  
       const departingFlights = flightData.filter(flight => flight.origin === from);
       const arrivalFlights = flightData.filter(flight => flight.destination === to);
  
       let finalFlights2 = [];
  
       departingFlights.forEach((dFlight) => {
        const arrival = dFlight.destination;
        const arrivalTime = dFlight.atime;
        const dflightPrice = dFlight.price;
  
        const finalArrivalFlights = arrivalFlights.filter(
         (flight) => {
          const timeDiff = (flight.dtime.getTime() - arrivalTime.getTime()) / (30 * 60 * 1000);
          const arrFlightPrice = flight.price;
          const finalPrice = dflightPrice + arrFlightPrice;
  
          if (flight.origin === arrival && timeDiff >= 1 && (this.flightValue >= finalPrice)) {
           return flight;
          }
          return null;
         }
        );
        finalArrivalFlights.forEach(aFlight => {
         finalFlights2.push([dFlight, aFlight]);
        });
       });
  
       // Direct flight Model
       this.flightDTOComing = flightRouteComing.map(flight => {
        const flightItem: FlightItem = {
         origin: flight.origin,
         destination: flight.destination,
         arrivalTime: flight.arrivalTime,
         departureTime: flight.departureTime,
         flightNo: flight.flightNo,
         duration: null,
         name: flight.name,
         price: flight.price,
         arrivalDt: flight.atime,
         departureDt: flight.dtime
        };
        const _dto: FlightDTO = {
         isMultiple: false,
         data: null,
         item: flightItem
        }
        return _dto;
       });
  
       // Connecting flight Model
       const temp2 = finalFlights2.map(flights => {
        const flightItem: FlightItem = {
         origin: flights[0].origin,
         destination: flights[1].destination,
         arrivalTime: flights[1].arrivalTime,
         departureTime: flights[0].departureTime,
         flightNo: null,
         duration: null,
         name: null,
         price: flights[0].price + flights[1].price,
         arrivalDt: flights[1].atime,
         departureDt: flights[0].dtime
        };
  
        const _dto: FlightDTO = {
         data: flights,
         isMultiple: true,
         item: flightItem
        };
        return _dto;
       });
  
       this.flightDTOComing.push(...temp2);
       console.log(this.flightDTOComing);
         
      }
    }
     },
     err => {
      alert('Error occured while service call');
     }
    );
   }
  
  hideReturnDate() {
    this.rdmodel = '';
   }
}

