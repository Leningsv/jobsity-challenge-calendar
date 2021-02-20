import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';

import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {MonthComponent} from './components/month/month.component';
import {DayComponent} from './components/day/day.component';
import {ReminderComponent} from './components/reminder/reminder.component';
import {ReminderDialogComponent} from './components/reminder-dialog/reminder-dialog.component';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {MaterialImportsModule} from './modules/material-imports.module';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {CalendarComponent} from './components/calendar/calendar.component';
import {CustomDatePipe} from './pipes/custom-date.pipe';
import {GroupDaysInWeeksPipe} from './pipes/group-days-in-weeks.pipe';
import {HttpClientModule} from '@angular/common/http';
import {SortRemindersPipe} from './pipes/sort-reminders.pipe';

@NgModule({
  declarations: [
    AppModule.COMPONENTS,
    AppModule.DIALOGS,
    AppModule.PIPES,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MaterialImportsModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule
  ],
  providers: [],
  bootstrap: [AppComponent],
  entryComponents: [
    AppModule.DIALOGS
  ]
})
export class AppModule {
  public static COMPONENTS = [
    AppComponent,
    MonthComponent,
    DayComponent,
    ReminderComponent,
    CalendarComponent
  ];
  public static DIALOGS = [
    ReminderDialogComponent
  ];
  public static PIPES = [
    CustomDatePipe,
    GroupDaysInWeeksPipe,
    SortRemindersPipe
  ];
}
