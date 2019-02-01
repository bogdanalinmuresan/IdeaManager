import { Injectable } from '@angular/core';
import * as firebase from 'firebase';
import { Upload } from '../upload';

@Injectable()
export class UploadService {

  constructor() { }

  doUpload(upload: Upload) {
    let storageRef = firebase.storage().ref();
    let generatedFilename = this.generateName() + "." + upload.file.name.substring(upload.file.name.lastIndexOf('.')+1, upload.file.name.length) || upload.file.name;
    let uploadTask = storageRef.child(`/Attachments/${generatedFilename}`).put(upload.file);
    
    uploadTask.on(firebase.storage.TaskEvent.STATE_CHANGED, (snapshot) => {
      // Current progress
      upload.progress = (uploadTask.snapshot.bytesTransferred / uploadTask.snapshot.totalBytes) * 100;
    },
    (error) => {
      // Error
      console.log(error);
    },
    () => {
      // Upload success
      upload.url = uploadTask.snapshot.downloadURL;
      upload.name = generatedFilename;
      upload.originalName = upload.file.name;
    });
  }

  generateName() : string{
    var text = "";
    var possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
  
    for (var i = 0; i < 5; i++)
      text += possible.charAt(Math.floor(Math.random() * possible.length));
  
    return (+new Date()) + "_" + text;
  }

  deleteFile(file: Upload) {
    let storageRef = firebase.storage().ref();
    storageRef.child(`/Attachments/${file.name}`).delete();
  }

}
