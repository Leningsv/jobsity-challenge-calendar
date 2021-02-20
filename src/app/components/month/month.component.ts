import {Component, Input, OnInit} from '@angular/core';
import {ApplicationBase} from '../../utils/application.base';

@Component({
  selector: 'app-month',
  templateUrl: './month.component.html',
  styleUrls: ['./month.component.scss']
})
export class MonthComponent extends ApplicationBase implements OnInit {
  @Input()
  public month: string;
  public weeks: any[];
  public days: any[];

  constructor() {
    super();
  }

  ngOnInit(): void {
    this.initVariables();
  }

  private initVariables(): void {
    this.initDays();
  }

  private initDays(): void {
    this.days = [];
    const startDate = this.getStartDate(this.moment(this.month + '-' + '1'));
    const endDate = this.getEndDate(this.moment(this.month + '-' + this.moment().daysInMonth().toString()));
    console.log(startDate.format('M-DD'));
    console.log(endDate.format('M-DD'));
    const pivotDate = this.moment(startDate);
    while (pivotDate <= endDate) {
      this.days.push(this.moment(pivotDate));
      pivotDate.add(1, 'd');
    }
  }

  private getStartDate(date): any {
    if (date.day() === 0) {
      return date;
    }
    date.subtract(1, 'd');
    return this.getStartDate(date);
  }

  private getEndDate(date): any {
    if (date.day() === 6) {
      return date;
    }
    date.add(1, 'd');
    return this.getEndDate(date);
  }

}
