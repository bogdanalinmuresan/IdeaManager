import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddingReferenceIdeaComponent } from './adding-reference-idea.component';
import { RouterTestingModule } from '@angular/router/testing';
import { IdeaService } from '../services/idea.service';
import { MockIdeaService } from '../mockservices/mock-idea.service';

describe('AddingReferenceIdeaComponent', () => {
  let component: AddingReferenceIdeaComponent;
  let fixture: ComponentFixture<AddingReferenceIdeaComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [ RouterTestingModule ],
      declarations: [ AddingReferenceIdeaComponent ],
      providers: [
        {provide: IdeaService, useClass: MockIdeaService}
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddingReferenceIdeaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
