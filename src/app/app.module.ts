import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { FormsModule, ReactiveFormsModule} from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { Ng5SliderModule } from 'ng5-slider';

import { FlightResultsComponent } from './templates/flight-results/flight-results.component';
import { OneWayJourneyDetailsComponentComponent } from './components/one-way-journey-details-component/one-way-journey-details-component.component';
import { TwoWayJourneyDetailsComponentComponent } from './components/two-way-journey-details-component/two-way-journey-details-component.component';
import { HeaderComponentComponent } from './components/header-component/header-component.component';

@NgModule({
  declarations: [
    AppComponent,
    FlightResultsComponent,
    OneWayJourneyDetailsComponentComponent,
    TwoWayJourneyDetailsComponentComponent,
    HeaderComponentComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,
    Ng5SliderModule,
    NgbModule
  ],
  exports: [
    FlightResultsComponent,
    OneWayJourneyDetailsComponentComponent,
    TwoWayJourneyDetailsComponentComponent,
    HeaderComponentComponent
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
