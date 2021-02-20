import {Pipe, PipeTransform} from '@angular/core';
import {ApplicationBase} from '../utils/application.base';

@Pipe({
  name: 'validateCalendarDate'
})
export class ValidateCalendarDatePipe extends ApplicationBase implements PipeTransform {

  transform(date: any): unknown {
    if (!date) {
      return;
    }
    const calendarDate = Number(this.moment(date).format('YYYYMMDD'));
    return calendarDate >= Number(this.moment().format('YYYYMMDD'));
  }

}
