import { Component, OnInit, ViewEncapsulation, OnDestroy } from '@angular/core';
import { UserService } from '../services/user.service';
import { User } from '../user';
import { Observable } from 'rxjs/Observable';
import { Idea } from '../Idea';
import { IdeaService } from '../services/idea.service';
import { RouterModule } from '@angular/router';

import * as $ from 'jquery';

@Component({
  selector: 'app-my-ideas',
  templateUrl: './my-ideas.component.html',
  styleUrls: ['./my-ideas.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class MyIdeasComponent implements OnInit {

  private user = new User;
  public ideasObservable: Observable<Idea[]>;
  isOrderedByVote = false;

  constructor(
    private userService: UserService,
    private ideaService: IdeaService
  ) {
    this.userService.currentUser.subscribe((user) => {
      this.user = user;
      this.ideasObservable = this.ideaService.getIdeasFromUser(this.user.id);
    });
   }

  ngOnInit() {
  }

  onSortRequest() {
    this.isOrderedByVote = !this.isOrderedByVote;
    if (this.isOrderedByVote) {
      this.ideasObservable = this.ideaService.getIdeasFromUserOrderedByPositiveVote(this.user.id);
      $("#sortButton").addClass("active");
    } else {
      this.ideasObservable = this.ideaService.getIdeasFromUser(this.user.id);
      $("#sortButton").removeClass("active");
    }
  }

}
