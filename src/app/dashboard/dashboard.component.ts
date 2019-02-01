import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { IdeaService } from '../services/idea.service';
import { Idea } from '../Idea';
import {UserService} from "../services/user.service";

import * as $ from 'jquery';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class DashboardComponent implements OnInit {

  ideasObservable: Observable<Idea[]>;

  isApproved: boolean;
  isOrderedByVote = false;

  listView = true;

  constructor(
    public ideaService: IdeaService,
    public userService: UserService
  ) { }

  ngOnInit() {
    this.ideasObservable = this.ideaService.getIdeas();

    this.userService.currentUser.subscribe((user) => {
      if (user !== null) {
        this.isApproved = user.Approved;
      }
      else {
        this.isApproved = false;
      }
    });
  }

  ngAfterViewChecked() {
    //Called after every check of the component's view. Applies to components only.
    //Add 'implements AfterViewChecked' to the class.
    $("#list").click(function(event) {
      event.preventDefault();
      $("#ideas .item").addClass("list-group-item-light").removeClass("grid-group-item");
      $("#ideas").addClass("list-group");
      $(this).addClass("active");
      $("#grid").removeClass("active");
    });

    $("#grid").click(function(event) {
      event.preventDefault();
      $("#ideas .item").addClass("grid-group-item").removeClass("list-group-item-light");
      $("#ideas").removeClass("list-group");
      $(this).addClass("active");
      $("#list").removeClass("active");
    });
  }

  onSortRequest() {
    this.isOrderedByVote = !this.isOrderedByVote;
    if (this.isOrderedByVote) {
      this.ideasObservable = this.ideaService.getIdeasOrderedByPositiveVote();
      $("#sortButton").addClass("active");
    } else {
      this.ideasObservable = this.ideaService.getIdeas();
      $("#sortButton").removeClass("active");
    }
  }

}
