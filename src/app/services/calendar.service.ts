import {Injectable} from '@angular/core';
import {Observable} from 'rxjs';
import {HttpClient} from '@angular/common/http';
import {environment} from '../../environments/environment';
import {ReminderModel} from '../utils/models/reminder.model';
import {ApplicationBase} from '../utils/application.base';

@Injectable({
  providedIn: 'root'
})
export class CalendarService extends ApplicationBase {
  public reminders: ReminderModel[];

  constructor(
    private _httpClient: HttpClient
  ) {
    super();
    this.reminders = [];
  }

  public getWeatherByCity(city: string): Observable<any> {
    const url = environment.openWeatherMapUrl + `?q=${city}&appid=${environment.openWeatherMapApi}`;
    return this._httpClient.get(url);
  }

  public addReminder(reminder: ReminderModel): void {
    reminder.id = this.moment().unix();
    this.reminders.push(reminder);
    this.reminders = [...this.reminders];
  }

  public updateReminder(reminder: ReminderModel): void {
    const indexReminder = this.reminders.findIndex(x => x.id === reminder.id);
    this.reminders[indexReminder] = reminder;
    this.reminders = [...this.reminders];
  }

  public deleteReminder(reminderId: number): void {
    const indexReminder = this.reminders.findIndex(x => x.id === reminderId);
    this.reminders.splice(indexReminder, 1);
    this.reminders = [...this.reminders];
  }

  public deleteRemindersByDate(date: string): void {
    const reminders = this.reminders.filter(x => this.moment(x.date).format('YYYY-M-D') === date);
    for (const reminder of reminders) {
      this.deleteReminder(reminder.id);
    }
  }
}
