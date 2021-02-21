import {ComponentFixture, TestBed} from '@angular/core/testing';

import {ReminderComponent} from './reminder.component';
import {FindInListPipe} from '../../pipes/findInList.pipe';

describe('ReminderComponent', () => {
  let component: ReminderComponent;
  let fixture: ComponentFixture<ReminderComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ReminderComponent, FindInListPipe]
    })
      .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ReminderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
