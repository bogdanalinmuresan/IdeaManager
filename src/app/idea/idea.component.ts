import { Input, Component, OnInit, ViewEncapsulation } from '@angular/core';
import { Idea } from '../Idea';
import { User } from '../user';
import { UserService } from '../services/user.service';
import { IdeaService } from '../services/idea.service';
import { Router } from '@angular/router';
import { Location } from '@angular/common';

@Component({
  selector: 'idea',
  templateUrl: './idea.component.html',
  styleUrls: ['./idea.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class IdeaComponent implements OnInit {

  @Input() idea: Idea;
  @Input() full: boolean;

  public isManager = false;
  private user = new User;
  canRemoveIdea = false;
  canEditIdea = false;
  hasError = false;
  errorMessage = "";

  constructor(
    private router: Router,
    public ideaService: IdeaService,
    private userService: UserService,
    private location: Location
  ) {
    this.userService.currentUser.subscribe((user) => {
      if (user) {
        this.user = user;
      }
    });
  }

  ngOnInit() {
    this.userService.currentUser.subscribe((user) => {
      if(user)
      {
        this.isManager = user.Manager;
      }
    });
    // Check that idea actually exists
    if(this.idea)
    {
      this.canEditIdea = this.user.id == this.idea.owner || this.user.Manager;
      this.canRemoveIdea = this.user.id == this.idea.owner || this.user.Manager;
    }
    
  }

  deleteIdea() {
    if (this.canRemoveIdea && confirm("Are you sure you wish to delete this idea?")) {
      this.ideaService.deleteIdea(this.idea.id, (error) => {
        if (error !== null) {
          this.hasError = true;
          this.errorMessage = error.message;
        }
        else
        {
          this.router.navigate(['/']);
        }
      });
    }
  }

  downloadAttachment(file: string) {
    window.open(file);
  }

  goBack() {
    this.router.navigate(['/']);
  }

}
