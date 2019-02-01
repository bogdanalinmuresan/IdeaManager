import { Injectable } from '@angular/core';

@Injectable()
export class MockSearchService {

  constructor() {}

  searchIdeas(title: string, onError: (err: Error) => void) {
  }

  searchTags(title: string, onError: (err: Error) => void) {
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
  }

  updateIdeaInIndex(id: string, title: string, description: string, shortDescription: string, user: string, ownerName: string, published: boolean, tags: { ID: string; Title: string }[]) {
  }

  deleteIdeaInIndex(id: string) {
  }

}
