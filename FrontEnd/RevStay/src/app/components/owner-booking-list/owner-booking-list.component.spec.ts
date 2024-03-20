import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OwnerBookingListComponent } from './owner-booking-list.component';

describe('OwnerBookingListComponent', () => {
  let component: OwnerBookingListComponent;
  let fixture: ComponentFixture<OwnerBookingListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [OwnerBookingListComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(OwnerBookingListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
