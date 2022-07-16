import { CollectionViewer, DataSource } from "@angular/cdk/collections";
import { BehaviorSubject, Observable } from "rxjs";
import { FinanceService } from "../finance.service";
import { Finance } from "../interfaces/finance";

import * as _moment from 'moment';
import { Moment } from 'moment';

const moment = _moment;

export class FinancesDataSource implements DataSource<Finance> {

  private financesSubject = new BehaviorSubject<Finance[]>([]);
  private loadingSubject = new BehaviorSubject<boolean>(false);

  public loading$ = this.loadingSubject.asObservable();

  private spanList: {[key: number]: number} = {};
  private net: number = 0;

  constructor(private service: FinanceService) {}

  connect(collectionViewer: CollectionViewer): Observable<Finance[]> {
    return this.financesSubject.asObservable();
  }

  disconnect(collectionViewer: CollectionViewer): void {
    this.financesSubject.complete();
    this.loadingSubject.complete();
  }

  loadFinances(params: object = {}) {
    this.loadingSubject.next(true);

    this.service
      .findFinances(params)
      .subscribe(finances => {
        this.setSpanList(finances);
        this.setNet(finances);
        this.financesSubject.next(finances);
      });
  }

  getSpanList() {
    return this.spanList;
  }

  private setSpanList(finances: Finance[]): void {
    let spanSize = 1;
    let day: number;
    let nextDay: number;
    let currentIndex: number = 0;

    finances.forEach((f, i) => {
      if (i === finances.length - 1) {
        this.spanList[currentIndex] = spanSize;
        return;
      }

      day = (moment(f.date)).date();
      nextDay = (moment(finances[i + 1].date)).date();

      if (currentIndex === 0) {
        currentIndex = i;
      }

      if (day === nextDay) {
        spanSize += 1;
      } else {
        this.spanList[currentIndex] = spanSize;
        currentIndex = 0;
        spanSize = 1;
      }
    });
  }

  getNet(): number {
    return this.net;
  }

  private setNet(finances: Finance[]): void {
    this.net = 0;
    finances.forEach((f) => {
      const amount = Number(f.amount);
      this.net += f.is_expense ? (-1 * amount) : amount;
    });
  }
}
