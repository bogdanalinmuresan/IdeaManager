import { Injectable } from '@angular/core';
import { AngularFireDatabase } from 'angularfire2/database';
import { Observable } from 'rxjs/Observable';
import { Idea } from '../Idea';
import { Comment } from '../Comment';

@Injectable()
export class CommentService {

  constructor(private afDb: AngularFireDatabase) { }

  createComment(ideaID: string, title: string, content: string, userID: string, userName: string) {
    const ref = this.afDb.list('Comments').query.ref.push();
    ref.set({
      Idea: ideaID,
      Title: title,
      Content: content,
      User: userID,
      OwnerName: userName,
      Timestamp: +new Date,
      Aproved: false
    });
    return ref.key;
  }

  getComment(id: string): Observable<Comment> {
    return this.afDb.object<any>('Comments/${id}').snapshotChanges().map(action => {
      var comment = new Comment;
      var pv = action.payload.val();
      comment.id = action.key;
      comment.title = pv.Title;
      comment.content = pv.Content;
      comment.owner = pv.User;
      comment.username = pv.OwnerName;
      comment.timestamp = pv.Timestamp;
      comment.aproved = pv.Aproved;
      return comment;
    });
  }

  getComments(idea_id: string): Observable<Comment[]> {
    return this.afDb.list<any>('Comments', ref => ref.orderByChild('Idea').equalTo(idea_id)).snapshotChanges().map((arr) => {
      return arr.sort(function(a, b) {
        var keyA = a.payload.val().Timestamp,
            keyB = b.payload.val().Timestamp;
        if(keyA > keyB) return -1;
        if(keyA < keyB) return 1;
        return 0;
      });
    }).map((arr) => {
      return arr.map((item) => {
        const $key = item.payload.key;
        var comment = new Comment;
        comment.id = $key;
        comment.idea_id = item.payload.val().Idea;
        comment.title = item.payload.val().Title;
        comment.content = item.payload.val().Content;
        comment.owner = item.payload.val().User;
        comment.username = item.payload.val().OwnerName;
        comment.timestamp = item.payload.val().Timestamp;
        comment.aproved = item.payload.val().Aproved;
        return comment;
      });
    });
  }

  deleteComment(commentID: string, onComplete?: (a: Error | null) => any) {
    this.afDb.database.ref(`Comments/${commentID}`).remove(onComplete);
  }

}
