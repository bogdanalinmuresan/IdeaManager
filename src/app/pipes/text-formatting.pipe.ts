import { Pipe, PipeTransform } from '@angular/core';

import * as marked from "marked";

@Pipe({
  name: 'textFormatting'
})
export class TextFormattingPipe implements PipeTransform {

  private md;

  constructor() {

      this.md = marked;

      this.md.setOptions({
        gfm: true,
        tables: false,
        breaks: true,
        smartypants: false,
        pedantic: false,
        sanitize: false,
        smartLists: false
      });
  }

  transform(value: string, args?: any): string {

    return value == null ? null : this.md.parse(value);
  }

}
