import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Filter } from '../../models/filter';

@Injectable({
  providedIn: 'root',
})
export class FilterService {
  private filterSource = new BehaviorSubject<any>({});
  currentFilter = this.filterSource.asObservable();

  constructor() {}

  changeFilter(filterCriteria: any) {
    // console.log(filterCriteria);
    this.filterSource.next(filterCriteria);
  }
}
