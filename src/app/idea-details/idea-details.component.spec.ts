import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { IdeaDetailsComponent } from './idea-details.component';
import { FormsModule } from '@angular/forms';
import { IdeaService } from '../services/idea.service';
import { MockIdeaService } from '../mockservices/mock-idea.service';
import { CommentService } from '../services/comment.service';
import { MockCommentService } from '../mockservices/mock-comment.service';
import { AuthService } from '../services/auth.service';
import { MockAuthService } from '../mockservices/mock-auth.service';
import { RouterTestingModule } from '@angular/router/testing';
import { MockUserService } from '../mockservices/mock-user.service';
import { UserService } from '../services/user.service';
import { IdeaComponent } from '../idea/idea.component';
import { VotingIdeasComponent } from '../voting-ideas/voting-ideas.component';
import { CreateCommentComponent } from '../create-comment/create-comment.component';
import { CommentDetailsComponent } from '../comment-details/comment-details.component';
import { AddingReferenceIdeaComponent } from '../adding-reference-idea/adding-reference-idea.component';
import { SplitAndGetLastPipe } from '../pipes/split-and-get-last.pipe';
import {TextFormattingPipe} from "../pipes/text-formatting.pipe";

describe('IdeaDetailsComponent', () => {
  let component: IdeaDetailsComponent;
  let fixture: ComponentFixture<IdeaDetailsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [ FormsModule, RouterTestingModule ],
      declarations: [ IdeaDetailsComponent, IdeaComponent, VotingIdeasComponent, CreateCommentComponent, CommentDetailsComponent, AddingReferenceIdeaComponent, SplitAndGetLastPipe, TextFormattingPipe ],
      providers: [
        {provide: IdeaService, useClass: MockIdeaService},
        {provide: CommentService, useClass: MockCommentService},
        {provide: AuthService, useClass: MockAuthService},
        {provide: UserService, useClass: MockUserService}
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(IdeaDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
