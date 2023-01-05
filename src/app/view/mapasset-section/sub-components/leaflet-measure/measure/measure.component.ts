import { HttpClient } from '@angular/common/http';
import { Component, Input, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import 'leaflet';
import 'leaflet-measure';
import { HttpAssetService } from '../../../services-assetmap/http.assetservice';


declare const L: any;


@Component({
  selector: 'app-measure',
  templateUrl: './measure.component.html',
  styleUrls: ['./measure.component.css']
})
export class MeasureComponent {

  @Input() public map;
  no_data: boolean;

  constructor(private _http: HttpAssetService, public dialog: MatDialog, private http: HttpClient) { }



  ngOnInit(): void {
    this.drawPlugin(this.map);
    // this.get_aoi_data();
    this.no_data = true;
  }

  private drawPlugin(map: any) {

    var options = {
      position: 'topright',
      primaryLengthUnit: 'meters', 
      // secondaryLengthUnit: 'miles',
      popupOptions: { className: 'leaflet-measure-resultpopup', autoPanPadding: [10, 10] },
      someNewUnit: {
        factor: 0.001, // Required. Factor to apply when converting to this unit. Length in meters or area in sq meters will be multiplied by this factor.
        display: 'meters', // Required. How to display in results, like.. "300 Meters (0.3 My New Unit)".
        decimals: 2 // Number of decimals to round results when using this unit. `0` is the default value if not specified.
      }
    }
    var measureControl = new L.Control.Measure(options);
    measureControl.addTo(map);
  }

}
