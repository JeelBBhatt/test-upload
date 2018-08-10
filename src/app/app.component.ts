import { Component } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import 'rxjs/Rx';
import 'rxjs/add/operator/map';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {

  filesToUpload: Array<File> = [];
  constructor(private http: HttpClient) {}
  upload() {
    const formData: any = new FormData();
    const files: Array<File> = this.filesToUpload;
    console.log('list>>', files);

    for ( let i = 0; i < files.length; i++){
      formData.append('uploads[]', files[i], files[i]['name']);
    }
    console.log('form data variable : '+ formData.toString());
    this.http.post('http://localhost:3010/upload', formData)
      .map( files => files.json())
      .subscribe(files => console.log('files', files));
  }

  fileChangeEvent(fileInput: any) {
    this.filesToUpload = <Array<File>>fileInput.target.files;
    // this.product.photo = fileInput.target.files[0]['name'];
  }
}
