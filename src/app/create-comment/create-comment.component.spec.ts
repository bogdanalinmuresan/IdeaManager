import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateCommentComponent } from './create-comment.component';
import { CommentService } from '../services/comment.service';
import { MockCommentService } from '../mockservices/mock-comment.service';
import { AuthService } from '../services/auth.service';
import { MockAuthService } from '../mockservices/mock-auth.service';
import { RouterTestingModule } from '@angular/router/testing';
import { UserService } from '../services/user.service';
import { MockUserService } from '../mockservices/mock-user.service';
import { FormsModule } from '@angular/forms';

describe('CreateCommentComponent', () => {
  let component: CreateCommentComponent;
  let fixture: ComponentFixture<CreateCommentComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [ RouterTestingModule, FormsModule ],
      declarations: [ CreateCommentComponent ],
      providers: [ 
        {provide: CommentService, useClass: MockCommentService},
        {provide: UserService, useClass: MockUserService}
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CreateCommentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
