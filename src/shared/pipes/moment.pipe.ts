import {Pipe, PipeTransform} from 'angular2/core';

import * as moment from 'moment';

@Pipe({name: 'moment'})
export class MomentPipe implements PipeTransform {
  transform(value:number, args:string[]) : any {
    let date = moment(value);
    if (date.isValid()) {
      return date.format(args[0] || 'L');
    } else {
      return value;
    }
  }
}
