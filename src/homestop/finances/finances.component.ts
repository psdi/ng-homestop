import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { FinanceService } from '../finance.service';
import { Finance } from '../interfaces/finance';

import * as _moment from 'moment';
import { Moment } from 'moment';
import { MAT_DATE_FORMATS } from '@angular/material/core';
import { MatDatepicker } from '@angular/material/datepicker';
import { FormControl } from '@angular/forms';

const moment = _moment;

export const MY_FORMATS = {
  parse: {
    dateInput: 'MM/YYYY',
  },
  display: {
    dateInput: 'MM/YYYY',
    monthYearLabel: 'MMM YYYY',
    dateA11yLabel: 'LL',
    monthYearA11yLabel: 'MMMM YYYY',
  },
};

@Component({
  selector: 'expenses',
  templateUrl: './finances.component.html',
  styleUrls: ['./finances.component.scss'],
  providers: [
    { provide: MAT_DATE_FORMATS, useValue: MY_FORMATS },
  ]
})
export class FinancesComponent implements OnInit {

  finances$: Observable<Finance[]> = new Observable();
  date = new FormControl(moment());
  dateStr: string = '';

  constructor(private finances: FinanceService) { }

  ngOnInit(): void {
    this.update();
    this.finances$ = this.finances.getFinances();
  }

  selectMonth(newDate: Moment, datepicker: MatDatepicker<Moment>): void {
    const ctrlValue = this.date.value!;
    ctrlValue.month(newDate.month());
    ctrlValue.year(newDate.year());
    this.date.setValue(ctrlValue);
    this.update();

    datepicker.close();
  }

  update(): void {
    const ctrlValue = this.date.value!;
    this.finances.loadFinances({
      month: ctrlValue.month() + 1, // months start at 0
      year: ctrlValue.year(),
    });
    this.dateStr = ctrlValue.format('MMMM YYYY');
  }

}
