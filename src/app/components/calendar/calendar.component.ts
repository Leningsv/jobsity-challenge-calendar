import {Component, OnInit} from '@angular/core';
import * as moment from 'moment';

@Component({
  selector: 'app-calendar',
  templateUrl: './calendar.component.html',
  styleUrls: ['./calendar.component.scss']
})
export class CalendarComponent implements OnInit {
  public months: string[];
  public selectedMonth: string;

  constructor() {
  }

  ngOnInit(): void {
    this.initVariables();
  }

  private initVariables(): void {
    this.selectedMonth = moment().format('YYYY-M');
    this.initMonths();
  }

  private initMonths(): void {
    this.months = [];
    for (let i = 1; i <= 12; i++) {
      this.months.push(moment().format('YYYY') + '-' + i.toString());
    }
  }
}
