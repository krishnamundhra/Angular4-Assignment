import { TestBed } from '@angular/core/testing';

import { MockFlightJSONService } from './mock-flight-json.service';

describe('MockFlightJSONService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: MockFlightJSONService = TestBed.get(MockFlightJSONService);
    expect(service).toBeTruthy();
  });
});
