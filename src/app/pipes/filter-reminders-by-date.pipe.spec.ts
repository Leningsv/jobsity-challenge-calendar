import { FilterRemindersByDatePipe } from './filter-reminders-by-date.pipe';

describe('FilterRemindersByDatePipe', () => {
  it('create an instance', () => {
    const pipe = new FilterRemindersByDatePipe();
    expect(pipe).toBeTruthy();
  });
});
