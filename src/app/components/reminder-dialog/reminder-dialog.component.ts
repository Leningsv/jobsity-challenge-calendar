import {Component, Inject, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {CityModel} from '../../utils/models/city.model';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';
import {CITIES} from '../../utils/settings/city.settings';
import {ReminderComponent} from '../reminder/reminder.component';
import {ActionEnum} from '../../utils/enums/action.enum';
import {CalendarService} from '../../services/calendar.service';
import {MAT_MOMENT_DATE_FORMATS, MomentDateAdapter} from '@angular/material-moment-adapter';
import {DateAdapter, MAT_DATE_FORMATS, MAT_DATE_LOCALE} from '@angular/material/core';
import {ApplicationBase} from '../../utils/application.base';
import {REMINDER_COLORS} from '../../utils/settings/general.settings';

@Component({
  selector: 'app-reminder-dialog',
  templateUrl: './reminder-dialog.component.html',
  styleUrls: ['./reminder-dialog.component.scss'],
  providers: [
    // `MomentDateAdapter` and `MAT_MOMENT_DATE_FORMATS` can be automatically provided by importing
    // `MatMomentDateModule` in your applications root module. We provide it at the component level
    // here, due to limitations of our example generation script.
    {provide: DateAdapter, useClass: MomentDateAdapter, deps: [MAT_DATE_LOCALE]},
    {provide: MAT_DATE_FORMATS, useValue: MAT_MOMENT_DATE_FORMATS},
  ],
})
export class ReminderDialogComponent extends ApplicationBase implements OnInit {
  public actionEnum: typeof ActionEnum;
  public reminderForm: FormGroup;
  public cities: CityModel[];
  public colors: string[];
  public minDate: any;
  public maxDate: any;

  constructor(
    private _calendarService: CalendarService,
    private _formBuilder: FormBuilder,
    public dialogRef: MatDialogRef<ReminderComponent>,
    @Inject(MAT_DIALOG_DATA) public dialogData: any) {
    super();
  }

  ngOnInit(): void {
    this.initVariables();
    this.setData();
  }

  private initVariables(): void {
    this.minDate = this.moment();
    this.maxDate = this.moment().endOf('year');
    this.actionEnum = ActionEnum;
    this.cities = CITIES;
    this.colors = REMINDER_COLORS;
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
      weather: [''],
      id: []
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
