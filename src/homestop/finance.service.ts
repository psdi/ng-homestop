import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { Finance } from './interfaces/finance';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class FinanceService {

  private _finances = new BehaviorSubject<Finance[]>([]);
  private dataStore: { finances: Finance[] } = { finances: [] };
  readonly finances = this._finances.asObservable();

  constructor(private http: HttpClient) { }

  loadFinances(): void {
    this.http.get<Finance[]>('/api/finances?month=7&year=2022').subscribe(
      data => {
        this.dataStore.finances = data;
        this._finances.next(Object.assign({}, this.dataStore).finances);
      },
      error => console.log('Could not load finances')
    );
  }

  getFinances(): Observable<Finance[]> {
    return this._finances.asObservable();
  }
}
