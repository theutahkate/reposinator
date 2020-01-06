import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs/internal/BehaviorSubject';

@Injectable({
  providedIn: 'root'
})
export class ErrorService {
  public httpError: BehaviorSubject<string>;

  constructor() {
    this.httpError = new BehaviorSubject<string>('');
  }
}
