import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OwnerReviewCardComponent } from './owner-review-card.component';

describe('OwnerReviewCardComponent', () => {
  let component: OwnerReviewCardComponent;
  let fixture: ComponentFixture<OwnerReviewCardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [OwnerReviewCardComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(OwnerReviewCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
