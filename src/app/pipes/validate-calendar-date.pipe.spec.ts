import { ValidateCalendarDatePipe } from './validate-calendar-date.pipe';

describe('ValidateCalendarDatePipe', () => {
  it('create an instance', () => {
    const pipe = new ValidateCalendarDatePipe();
    expect(pipe).toBeTruthy();
  });
});
