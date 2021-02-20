import { Pipe, PipeTransform } from '@angular/core';
import {ApplicationBase} from '../utils/application.base';

@Pipe({
  name: 'customDate'
})
export class CustomDatePipe extends ApplicationBase implements PipeTransform {
  constructor() {
    super();
  }

  transform(value: unknown, format: string): unknown {
    if (!value) {
      return;
    }
    return this.moment(value).format(format);
  }

}
