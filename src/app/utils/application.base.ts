import * as moment from 'moment';

export class ApplicationBase {
  protected moment;

  constructor() {
    this.moment = moment;
  }
}
