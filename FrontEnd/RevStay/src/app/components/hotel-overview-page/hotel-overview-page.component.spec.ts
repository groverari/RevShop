import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HotelOverviewPageComponent } from './hotel-overview-page.component';

describe('HotelOverviewPageComponent', () => {
  let component: HotelOverviewPageComponent;
  let fixture: ComponentFixture<HotelOverviewPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HotelOverviewPageComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(HotelOverviewPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
