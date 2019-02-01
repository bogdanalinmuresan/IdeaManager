import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SearchIdeasComponent } from './search-ideas.component';
import {SearchService} from "../services/search.service";
import {MockSearchService} from "../mockservices/mock-search.service";
import {UserService} from "../services/user.service";
import {MockUserService} from "../mockservices/mock-user.service";
import {RouterTestingModule} from "@angular/router/testing";
import {IdeaComponent} from "../idea/idea.component";
import {FormsModule} from "@angular/forms";
import {VotingIdeasComponent} from "../voting-ideas/voting-ideas.component";
import {AddingReferenceIdeaComponent} from "../adding-reference-idea/adding-reference-idea.component";
import { SplitAndGetLastPipe } from '../pipes/split-and-get-last.pipe';
import {TextFormattingPipe} from "../pipes/text-formatting.pipe";

describe('SearchIdeasComponent', () => {
  let component: SearchIdeasComponent;
  let fixture: ComponentFixture<SearchIdeasComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [ RouterTestingModule, FormsModule ],
      declarations: [ SearchIdeasComponent, IdeaComponent, VotingIdeasComponent, AddingReferenceIdeaComponent, SplitAndGetLastPipe, TextFormattingPipe ],
      providers: [
        {provide: UserService, useClass: MockUserService},
        {provide: SearchService, useClass: MockSearchService}
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SearchIdeasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
