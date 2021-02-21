import {ComponentFixture, TestBed} from '@angular/core/testing';

import {MonthComponent} from './month.component';
import {GroupDaysInWeeksPipe} from '../../pipes/group-days-in-weeks.pipe';

describe('MonthComponent', () => {
  let component: MonthComponent;
  let fixture: ComponentFixture<MonthComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [MonthComponent, GroupDaysInWeeksPipe]
    })
      .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MonthComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
