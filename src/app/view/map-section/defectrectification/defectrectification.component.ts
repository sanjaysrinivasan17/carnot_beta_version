import { Component, OnInit, ViewChild, Output, EventEmitter, Input } from '@angular/core';
import { HttpService } from '../services-map/http.service'


@Component({
  selector: 'defectrectification',
  templateUrl: './defectrectification.component.html',
  styleUrls: ['./defectrectification.component.css']
})
export class DefectrectificationComponent implements OnInit {
  defect_rectify_visibility: any;
  defect_data: any;
  @Input() defect_event: EventEmitter<any> = new EventEmitter<any>();
  constructor(private _http: HttpService) { }

  ngOnInit(): void {

    let selectedProducts = this._http.getrectify_data();
    console.log(selectedProducts)
  }
  rectification_defect(defect) {
    this.defect_rectify_visibility = "visible"
    // console.log(this.item);
    
    // alert("inside"+this.defect_data)
    // console.log(defect)

  }
}
