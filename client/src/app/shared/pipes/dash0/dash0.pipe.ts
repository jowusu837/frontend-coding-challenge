import {Pipe, PipeTransform} from '@angular/core';

@Pipe({
  name: 'dash0'
})
export class Dash0Pipe implements PipeTransform {

  transform(value: number): number | string {
    return value ? value : '-';
  }

}
