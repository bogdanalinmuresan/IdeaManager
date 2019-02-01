import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { VotingIdeasComponent } from './voting-ideas.component';
import { IdeaService } from '../services/idea.service';
import { MockIdeaService } from '../mockservices/mock-idea.service';
import { UserService } from '../services/user.service';
import { MockUserService } from '../mockservices/mock-user.service';

describe('VotingIdeasComponent', () => {
  let component: VotingIdeasComponent;
  let fixture: ComponentFixture<VotingIdeasComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ VotingIdeasComponent ],
      providers: [
        {provide: IdeaService, useClass: MockIdeaService},
        {provide: UserService, useClass: MockUserService}
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(VotingIdeasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
