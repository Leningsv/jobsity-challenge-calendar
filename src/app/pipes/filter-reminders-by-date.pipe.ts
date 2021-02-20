import {Pipe, PipeTransform} from '@angular/core';
import {ReminderModel} from '../utils/models/reminder.model';
import {ApplicationBase} from '../utils/application.base';

@Pipe({
  name: 'filterRemindersByDate'
})
export class FilterRemindersByDatePipe extends ApplicationBase implements PipeTransform {

  constructor() {
    super();
  }

  transform(reminders: ReminderModel[], date: any): unknown {
    if (!reminders) {
      return [];
    }
    return reminders.filter(x => this.moment(x.date).format('YYYY-M-D') === this.moment(date).format('YYYY-M-D'));
  }

}
