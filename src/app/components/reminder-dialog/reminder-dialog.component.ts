import {Component, Inject, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {CityModel} from '../../utils/models/city.model';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';
import {CITIES} from '../../utils/settings/city.settings';
import {ReminderComponent} from '../reminder/reminder.component';
import {DialogDataModel} from '../../utils/models/dialog-data.model';
import {ActionEnum} from '../../utils/enums/action.enum';

@Component({
  selector: 'app-reminder-dialog',
  templateUrl: './reminder-dialog.component.html',
  styleUrls: ['./reminder-dialog.component.scss']
})
export class ReminderDialogComponent implements OnInit {
  public actionEnum: typeof ActionEnum;
  public reminderForm: FormGroup;
  public cities: CityModel[];

  constructor(
    private _formBuilder: FormBuilder,
    public dialogRef: MatDialogRef<ReminderComponent>,
    @Inject(MAT_DIALOG_DATA) public dialogData: DialogDataModel) {
  }

  ngOnInit(): void {
    this.initVariables();
    this.setData();
  }

  private initVariables(): void {
    this.actionEnum = ActionEnum;
    this.cities = CITIES;
    this.initReminderForm();
  }

  private setData(): void {
    debugger
    if (this.dialogData.action === ActionEnum.edit) {
      this.reminderForm.reset(this.dialogData.data);
    }
  }

  private initReminderForm(): void {
    this.reminderForm = this._formBuilder.group({
      description: ['', [Validators.required]],
      city: ['', [Validators.required]],
      day: ['', [Validators.required]],
      time: ['', [Validators.required]]
    });
  }

  public close(data?: any): void {
    this.dialogRef.close(data);
  }

}
