import {Pipe, PipeTransform} from '@angular/core';
import {ReminderModel} from '../utils/models/reminder.model';

@Pipe({
  name: 'sortReminders'
})
export class SortRemindersPipe implements PipeTransform {

  transform(reminders: ReminderModel[]): ReminderModel[] {
    if (!reminders) {
      return [];
    }
    return reminders.sort((a: ReminderModel, b: ReminderModel) => {
      if (Number(a.time.replace(':', '')) < Number(b.time.replace(':', ''))) {
        return -1;
      }
      if (Number(a.time.replace(':', '')) > Number(b.time.replace(':', ''))) {
        return 1;
      }
      return 0;
    });
  }

}
