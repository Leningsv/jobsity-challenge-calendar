import {Component, Input, OnInit} from '@angular/core';
import {ActionEnum} from '../../utils/enums/action.enum';
import {MatDialog} from '@angular/material/dialog';
import {ReminderDialogComponent} from '../reminder-dialog/reminder-dialog.component';
import {ApplicationBase} from '../../utils/application.base';
import {ReminderModel} from '../../utils/models/reminder.model';

@Component({
  selector: 'app-day',
  templateUrl: './day.component.html',
  styleUrls: ['./day.component.scss']
})
export class DayComponent extends ApplicationBase implements OnInit {
  @Input()
  public date: string;
  public reminders: any[];
  public actionEnum: typeof ActionEnum;

  constructor(
    private _dialog: MatDialog) {
    super();
  }

  ngOnInit(): void {
    this.initVariables();
  }

  private initVariables(): void {
    this.actionEnum = ActionEnum;
    this.reminders = [];
  }

  public openReminderDialog(action: ActionEnum, reminder?: ReminderModel, index?: number): void {
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
        this.reminders.push(result.reminder);
        this.reminders = [...this.reminders];
        return;
      }
      if (result.action === ActionEnum.update) {
        return this.reminders[index] = result.reminder;
      }
    });
  }

  public removeReminder(reminder: ReminderModel, index: number): void {
    const deleteReminder = confirm(`Are you sure to delete ${reminder.description}`);
    if (!deleteReminder) {
      return;
    }
    this.reminders.splice(index, 1);
  }

  public removeReminders(): void {
    const confirmRemove = confirm('Are you sure to delete all reminders');
    this.reminders = [];
  }
}
