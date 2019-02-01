import { Injectable } from '@angular/core';
import { Tag } from '../tag';
import { Observable } from 'rxjs/Observable';
import { of } from 'rxjs/observable/of';

@Injectable()
export class MockTagService {

  constructor() { }

  getAllTags(): Observable<Tag[]> {
    var tag = new Tag;
    var tag2 = new Tag;
    tag.id = "testID";
    tag.title = "Tag1";
    tag2.id = "TestID2";
    tag2.title = "Tag2";
    return of([tag, tag2]);
  }

  addTag(tag: string): string {
    // Do nothing, and return a fake tag key
    return "new-tag-ID";
  }

}
