import {Injectable} from "@angular/core";
import {Idea} from "../Idea";
import {Tag} from "../tag";
import {BehaviorSubject} from "rxjs/BehaviorSubject";
import { algoliaConfig } from '../../environments/api';
import * as algoliasearch from 'algoliasearch';

@Injectable()
export class SearchService {

  client = algoliasearch(algoliaConfig.appId, algoliaConfig.adminKey, {protocol: 'https:'});
  index = this.client.initIndex(algoliaConfig.indexName);
  public results: BehaviorSubject<Idea[]> = new BehaviorSubject(null);

  constructor() {}

  searchIdeas(title: string, onError: (err: Error) => void) {

    this.index.search({
      query: title,
      filters: 'Published:true'
    }, (err, content) => {

      if (err) {
        onError(err);
        return;
      }

      this.results.next(content.hits.map(hit => {
        const idea = new Idea;
        idea.id = hit.objectID;
        idea.title = hit.Title;
        idea.description = hit.Description;
        idea.shortDescription = hit.ShortDescription;
        idea.owner = hit.User;
        idea.username = hit.OwnerName;
        idea.published = hit.Published;
        idea.negativeVotes = hit.NegativeVote;
        idea.positiveVotes = hit.PositiveVote;
        idea.timestamp = hit.Timestamp;
        idea.tags = hit.Tags.map((tagItem) => {
          const tag = new Tag;
          tag.id = tagItem.ID;
          tag.title = tagItem.Title;
          return tag;
        });

        return idea;
      }));
    });
  }

  searchTags(title: string, onError: (err: Error) => void) {

    this.index.search({
      filters: 'Tags.Title:\"' + title + '\” AND published:true"'
    }, (err, content) => {

      if (err) {
        onError(err);
        return;
      }

      this.results.next(content.hits.map(hit => {
        var idea = new Idea;
        idea.id = hit.objectID;
        idea.title = hit.Title;
        idea.description = hit.Description;
        idea.shortDescription = hit.ShortDescription;
        idea.owner = hit.User;
        idea.username = hit.OwnerName;
        idea.published = hit.Published;
        idea.negativeVotes = hit.NegativeVote;
        idea.positiveVotes = hit.PositiveVote;
        idea.timestamp = hit.Timestamp;
        idea.tags = hit.Tags.map((tagItem) => {
          var tag = new Tag;
          tag.id = tagItem.ID;
          tag.title = tagItem.Title;
          return tag;
        });

        return idea;
      }));
    });
  }

  pushIdeaToIndex(key: string,
                  title: string,
                  description: string,
                  shortDescription: string,
                  userID: string,
                  userName: string,
                  tags: any[],
                  timestamp: number,
                  published: boolean) {

    this.index.addObject({
      objectID: key,
      Title: title,
      Description: description,
      ShortDescription: shortDescription,
      User: userID,
      OwnerName: userName,
      Published: published,
      Timestamp: timestamp,
      Tags: tags,
      PositiveVote: 0,
      NegativeVote: 0
    }, (err, res) => {
        if(err) {
          return;
        }
    });
  }

  updateIdeaInIndex(id: string, title: string, description: string, shortDescription: string, user: string, ownerName: string, published: boolean, tags: { ID: string; Title: string }[]) {

    this.index.partialUpdateObject({
      objectID: id,
      Title: title,
      Description: description,
      ShortDescription: shortDescription,
      User: user,
      OwnerName: ownerName,
      Published: published,
      Tags: tags
    });

  }

  deleteIdeaInIndex(id: string) {

    this.index.deleteObject(id);
  }
}
