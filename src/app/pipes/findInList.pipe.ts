import {Pipe, PipeTransform} from '@angular/core';
import {CityModel} from '../utils/models/city.model';

@Pipe({
  name: 'findInList'
})
export class FindInListPipe implements PipeTransform {

  transform(value: string, values: CityModel[], property: string): CityModel {
    return values.find(x => x[property] === value);
  }

}
