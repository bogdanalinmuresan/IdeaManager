import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'splitAndGetLast'
})
export class SplitAndGetLastPipe implements PipeTransform {

  transform(input: string, separator: string): string {
    var splitString = input.split(separator);
    return splitString[splitString.length-1];
  }

}
