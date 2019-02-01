import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { IdeaComponent } from './idea.component';
import { RouterTestingModule } from '@angular/router/testing';
import { VotingIdeasComponent } from '../voting-ideas/voting-ideas.component';
import { AddingReferenceIdeaComponent } from '../adding-reference-idea/adding-reference-idea.component';
import { UserService } from '../services/user.service';
import { MockUserService } from '../mockservices/mock-user.service';
import { IdeaService } from '../services/idea.service';
import { MockIdeaService } from '../mockservices/mock-idea.service';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';
import { Idea } from '../Idea';
import { SplitAndGetLastPipe } from '../pipes/split-and-get-last.pipe';
import {TextFormattingPipe} from "../pipes/text-formatting.pipe";

describe('IdeaComponent', () => {
  let component: IdeaComponent;
  let fixture: ComponentFixture<IdeaComponent>;
  let titleElement: HTMLElement;
  let debugElement: DebugElement;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [ RouterTestingModule ],
      declarations: [ IdeaComponent, VotingIdeasComponent, AddingReferenceIdeaComponent, SplitAndGetLastPipe, TextFormattingPipe ],
      providers: [
        {provide: UserService, useClass: MockUserService},
        {provide: IdeaService, useClass: MockIdeaService}
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(IdeaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();

    let testIdea = new Idea;
    testIdea.title = "Test idea";
    testIdea.tags = [];
    component.idea = testIdea;


    fixture.detectChanges(); // trigger initial data binding
    debugElement = fixture.debugElement.query(By.css('h4.idea-title'));
    titleElement = debugElement.nativeElement;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('Should have idea title', () => {
    fixture.detectChanges();
    expect(titleElement.textContent).toBe(component.idea.title);
  });
});
