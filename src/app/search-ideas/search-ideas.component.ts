import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import {UserService} from "../services/user.service";
import {ActivatedRoute} from "@angular/router";
import {Observable} from "rxjs/Observable";
import {Idea} from "../Idea";
import {SearchService} from "../services/search.service";

@Component({
  selector: 'app-search-ideas',
  templateUrl: './search-ideas.component.html',
  styleUrls: ['./search-ideas.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class SearchIdeasComponent implements OnInit {

  isApproved: boolean;
  isTagSearch: boolean = false;
  searchTerm: string;
  hasError = false;

  searchResults: Observable<Idea[]>;
  ideas: Observable<Idea[]>;

  constructor(private route: ActivatedRoute,
              private userService: UserService,
              private searchService: SearchService) {

  }

  ngOnInit() {
    this.userService.currentUser.subscribe((user) => {
      if (user !== null) {
        this.isApproved = user.Approved;
      }
      else {
        this.isApproved = false;
      }
    });

    this.searchResults = this.searchService.results;

    this.searchTerm = this.route.snapshot.paramMap.get('term');

    if(+this.route.snapshot.paramMap.get("tag") === 1) {
      this.searchService.searchTags(this.searchTerm, (err) => {
        this.hasError = true;
      });
      this.isTagSearch = true;
    }
    else {
      this.searchService.searchIdeas(this.searchTerm, (err) => {
        this.hasError = true;
      });
    }

    this.route.params.subscribe(params => {
      this.searchTerm = params['term'];
      this.searchService.searchIdeas(this.searchTerm, (err) => {
          this.hasError = true;
      });
    })

  }
}
