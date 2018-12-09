import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { OneWayJourneyDetailsComponentComponent } from './one-way-journey-details-component.component';

describe('OneWayJourneyDetailsComponentComponent', () => {
  let component: OneWayJourneyDetailsComponentComponent;
  let fixture: ComponentFixture<OneWayJourneyDetailsComponentComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ OneWayJourneyDetailsComponentComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OneWayJourneyDetailsComponentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
