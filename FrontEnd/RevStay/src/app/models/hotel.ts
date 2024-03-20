import { Review } from './review';
import { Room } from './room';

export interface Hotel {
  hotelId?: number;
  businessId: number;
  name: string;
  description: string;
  street: string;
  city: string;
  state: string;
  zip: string;
  img: string;
  reviewList?: Review[];
  roomList?: Room[];
}
