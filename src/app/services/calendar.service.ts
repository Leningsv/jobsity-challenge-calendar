import {Injectable} from '@angular/core';
import {Observable} from 'rxjs';
import {HttpClient} from '@angular/common/http';
import {environment} from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class CalendarService {

  constructor(
    private _httpClient: HttpClient
  ) {
  }

  public getWeatherByCity(city: string): Observable<any> {
    const url = environment.openWeatherMapUrl + `?q=${city}&appid=${environment.openWeatherMapApi}`;
    return this._httpClient.get(url);
  }
}
