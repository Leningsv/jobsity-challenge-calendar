import {Pipe, PipeTransform} from '@angular/core';
import {ApplicationBase} from '../utils/application.base';

@Pipe({
  name: 'groupDaysInWeeks'
})
export class GroupDaysInWeeksPipe extends ApplicationBase implements PipeTransform {
  constructor() {
    super();
  }

  transform(days: string[]): unknown {
    const weeks = [];
    let week = [];
    for (const day of days) {
      week.push(day);
      if (this.moment(day).day() === 6) {
        weeks.push(week);
        week = [];
      }
    }
    return weeks;
  }

}
