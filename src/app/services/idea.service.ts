import { Injectable } from '@angular/core';
import { AngularFireDatabase, snapshotChanges } from 'angularfire2/database';
import { Observable } from 'rxjs/Observable';
import { Tag } from '../tag';
import { TagService } from './tag.service';
import { Idea } from '../Idea';
import { Comment } from '../Comment';
import { of } from 'rxjs/observable/of';
import { VotedIdea } from '../VotedIdea';
import {SearchService} from "./search.service";
import { ReferenceIdea } from '../referenceIdea';
import { Upload } from '../upload';
import { UploadService } from './upload.service';

@Injectable()
export class IdeaService {
  public voteIdea$: Observable<any>;
  public parent;

  constructor(
    public afDb: AngularFireDatabase,
    public tagService: TagService,
    public searchService: SearchService,
    public uploadService: UploadService
  ) { }

  createIdea(title: string, description: string, shortDescription: string, userID: string, userName: string, tags?: any[], attachments?: Upload[], published?: boolean) {
    const saveTags: { ID: string, Title: string }[] = [];
    for(let i=0; i < tags.length; i++)
    {
      if( tags[i].id==null ) // If the tag doesn't exist, create it
      {
        tags[i].id = this.tagService.addTag(tags[i].display);
      }
      saveTags.push({ID: tags[i].id, Title: tags[i].display});
    }

    const saveAttachments: { Type: string, Name: string, OriginalName: string, File: string }[] = [];
    for(let i=0; i < attachments.length; i++)
    {
      saveAttachments.push({Type: attachments[i].file.type, Name: attachments[i].name, OriginalName: attachments[i].originalName,  File: attachments[i].url});
    }

    const timestamp = +new Date;

    const result = this.afDb.database.ref("Ideas").push({
      Title: title,
      Description: description,
      ShortDescription: shortDescription,
      User: userID,
      OwnerName: userName,
      Published: published,
      Timestamp: timestamp,
      Tags: saveTags,
      Attachments: saveAttachments,
      PositiveVote: 0,
      NegativeVote: 0
    });

    this.searchService.pushIdeaToIndex(result.key,
      title, description, shortDescription, userID, userName, saveTags, timestamp, published);

    return result;
  }

  getIdeasOrderedByPositiveVote(): Observable<Idea[]>{
    return this.afDb.list<any>('Ideas', ref => ref.orderByChild('PositiveVote')).snapshotChanges().map((arr) => {
      return arr.sort(function(a, b){
        var keyA = a.payload.val().PositiveVote - a.payload.val().NegativeVote,
            keyB = b.payload.val().PositiveVote - b.payload.val().NegativeVote;
        if(keyA > keyB) return -1;
        if(keyA < keyB) return 1;
        return 0;
      });
    }).map((arr) => {
      return arr.map((item) => {
        return this.mapIdea(item.key, item.payload.val());
      });
    });
  }

  getIdeasFromUserOrderedByPositiveVote(userID: string): Observable<Idea[]>{
    return this.afDb.list<any>('Ideas', ref => ref.orderByChild('User').equalTo(userID)).snapshotChanges().map((arr) => {
      return arr.sort(function(a, b){
        var keyA = a.payload.val().PositiveVote - a.payload.val().NegativeVote,
            keyB = b.payload.val().PositiveVote - b.payload.val().NegativeVote;
        if(keyA > keyB) return -1;
        if(keyA < keyB) return 1;
        return 0;
      });
    }).map((arr) => {
      return arr.map((item) => {
        return this.mapIdea(item.key, item.payload.val());
      });
    });
  }

  getIdeas(): Observable<Idea[]>{
    return this.afDb.list<any>('Ideas', ref => ref.orderByChild('Published').equalTo(true)).snapshotChanges().map((arr) => {
      return arr.sort(function(a, b){
        var keyA = a.payload.val().Timestamp,
            keyB = b.payload.val().Timestamp;
        // Compare the 2 timestamps
        if(keyA > keyB) return -1;
        if(keyA < keyB) return 1;
        return 0;
      });
    }).map((arr) => {
      return arr.map((item) => {
        return this.mapIdea(item.key, item.payload.val());
      });
    });
  }

  getIdeasFromUser(userID: string): Observable<Idea[]> {
    if(userID != null)
    {
      return this.afDb.list<any>('Ideas', ref => ref.orderByChild('User').equalTo(userID)).snapshotChanges().map((arr) => {
        return arr.sort(function(a, b) {
          var keyA = a.payload.val().Timestamp,
              keyB= b.payload.val().Timestamp;
          // Compare the two timestamps
          if(keyA > keyB) return -1;
          if(keyA < keyB) return 1;
          return 0;
        });
      }).map((arr) => {
        return arr.map((item) => {
          return this.mapIdea(item.key, item.payload.val());
        });
      });
    }
    else
    {
      return of(null);
    }

  }

  getIdea(id: string): Observable<Idea> {
    return this.afDb.object<any>(`Ideas/${id}`).snapshotChanges().map(action => {
      return this.mapIdea(action.key, action.payload.val());
    });
  }

  deleteIdea(ideaID: string, onComplete?: (a: Error | null) => any) {
    this.getIdea(ideaID).subscribe((idea) => {
      // Make sure to delete attachments too!
      if(idea.attachments)
      {
        for(var i=0;i < idea.attachments.length; i++)
        {
          this.uploadService.deleteFile(idea.attachments[i]);
        }
      }
      this.afDb.database.ref(`Ideas/${ideaID}`).remove(onComplete);
      this.searchService.deleteIdeaInIndex(ideaID);
    });
  }

  updateIdea(idea: Idea, attachments?: Upload[]) {
    var saveTags: {ID: string, Title: string}[] = [];
    for(var i=0; i < idea.tags.length; i++)
    {
      if( idea.tags[i].id==null ) // If the tag doesn't exist, create it
      {
        idea.tags[i].id = this.tagService.addTag(idea.tags[i].title);
      }
      saveTags.push({ID: idea.tags[i].id, Title: idea.tags[i].title});
    }

    const saveAttachments: { Type: string, Name: string, OriginalName: string, File: string }[] = [];
    if(attachments)
    {
      for(let i=0; i < attachments.length; i++)
      {
        saveAttachments.push({Type: attachments[i].type, Name: attachments[i].name, OriginalName: attachments[i].originalName,  File: attachments[i].url});
      }
    }

    const result = this.afDb.object(`Ideas/${idea.id}`).update({
      Title: idea.title,
      Description: idea.description,
      ShortDescription: idea.shortDescription,
      User: idea.owner,
      OwnerName: idea.username,
      Published: idea.published,
      Tags: saveTags,
      Attachments: saveAttachments
    });

    this.searchService.updateIdeaInIndex(idea.id, idea.title, idea.description, idea.shortDescription, idea.owner,
      idea.username, idea.published, saveTags);

    return result;
  }

  updateIdeaVote(idea:Idea):void{
    //update total votes of idea
    this.afDb.database.ref('Ideas/'+idea.id)
    .update({PositiveVote:idea.positiveVotes});
  }

  saveideaUserVote(idea:Idea,vote:string):void{
    var ref=this.afDb.database.ref(`VotedIdea/${idea.id}`);
    ref.set({user_id:idea.owner,vote:vote});
  }

  deleteideaUserVote(idea:Idea):void{
    var ref=this.afDb.database.ref(`VotedIdea/${idea.id}`);
    ref.remove();
  }

  checkUservoteIdea(idea_id:string,user_id):Promise<VotedIdea>{
    let myFirstPromise = new Promise<VotedIdea>((resolve, reject) => {
      this.afDb.database.ref(`VotedIdea/${idea_id}`)
      .on('value',function(datasnapshot){
        var vI=new VotedIdea();
        vI.idea_id=idea_id;

        if(datasnapshot.val()!=null){
          vI.user_id=datasnapshot.val().user_id;
          vI.vote=datasnapshot.val().vote;
        }
        resolve(vI);
      })
    });
    return myFirstPromise;
  }

  /**
   * This methods create a relationship between a "child" idea that reference to a "parent" idea
   * @param idParent key of parent idea
   * @param idChild key of child idea
   */
  createReferenceIdea(idChild:string,idParent:string,title:string){
    var ref= this.afDb.database.ref(`ReferenceIdeas/${idChild}`);
    ref.set({idParent:idParent,title:title});
  }

  getParentIdea(id_child:string):Observable<ReferenceIdea>{
      return this.afDb.object<any>(`ReferenceIdeas/${id_child}`).snapshotChanges().map(action=>{
        var refIdea=new ReferenceIdea;
        var pv=action.payload.val();
        if(pv)
        {
          refIdea.idea_id=pv.idParent;
          refIdea.title=pv.title;
        }
        return refIdea;
      });
  }

  mapIdea(key: string, payload): Idea {
    var idea = new Idea;
    idea.id = key;
    idea.title = payload.Title;
    idea.description = payload.Description;
    idea.shortDescription = payload.ShortDescription;
    idea.owner = payload.User;
    idea.username = payload.OwnerName;
    idea.published = payload.Published;
    idea.negativeVotes = payload.NegativeVote;
    idea.positiveVotes = payload.PositiveVote;
    idea.timestamp = payload.Timestamp;
    idea.tags = payload.Tags.map((tagItem) => {
      var tag = new Tag;
      tag.id = tagItem.ID;
      tag.title = tagItem.Title;
      return tag;
    });
    if(payload.Attachments)
    {
      idea.attachments = payload.Attachments.map((file) => {
        let ul = new Upload;
        ul.originalName = file.OriginalName;
        ul.name = file.Name;
        ul.url = file.File;
        ul.type = file.Type;
        ul.progress = 100;
        return ul;
      });
    }
    return idea;
  }

}
