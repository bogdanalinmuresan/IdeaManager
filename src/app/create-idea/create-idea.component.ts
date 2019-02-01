import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import {Router} from "@angular/router";
import { User } from '../user';
import { NgForm } from '@angular/forms';
import { IdeaService } from '../services/idea.service';
import { AuthService } from '../services/auth.service';
import { TagService } from '../services/tag.service';
import { Observable } from 'rxjs/Observable';

import 'rxjs/add/observable/of';
import 'rxjs/add/operator/filter';
import 'rxjs/add/operator/first';
import 'rxjs/add/operator/debounceTime';
import 'rxjs/add/operator/map';
import { Tag } from '../tag';
import { UserService } from '../services/user.service';
import { ActivatedRoute } from '@angular/router';
import { Idea } from '../Idea';
import { Upload } from '../upload';
import { UploadService } from '../services/upload.service';
import { Location } from '@angular/common';

@Component({
  selector: 'app-create-idea',
  templateUrl: './create-idea.component.html',
  styleUrls: ['./create-idea.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class CreateIdeaComponent implements OnInit {

  selectedFiles: FileList;
  fileList: Upload[] = [];

  private user = new User;
  public isLoggedIn: boolean;
  public ideaID: string;
  public isRef = false;
  public editing = false;
  public idea: Idea = new Idea;
  preview: boolean = false;

  public ideaReferenced: Idea = new Idea;

  items: Tag[];
  tags;

  hasError = false;
  errorMessage = "";

  constructor(
    private route: ActivatedRoute,
    public ideaService: IdeaService,
    public tagService: TagService,
    public userService: UserService,
    private uploadService: UploadService,
    private location: Location,
    private router: Router)
  {
    this.userService.currentUser.subscribe((user) => {
      this.user = user;
    });
   }

  ngOnInit() {
    this.idea.published = false; // Default for radio buttons
    if(+this.route.snapshot.paramMap.get("ref") === 1 && this.route.snapshot.paramMap.get("id"))
    {
      this.ideaID = this.route.snapshot.paramMap.get("id");
      this.isRef = true;
      this.ideaService.getIdea(this.ideaID).subscribe((ideaReferenced) => this.ideaReferenced = ideaReferenced);
    }
    else if(+this.route.snapshot.paramMap.get("edit") === 1 && this.route.snapshot.paramMap.get("id"))
    {
      this.ideaID = this.route.snapshot.paramMap.get("id");
      this.editing = true;
      this.ideaService.getIdea(this.ideaID).subscribe((idea) => {
        this.idea = idea;
        this.fileList = this.idea.attachments;
      });
    }
  }

  autocompleteItems = (text: string): Observable<Tag[]> => {
    return this.tagService.getAllTags();
  }

  onSubmit(formData: NgForm) {
    if( formData.valid )
    {
      let v = formData.value;
      if(this.editing){
        this.ideaService.updateIdea(this.idea, this.fileList).then(() => {
          this.router.navigate([`/details/${this.idea.id}`]);
        });
      } else if(this.isRef){
        //save new idea
        this.ideaService.createIdea(v.title, v.description, v.short_desc, this.user.id, this.user.Name, v.tags, this.fileList, v.published).then((newIdeaRef) => {

          //save references of child
          this.ideaService.createReferenceIdea(newIdeaRef.key,this.ideaReferenced.id,this.ideaReferenced.title);
          this.router.navigate(['/']);
        });
      } else{
        this.ideaService.createIdea(v.title, v.description, v.short_desc, this.user.id, this.user.Name, v.tags, this.fileList, v.published).then(() => {
          this.router.navigate(['/']);
        });
      }
    }
  }

  detectFiles(event) {
    this.selectedFiles = event.target.files;
    for(var i=0; i<this.selectedFiles.length; i++)
    {
      let file = new Upload(this.selectedFiles[i]);
      file.originalName = file.file.name;
      file.type = file.file.type;
      this.fileList.push(file);
    }
    this.upload();
  }

  upload() {
    let files = this.fileList;
    for(var i=0; i<files.length; i++) {
      if(files[i].progress != 100)
        this.uploadService.doUpload(files[i]);
    }
  }

  removeFile(file: Upload) {
    this.uploadService.deleteFile(file);
    this.fileList.splice(this.fileList.indexOf(file),1);
  }

  cancel() {
    this.location.back();
  }
}
