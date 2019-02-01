import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CommentDetailsComponent } from './comment-details.component';
import { RouterTestingModule } from '@angular/router/testing';
import { CommentService } from '../services/comment.service';
import { MockCommentService } from '../mockservices/mock-comment.service';
import { UserService } from '../services/user.service';
import { MockUserService } from '../mockservices/mock-user.service';

describe('CommentDetailsComponent', () => {
  let component: CommentDetailsComponent;
  let fixture: ComponentFixture<CommentDetailsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [ RouterTestingModule ],
      declarations: [ CommentDetailsComponent ],
      providers: [ 
        {provide: CommentService, useClass: MockCommentService},
        {provide: UserService, useClass: MockUserService}
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CommentDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
