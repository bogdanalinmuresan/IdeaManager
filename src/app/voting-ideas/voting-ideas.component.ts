import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { Input } from '@angular/core/';
import { Idea } from '../Idea';
import { IdeaService } from '../services/idea.service';
import { User } from '../user';
import { UserService } from '../services/user.service';
import { Observable } from 'rxjs/Observable';

@Component({
  selector: 'voting-ideas',
  templateUrl: './voting-ideas.component.html',
  styleUrls: ['./voting-ideas.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class VotingIdeasComponent implements OnInit {
  @Input() idea:Idea;

  public hasVotePositive=false;
  public hasVoteNegative=false;
  public isVoted=false;
  public isOwner = false;
  public isChanged=false;

  constructor(
    public ideaService: IdeaService,
    public userService: UserService
  ) { }

  ngOnInit() {
    if(this.idea)
    {
      this.userService.currentUser.subscribe((user) => {
        if(user && this.idea)
        {
          if(user.id == this.idea.owner)
          {
            this.isOwner = true;
          }
        }
      });
      this.ideaService.checkUservoteIdea(this.idea.id,this.idea.owner)
        .then((result) => {
          if(result.user_id){
            if(this.idea.owner==result.user_id){
              this.isVoted=true;
              if(result.vote=="+1"){
                //the idea is voted by user
                this.hasVotePositive = true;
                this.hasVoteNegative = false;
              }else{
                if(result.vote=="-1")
                  this.hasVoteNegative = true;
                  this.hasVotePositive = false;
              } 
            }else{
              this.isVoted=false;
            }
          }
      });
    }
  }

  vote_Up(idea) {
    //before vote, check if user hasnt vote this idea before
    if(!this.isOwner)
    {
      this.ideaService.checkUservoteIdea(idea.id,idea.owner)
      .then((result) => {
         if(result.user_id){
            if(idea.owner==result.user_id){//idea is voted
              if(this.hasVoteNegative){//the idea chhange the vote
                if(this.idea.positiveVotes==-1){
                  this.idea.positiveVotes=this.idea.positiveVotes+2;
                  this.ideaService.updateIdeaVote(idea);
                  this.ideaService.saveideaUserVote(idea,"+1");
                  this.isChanged=true;
                }else{
                  this.idea.positiveVotes++;
                  this.ideaService.updateIdeaVote(idea);
                  this.ideaService.saveideaUserVote(idea,"+1");
                  this.isChanged=true;
                }
              }else{
                if(this.hasVotePositive){//remove vote
                  if(confirm("All ideas are awesome, do you want remove your vote?")){
                    this.isVoted=false;
                    this.hasVotePositive = false;
                    this.hasVoteNegative=false;
                    this.isChanged=false;
                    this.ideaService.deleteideaUserVote(idea);
                    this.idea.positiveVotes--;
                    this.ideaService.updateIdeaVote(idea);
                  }
                }else{
                  this.isVoted=true;
                  this.hasVotePositive = true;
                  this.hasVoteNegative=false;
                  this.isChanged=false;
                }
              }
            }
         }else{
          this.idea.positiveVotes++;
          this.ideaService.updateIdeaVote(idea);
          this.ideaService.saveideaUserVote(idea,"+1");
         }
      });
    }else{
      confirm("You love your idea but let others vote for it");
    }
  }

  vote_Down(idea) {
    //before vote, check if user hasnt vote this idea before
    if(!this.isOwner)
    {
      this.ideaService.checkUservoteIdea(idea.id,idea.owner)
      .then((result) => {
         if(result.user_id){
            if(idea.owner==result.user_id){
              if(this.hasVotePositive){//the vote is changed
                if(this.idea.positiveVotes==1){
                  this.idea.positiveVotes=this.idea.positiveVotes-2;
                  this.ideaService.updateIdeaVote(idea);
                  this.ideaService.saveideaUserVote(idea,"-1");
                  this.isChanged=true;
                }else{
                  this.idea.positiveVotes--;
                  this.ideaService.updateIdeaVote(idea);
                  this.ideaService.saveideaUserVote(idea,"-1");
                  this.isChanged=true;
                }
              }else{
                if(this.hasVoteNegative){//remove vote
                  if(confirm("All ideas are awesome, do you want remove your vote?")){
                    this.isVoted=false;
                    this.hasVotePositive = false;
                    this.hasVoteNegative=false;
                    this.isChanged=false;
                    this.ideaService.deleteideaUserVote(idea);
                    this.idea.positiveVotes++;
                    this.ideaService.updateIdeaVote(idea);
                  }
                }else{
                  this.isVoted=true;
                  this.hasVoteNegative =true;
                  this.hasVotePositive = false;
                  this.isChanged=false;
                }
              }
            }
         }else{
          this.idea.positiveVotes--;
          this.ideaService.updateIdeaVote(idea);
          this.ideaService.saveideaUserVote(idea,"-1");
         }
      });
    }else{
      confirm("You love your idea but let others vote for it");
    }
  }
}
