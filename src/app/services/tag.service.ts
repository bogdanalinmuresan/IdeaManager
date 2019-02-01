import { Injectable } from '@angular/core';
import { AngularFireDatabase } from 'angularfire2/database';
import { Observable } from 'rxjs/Observable';
import { Tag } from '../tag';

@Injectable()
export class TagService {

  constructor(private afDb: AngularFireDatabase) { }

  getAllTags(): Observable<Tag[]> {
    return this.afDb.list<any>('Tags', ref => ref.orderByChild('Title')).snapshotChanges().map((arr) => { 
      return arr.sort(function(a, b){
        var keyA = a.payload.val().Title,
            keyB = b.payload.val().Title;
        // Compare the 2 dates
        if(keyA > keyB) return -1;
        if(keyA < keyB) return 1;
        return 0;
      });
    }).map((arr) => {
      return arr.map((item) => {
        const $key = item.payload.key;
        var tag = new Tag;
        tag.id = $key;
        tag.title = item.payload.val().Title;
        return tag;
      });
    });
  }

  addTag(tag: string): string {
    const ref = this.afDb.list('Tags').query.ref.push();
    ref.set({Title: tag}); 
    return ref.key;
  }

}
