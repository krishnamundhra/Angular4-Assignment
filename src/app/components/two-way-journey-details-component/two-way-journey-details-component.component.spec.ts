import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TwoWayJourneyDetailsComponentComponent } from './two-way-journey-details-component.component';

describe('TwoWayJourneyDetailsComponentComponent', () => {
  let component: TwoWayJourneyDetailsComponentComponent;
  let fixture: ComponentFixture<TwoWayJourneyDetailsComponentComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TwoWayJourneyDetailsComponentComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TwoWayJourneyDetailsComponentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
