import {ComponentFixture, TestBed} from '@angular/core/testing';

import {DayComponent} from './day.component';
import {HttpClient, HttpHandler} from '@angular/common/http';
import {MatDialog} from '@angular/material/dialog';
import {Overlay} from '@angular/cdk/overlay';

xdescribe('DayComponent', () => {
  let component: DayComponent;
  let fixture: ComponentFixture<DayComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [DayComponent],
      providers: [HttpClient, HttpHandler, MatDialog, Overlay]
    })
      .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DayComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
