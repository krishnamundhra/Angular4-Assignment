import {Component, OnInit} from '@angular/core';
import { MockFlightJSONService } from '../../services/mock-flight-json.service';
import {Observable} from 'rxjs';
import {map, debounceTime, distinctUntilChanged} from 'rxjs/operators';
import { Options } from 'ng5-slider';

const states = ['Pune (PNQ)', 'Mumbai (BOM)', 'Bengaluru (BLR)', 'Delhi (DEL)'];

@Component({
  selector: 'app-flight-results',
  templateUrl: './flight-results.component.html',
  styleUrls: ['./flight-results.component.scss']
})
export class FlightResultsComponent implements OnInit {

  value: number = 0;
  options: Options = {
    floor: 0,
    ceil: 10000
  };
  
  search = (text$: Observable<string>) =>
    text$.pipe(
      debounceTime(200),
      distinctUntilChanged(),
      map(term => term.length < 1 ? []
        : states.filter(v => v.toLowerCase().indexOf(term.toLowerCase()) > -1).slice(0, 10))
    )

  flightData: Object;
  origin: any;
  destination: any;
  dtmodel: any;
  rdmodel: any;
  
  finalGoing: any[];
  finalComing: any[];
  finalDateGoing: string;
  finalDateComing: any;
  
  disabled: boolean;
  journey = true;
  
  constructor(private MockFlightJSONService: MockFlightJSONService) { }

  ngOnInit() {
    this.disabled = true;
  }

  public searchResults() {
    this.MockFlightJSONService.getMockData().subscribe(
      res => {
       this.flightData = res;
     
       var flightRouteGoing = [];
     
       for (let i in this.flightData) {
        if (this.dtmodel != null) {
         this.finalDateGoing = this.dtmodel.year + "/" + this.dtmodel.month + "/0" + this.dtmodel.day;
         if ((this.origin == this.flightData[i].origin) && (this.destination == this.flightData[i].destination) && (this.finalDateGoing == this.flightData[i].date)) {
          flightRouteGoing.push(this.flightData[i]);
          this.finalGoing = flightRouteGoing;
         }
        }
     
        var flightRouteComing = [];
        for (let i in this.flightData) {
         if (this.rdmodel != null && this.dtmodel != null) {
          this.finalDateComing = this.rdmodel.year + "/" + this.rdmodel.month + "/0" + this.rdmodel.day;
          if ((this.origin == this.flightData[i].destination) && (this.destination == this.flightData[i].origin) && (this.finalDateComing == this.flightData[i].date)) {
           flightRouteComing.push(this.flightData[i]);
           this.finalComing = flightRouteComing;
          }
         } else {
          break;
         }
        }
       }
      },
      err => {
       alert('Error occured while service call');
      }
     );
  }

  public hideReturnDate() {
    this.rdmodel = '';
  }
}

