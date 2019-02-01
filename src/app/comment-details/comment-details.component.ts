import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { Input } from '@angular/core/';
import { User } from '../user';
import { NgForm } from '@angular/forms';
import { CommentService } from '../services/comment.service';
import { UserService } from '../services/user.service';
import { Comment } from '../Comment';

@Component({
  selector: 'comment-details',
  templateUrl: './comment-details.component.html',
  styleUrls: ['./comment-details.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class CommentDetailsComponent implements OnInit {

  @Input() comment: Comment;

  private user = new User;
  canRemove = false;
  hasError = false;
  errorMessage = "";

  constructor(
    public commentService: CommentService,
    public userService: UserService) {
    this.userService.currentUser.subscribe((user) => {
      if (user) {
        this.user = user;
      }
    })
  }

  ngOnInit() {
    if(this.comment)
    {
      this.canRemove = (this.comment.owner == this.user.id || this.user.Manager);
    }
    
  }

  deleteComment() {
    if (this.canRemove && confirm("Are you sure you wish to delete this comment?")) {
      this.commentService.deleteComment(this.comment.id, (error) => {
        if (error !== null) {
          this.hasError = true;
          this.errorMessage = error.message;
        }
      });
    }
  }

}
