import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {ReminderModel} from '../../utils/models/reminder.model';
import {ActionEnum} from '../../utils/enums/action.enum';
import {Action} from 'rxjs/internal/scheduler/Action';
import {CityModel} from '../../utils/models/city.model';
import {CITIES} from '../../utils/settings/city.settings';

@Component({
  selector: 'app-reminder',
  templateUrl: './reminder.component.html',
  styleUrls: ['./reminder.component.scss']
})
export class ReminderComponent implements OnInit {
  public cities: CityModel[];
  @Input()
  public reminder: ReminderModel;
  @Output()
  public removeHandler: EventEmitter<void>;
  @Output()
  public editHandler: EventEmitter<void>;
  @Output()
  public viewHandler: EventEmitter<void>;

  constructor() {
    this.initVariables();
  }

  ngOnInit(): void {
  }

  private initVariables(): void {
    this.cities = CITIES;
    this.removeHandler = new EventEmitter<void>();
    this.editHandler = new EventEmitter<void>();
    this.viewHandler = new EventEmitter<void>();
  }
}
