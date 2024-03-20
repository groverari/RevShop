import { TestBed } from '@angular/core/testing';

import { HotelServiceService } from './hotel.service';

describe('HotelServiceService', () => {
  let service: HotelServiceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(HotelServiceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
