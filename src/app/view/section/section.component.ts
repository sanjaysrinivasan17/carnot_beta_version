import { Component, HostListener, OnInit } from '@angular/core';
import { HttpService } from "../map-section/services-map/http.service";

@Component({
  selector: 'app-section',
  templateUrl: './section.component.html',
  styleUrls: ['./section.component.css']
})
export class SectionComponent implements OnInit {
  
  public isWindowOpen: boolean;
  
  constructor(private _http: HttpService) { 
    if (window.innerWidth >= 960) { 
      this.isWindowOpen = true;
    } else {
      this.isWindowOpen = false;
    }
  }
  
  @HostListener('window:resize', ['$event'])
  onResize(event: any) {
    if (event.target.innerWidth >= 960) {
      this.isWindowOpen = true;
    } else {
      this.isWindowOpen = false;
    }
  }
  
  ngOnInit(): void {
    this._http.setNewMapIcon({
      dateval: "project"
    });
  }

}
