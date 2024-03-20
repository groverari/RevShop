import { Hotel } from './hotel';

export interface Review {
  reviewId?: number;
  userId?: number;
  hotel?: Hotel;
  rating?: number;
  text?: string;
  feedback?: string;
}
