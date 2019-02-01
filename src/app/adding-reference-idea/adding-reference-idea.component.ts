import { Component, OnInit, ViewEncapsulation, Input } from '@angular/core';
import { Idea } from '../Idea';
import { IdeaService } from '../services/idea.service';
import { Observable } from 'rxjs/Observable';
import { ReferenceIdea } from '../referenceIdea';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-adding-reference-idea',
  templateUrl: './adding-reference-idea.component.html',
  styleUrls: ['./adding-reference-idea.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class AddingReferenceIdeaComponent implements OnInit {

  @Input() idea: Idea;
  public parentIdea:ReferenceIdea = new ReferenceIdea;

  constructor(
    public ideaService: IdeaService,
    private route: ActivatedRoute,
    private router: Router)
  {
  }


  ngOnInit() {
    if(this.idea)
    {
      this.ideaService.getParentIdea(this.idea.id).subscribe((parentIdea)=>
      {
        this.parentIdea=parentIdea;
      });
    }
  }

}
