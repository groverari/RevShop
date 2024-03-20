import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OwnerReviewComponent } from './owner-review.component';

describe('OwnerReviewComponent', () => {
  let component: OwnerReviewComponent;
  let fixture: ComponentFixture<OwnerReviewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [OwnerReviewComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(OwnerReviewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
