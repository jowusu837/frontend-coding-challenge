import {Pipe, PipeTransform} from '@angular/core';

@Pipe({
  name: 'over100'
})
export class Over100Pipe implements PipeTransform {

  transform(value: number): number {
    return Number((value / 100).toFixed(0));
  }

}
