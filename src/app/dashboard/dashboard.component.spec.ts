import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DashboardComponent } from './dashboard.component';
import { RouterTestingModule } from '@angular/router/testing';
import { IdeaService } from '../services/idea.service';
import { MockIdeaService } from '../mockservices/mock-idea.service';
import { IdeaComponent } from '../idea/idea.component';
import { VotingIdeasComponent } from '../voting-ideas/voting-ideas.component';
import {MockUserService} from "../mockservices/mock-user.service";
import {UserService} from "../services/user.service";
import { AddingReferenceIdeaComponent } from '../adding-reference-idea/adding-reference-idea.component';
import { SplitAndGetLastPipe } from '../pipes/split-and-get-last.pipe';
import {TextFormattingPipe} from "../pipes/text-formatting.pipe";
import { DebugElement } from '@angular/core/src/debug/debug_node';
import { By } from '@angular/platform-browser';

describe('DashboardComponent', () => {
  let component: DashboardComponent;
  let fixture: ComponentFixture<DashboardComponent>;
  let htmlElement: HTMLElement;
  let debugElement: DebugElement;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [ RouterTestingModule ],
      declarations: [ DashboardComponent, IdeaComponent, VotingIdeasComponent, AddingReferenceIdeaComponent, SplitAndGetLastPipe, TextFormattingPipe ],
      providers: [
        {provide: IdeaService, useClass: MockIdeaService},
        {provide: UserService, useClass: MockUserService}
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DashboardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('Should have grid button', () => {
    debugElement = fixture.debugElement.query(By.css('#grid'));
    expect(debugElement.nativeElement).toBeTruthy();
  });

  it('Should have list button', () => {
    debugElement = fixture.debugElement.query(By.css('#list'));
    expect(debugElement.nativeElement).toBeTruthy();
  });

  it('List should be default', () => {
    debugElement = fixture.debugElement.query(By.css('#list.active'));
    expect(debugElement.nativeElement).toBeTruthy();
    debugElement = fixture.debugElement.query(By.css("#ideas.list-group"));
    expect(debugElement.nativeElement).toBeTruthy();
  });

  it('Should change between list and grid', () => {
    let button = fixture.debugElement.query(By.css('#grid'));
    button.nativeElement.click();

    // Switch to grid
    fixture.whenStable().then(() => {
      debugElement = fixture.debugElement.query(By.css("#ideas .item .grid-group-item"))[0];
      expect(debugElement.nativeElement).toBeTruthy();
    });

    button = fixture.debugElement.query(By.css('#list'));
    button.nativeElement.click();

    // Switch back to list
    fixture.whenStable().then(() => {
      debugElement = fixture.debugElement.query(By.css("#ideas .item .list-group-item-light"))[0];
      expect(debugElement.nativeElement).toBeTruthy();
    });

  });
});
