import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs/Observable';
import { IdeaService } from '../services/idea.service';
import { CommentService } from '../services/comment.service';
import { User } from '../user';
import { Comment } from '../Comment';
import { NgForm } from '@angular/forms';
import {Router} from "@angular/router";
import { UserService } from '../services/user.service';
import { Idea } from '../Idea';

@Component({
  selector: 'app-idea-details',
  templateUrl: './idea-details.component.html',
  styleUrls: ['./idea-details.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class IdeaDetailsComponent implements OnInit {

  idea: Observable<Idea>;
  comments: Observable<Comment[]>;
  id: string;
  private user = new User;

  constructor(
    private route: ActivatedRoute,
    private ideaService: IdeaService,
    private commentService: CommentService,
    private userService: UserService,
    private router: Router
  ) { 
    this.userService.currentUser.subscribe((user) => {
      this.user = user;
    });
  }

  ngOnInit() {
    if(+this.route.snapshot.paramMap.get("ref") === 2 && this.route.snapshot.paramMap.get("id")){
    this.id = this.route.snapshot.paramMap.get("id");
    this.idea=this.ideaService.getIdea(this.id);
    this.comments = this.commentService.getComments(this.id);
    
    }else{  
      this.getIdea();
    }
  }

  getIdea(): void {
    this.id = this.route.snapshot.paramMap.get("id");
    this.idea = this.ideaService.getIdea(this.id);
    this.comments = this.commentService.getComments(this.id);
  }

}
