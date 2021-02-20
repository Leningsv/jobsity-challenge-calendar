import {Component, Input, OnInit} from '@angular/core';
import {ActionEnum} from '../../utils/enums/action.enum';
import {MatDialog} from '@angular/material/dialog';
import {ReminderDialogComponent} from '../reminder-dialog/reminder-dialog.component';
import {ApplicationBase} from '../../utils/application.base';
import {ReminderModel} from '../../utils/models/reminder.model';
import {CalendarService} from '../../services/calendar.service';

@Component({
  selector: 'app-day',
  templateUrl: './day.component.html',
  styleUrls: ['./day.component.scss']
})
export class DayComponent extends ApplicationBase implements OnInit {
  @Input()
  public date: string;
  public actionEnum: typeof ActionEnum;

  constructor(
    public calendarService: CalendarService,
    private _dialog: MatDialog) {
    super();
  }

  ngOnInit(): void {
    this.initVariables();
  }

  private initVariables(): void {
    this.actionEnum = ActionEnum;
  }

  public openReminderDialog(action: ActionEnum, reminder?: ReminderModel): void {
    const data: any = {
      action
    };
    if (action === ActionEnum.insert) {
      data.reminder = {date: this.date};
    } else if (action === ActionEnum.edit) {
      data.reminder = reminder;
    } else if (action === ActionEnum.view) {
      data.reminder = reminder;
    }
    const dialogRef = this._dialog.open(ReminderDialogComponent, {
      width: '750px',
      data
    });
    dialogRef.afterClosed().subscribe((result: any) => {
      if (!result) {
        return;
      }
      if (result.action === ActionEnum.insert) {
        this.calendarService.addReminder(result.reminder);
        return;
      }
      if (result.action === ActionEnum.update) {
        this.calendarService.updateReminder(result.reminder);
        return;
      }
    });
  }

  public removeReminder(reminder: ReminderModel): void {
    const deleteReminder = confirm(`Are you sure to delete ${reminder.description}`);
    if (!deleteReminder) {
      return;
    }
    this.calendarService.deleteReminder(reminder.id);
  }

  public removeReminders(): void {
    const confirmRemove = confirm('Are you sure to delete all reminders');
    if (!confirmRemove) {
      return;
    }
    this.calendarService.deleteRemindersByDate(this.moment(this.date).format('YYYY-M-D'));
  }
}
