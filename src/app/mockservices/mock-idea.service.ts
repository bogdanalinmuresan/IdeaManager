import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { Idea } from '../Idea';
import { Tag } from '../tag';
import { of } from 'rxjs/observable/of';
import { VotedIdea } from '../VotedIdea';
import { ReferenceIdea } from '../referenceIdea';

@Injectable()
export class MockIdeaService {

  constructor() { }

  createIdea(title: string, description: string, shortDescription: string, userID: string, userName: string, tags?: any[], published?: boolean) {
    // Do nothing, act like idea is being created
  }

  getIdeas(): Observable<Idea[]>{
    var tag = new Tag;
    var tag2 = new Tag;
    tag.id = "testID";
    tag.title = "Tag1";
    tag2.id = "TestID2";
    tag2.title = "Tag2";
    var idea = new Idea;
    idea.id = "mockID";
    idea.title = "Great idea!";
    idea.description = "This is the amazing idea in question";
    idea.shortDescription = "This is a short description for the amazing idea";
    idea.owner = "TestUserID";
    idea.username = "Test User";
    idea.published = true;
    idea.negativeVotes = 0;
    idea.positiveVotes = 1;
    idea.timestamp = 1510959959;
    idea.tags = [tag, tag2];
    return of([idea]);
  }

  getIdea(id: string): Observable<Idea> {
    var tag = new Tag;
    var tag2 = new Tag;
    tag.id = "testID";
    tag.title = "Tag1";
    tag2.id = "TestID2";
    tag2.title = "Tag2";
    var idea = new Idea;
    idea.id = "mockID";
    idea.title = "Great idea!";
    idea.description = "This is the amazing idea in question";
    idea.shortDescription = "This is a short description for the amazing idea";
    idea.owner = "TestUserID";
    idea.username = "Test User";
    idea.published = true;
    idea.negativeVotes = 0;
    idea.positiveVotes = 1;
    idea.timestamp = 1510959959;
    idea.tags = [tag, tag2];
    return of(idea);
  }

  getIdeasFromUser(id: string): Observable<Idea[]> {
    var tag = new Tag;
    var tag2 = new Tag;
    tag.id = "testID";
    tag.title = "Tag1";
    tag2.id = "TestID2";
    tag2.title = "Tag2";
    var idea = new Idea;
    idea.id = "mockID";
    idea.title = "Great idea!";
    idea.description = "This is the amazing idea in question";
    idea.shortDescription = "This is a short description for the amazing idea";
    idea.owner = "TestUserID";
    idea.username = "Test User";
    idea.published = true;
    idea.negativeVotes = 0;
    idea.positiveVotes = 1;
    idea.timestamp = 1510959959;
    idea.tags = [tag, tag2];
    return of([idea]);
  }

  updateIdeaVote(idea: Idea) {
    // Do nothing, act like vote has been casted
    
  }

  saveideaUserVote(idea:Idea,vote:string):void{
    // Do nothing, act like it has been updated
  }
  
  deleteideaUserVote(idea:Idea):void{

  }

  checkUservoteIdea(idea_id:string,user_id):Promise<VotedIdea>{
    let myFirstPromise = new Promise<VotedIdea>((resolve, reject) => {
        var vI=new VotedIdea();
        vI.idea_id="mockIdeaID";
        vI.user_id="mockUserID";
        resolve(vI);
    });
    return myFirstPromise;
  }

  createReferenceIdea(idChild:string,idParent:string,title:string){
    var refIdea=new ReferenceIdea;
    refIdea.idea_id=idChild;
    refIdea.title=title;
  }

  getParentIdea(id_child:string):Observable<ReferenceIdea>{
    var ri = new ReferenceIdea;
    ri.idea_id = "MockID";
    ri.title = "Mock Title";
    return of(ri);
  }

}
