import {Component, Input, OnChanges, SimpleChanges} from '@angular/core';
import {ApplicationBase} from '../../utils/application.base';
import {ActionEnum} from '../../utils/enums/action.enum';
import {ReminderModel} from '../../utils/models/reminder.model';
import {ReminderDialogComponent} from '../reminder-dialog/reminder-dialog.component';
import {MatDialog} from '@angular/material/dialog';
import {CalendarService} from '../../services/calendar.service';

@Component({
  selector: 'app-month',
  templateUrl: './month.component.html',
  styleUrls: ['./month.component.scss']
})
export class MonthComponent extends ApplicationBase implements OnChanges {
  @Input()
  public month: string;
  public days: any[];

  constructor(
    private _matDialog: MatDialog,
    private _calendarService: CalendarService
  ) {
    super();
    this.days = [];
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes.month.currentValue) {
      this.initVariables();
    }
  }


  private initVariables(): void {
    this.initDays();
  }

  private initDays(): void {
    this.days = [];
    const startDate = this.getStartDate(this.moment(this.month + '-' + '1'));
    const endDate = this.getEndDate(this.moment(this.month + '-' + this.moment(this.month).daysInMonth().toString()));
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

  public openAddReminderDialog(): void {
    const data: any = {
      action: ActionEnum.insert,
      reminder: {date: this.moment()}
    };
    const dialogRef = this._matDialog.open(ReminderDialogComponent, {
      width: '750px',
      data
    });
    dialogRef.afterClosed().subscribe((result: any) => {
      if (!result) {
        return;
      }
      if (result.action === ActionEnum.insert) {
        this._calendarService.addReminder(result.reminder);
        return;
      }
    });
  }

}
