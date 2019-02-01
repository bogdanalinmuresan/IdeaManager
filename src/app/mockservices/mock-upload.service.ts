import { Injectable } from '@angular/core';
import { Upload } from '../upload';

@Injectable()
export class MockUploadService {

  constructor() { }

  doUpload(upload: Upload) {
    // Act like uploading
    upload.progress = 100;
    upload.url = "MockURL";
    upload.name = "MockFilename";
    this.saveFileData(upload);
  }

  saveFileData(upload: Upload) {
    // Do nothing, act like saving
  }

}
