import {TestBed} from '@angular/core/testing';

import {CalendarService} from './calendar.service';
import {HttpClient, HttpHandler} from '@angular/common/http';
import * as moment from 'moment';
import {ReminderModel} from '../utils/models/reminder.model';
import {CITIES} from '../utils/settings/city.settings';
import {REMINDER_COLORS} from '../utils/settings/general.settings';

describe('CalendarService', () => {
  let service: CalendarService;
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [HttpClient, HttpHandler]
    });
    service = TestBed.inject(CalendarService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('delete reminders by date', () => {
    const date = '2021-2-20';
    service.deleteRemindersByDate(date);
    const reminders = service.reminders.filter(x => moment(x.date).format('YYYY-M-D') === date);
    expect(reminders).toEqual([]);
  });

  it('add reminder', async () => {
    const city = CITIES[0].key;
    const weather = {weather: [{description: 'Rain'}]}; // await service.getWeatherByCity(city).toPromise();
    const reminder: ReminderModel = {
      date: moment(),
      city,
      weather: weather?.weather[0]?.description,
      description: 'unit test',
      color: REMINDER_COLORS[0],
      time: '15:30',
    };
    service.addReminder(reminder);
    expect(service.reminders).toContain(service.reminders.find(x => x.id === reminder.id));
  });

  it('delete reminder', async () => {
    const city = CITIES[0].key;
    const weather = {weather: [{description: 'Rain'}]};
    const reminder: ReminderModel = {
      date: moment(),
      city,
      weather: weather?.weather[0]?.description,
      description: 'unit test',
      color: REMINDER_COLORS[0],
      time: '15:30',
    };
    service.addReminder(reminder);
    service.deleteReminder(reminder.id);
    expect(service.reminders.find(x => x.id === reminder.id)).toEqual(undefined);
  });

  it('update reminder', async () => {
    const city = CITIES[0].key;
    const weather = {weather: [{description: 'Rain'}]};
    const reminder: ReminderModel = {
      date: moment(),
      city,
      weather: weather?.weather[0]?.description,
      description: 'unit test',
      color: REMINDER_COLORS[0],
      time: '15:30',
    };
    service.addReminder(reminder);
    reminder.description = 'unit test update';
    expect(service.reminders.find(x => x.id === reminder.id).description).toEqual('unit test update');
  });
});
