import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { of } from 'rxjs/observable/of';
import { Comment } from '../Comment';

@Injectable()
export class MockCommentService {

  constructor() { }

  createComment(content: string, userID: string, userName: string, ideaID: string) {
    // Do nothing, act like comment has been created
  }

  getComments(idea_id: string): Observable<Comment[]> { //TODO get only comments for an idea_id
    // Return mock comment
    var comment = new Comment;
    comment.id = "MockID";
    comment.content = "Mock comment content";
    comment.title = "Mock comment title";
    comment.timestamp = +new Date();
    comment.owner = "MockOwnerID";
    comment.username = "Mock owner";
    comment.idea_id = "MockIdeaID";
    return of([comment]);
  }
}
