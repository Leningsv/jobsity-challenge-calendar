import {Component, OnInit} from '@angular/core';
import {ActionEnum} from '../../utils/enums/action.enum';
import {MatDialog} from '@angular/material/dialog';
import {ReminderDialogComponent} from '../reminder-dialog/reminder-dialog.component';

@Component({
  selector: 'app-day',
  templateUrl: './day.component.html',
  styleUrls: ['./day.component.scss']
})
export class DayComponent implements OnInit {
  public date: Date;
  public reminders: any[];

  constructor(
    private _dialog: MatDialog) {
  }

  ngOnInit(): void {
  }

  public addReminder(): void {
    const data = {
      date: this.date,
      action: ActionEnum.insert
    };
    const dialogRef = this._dialog.open(ReminderDialogComponent, {
      width: '750px',
      data
    });
    dialogRef.afterClosed().subscribe((result: any) => {
      if (!result) {
        return;
      }
      if (result.action === ActionEnum.ok) {
        this.reminders.push(result.data);
      }
    });
  }
}
