import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { Finance } from './interfaces/finance';
import { HttpClient, HttpParams } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class FinanceService {

  private _finances = new BehaviorSubject<Finance[]>([]);
  private dataStore: { finances: Finance[] } = { finances: [] };
  readonly finances = this._finances.asObservable();

  constructor(private http: HttpClient) { }

  loadFinances(params: { [key: string]: any} = {}): void {

    let hp = new HttpParams();
    Object.keys(params).forEach((key) => {
      hp = hp.append(key, params[key]);
    });

    const requestOptions = {
      params: hp,
    };

    this.http.get<Finance[]>('/api/finances', requestOptions).subscribe(
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
