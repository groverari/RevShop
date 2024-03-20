import { Injectable } from '@angular/core';
import { ApiService } from '../api/api.service';
import { Observable } from 'rxjs';
import { Review } from '../../models/review';

@Injectable({
  providedIn: 'root',
})
export class ReviewService {
  constructor(private apiService: ApiService) {}

  getAvgRatingByHotelId = (path: string): Observable<number> => {
    return this.apiService.get(path, { responseType: 'json' });
  };

  addReview = (path: string, review: Review): Observable<Review> => {
    return this.apiService.create(path, review);
  };
  
  getAllReviewsByHotelId = (path: string): Observable<Review[]> => {
    return this.apiService.get(path, { responseType: 'json' });
  };

  submitFeedbackToReview(review: Review) {
    return this.apiService.update('owners/respond', review);
  };
}
