import { Component, OnInit } from '@angular/core';
import { HttpService } from '../services-map/http.service'

@Component({
  selector: 'app-imageviewer',
  templateUrl: './imageviewer.component.html',
  styleUrls: ['./imageviewer.component.css']
})
export class ImageviewerComponent implements OnInit {
  files: any;
  url: any;

  constructor(private _http: HttpService) { }

  ngOnInit(): void {
    this.files = this._http.getfiles();
    this.url = this.files[0]['url']
    // alert(this.files[0]['url'])
    // this.files = selectedProducts
  }
  show_big_image(url){
    // alert(url)
    this.url = url
  }


}
