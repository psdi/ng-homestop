import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { FinanceService } from '../finance.service';
import { Finance } from '../interfaces/finance';

@Component({
  selector: 'expenses',
  templateUrl: './finances.component.html',
  styleUrls: ['./finances.component.scss']
})
export class FinancesComponent implements OnInit {

  finances$: Observable<Finance[]> = new Observable();

  // TODO: rename expense to finance?
  constructor(private finances: FinanceService) { }

  ngOnInit(): void {
    this.finances.loadFinances();
    this.finances$ = this.finances.getFinances();
  }

}
