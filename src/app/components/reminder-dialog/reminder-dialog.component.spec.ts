import {ComponentFixture, TestBed} from '@angular/core/testing';

import {ReminderDialogComponent} from './reminder-dialog.component';
import {FormBuilder} from '@angular/forms';
import {HttpClient, HttpHandler} from '@angular/common/http';
import {MatDialogRef} from '@angular/material/dialog';

xdescribe('ReminderDialogComponent', () => {
  let component: ReminderDialogComponent;
  let fixture: ComponentFixture<ReminderDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ReminderDialogComponent],
      providers: [FormBuilder, HttpClient, HttpHandler, MatDialogRef]
    })
      .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ReminderDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
