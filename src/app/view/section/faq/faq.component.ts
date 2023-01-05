import { Component, OnInit } from '@angular/core';
import { HttpService } from "../../map-section/services-map/http.service";

@Component({
  selector: 'app-faq',
  templateUrl: './faq.component.html',
  styleUrls: ['./faq.component.css']
})
export class FaqComponent implements OnInit {

  constructor(private _http: HttpService) { }

  ngOnInit(): void {
    this._http.setNewMapIcon({
      dateval: "faq"
    });
  }

}
