import {Component, Inject, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {CityModel} from '../../utils/models/city.model';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';
import {CITIES} from '../../utils/settings/city.settings';
import {ReminderComponent} from '../reminder/reminder.component';
import {ActionEnum} from '../../utils/enums/action.enum';
import {CalendarService} from '../../services/calendar.service';

@Component({
  selector: 'app-reminder-dialog',
  templateUrl: './reminder-dialog.component.html',
  styleUrls: ['./reminder-dialog.component.scss']
})
export class ReminderDialogComponent implements OnInit {
  public actionEnum: typeof ActionEnum;
  public reminderForm: FormGroup;
  public cities: CityModel[];
  public colors: string[];

  constructor(
    private _calendarService: CalendarService,
    private _formBuilder: FormBuilder,
    public dialogRef: MatDialogRef<ReminderComponent>,
    @Inject(MAT_DIALOG_DATA) public dialogData: any) {
  }

  ngOnInit(): void {
    this.initVariables();
    this.setData();
  }

  private initVariables(): void {
    this.actionEnum = ActionEnum;
    this.cities = CITIES;
    this.colors = ['#94dbff', '#ffeb94', '#afff94', '#94dbff', '#ff94ff'];
    this.initReminderForm();
  }

  private setData(): void {
    this.reminderForm.reset(this.dialogData.reminder);
    if (this.dialogData.action === ActionEnum.view) {
      this.reminderForm.disable();
    }
  }

  private initReminderForm(): void {
    this.reminderForm = this._formBuilder.group({
      description: ['', [Validators.required, Validators.maxLength(30)]],
      city: ['', [Validators.required]],
      date: ['', [Validators.required]],
      time: ['', [Validators.required]],
      color: ['', [Validators.required]],
      weather: ['']
    });
  }

  public registerReminder(): void {
    this.close({
      action: ActionEnum.insert,
      reminder: this.reminderForm.getRawValue()
    });
  }

  public updateReminder(): void {
    this.close({
      action: ActionEnum.update,
      reminder: this.reminderForm.getRawValue()
    });
  }

  public close(data?: any): void {
    this.dialogRef.close(data);
  }

  public async changeCity(city: any): Promise<void> {
    const weather: any = await this._calendarService.getWeatherByCity(city.key).toPromise();
    this.reminderForm.get('weather').setValue(weather?.weather[0]?.description);
  }
}
