import { Component, OnInit } from '@angular/core';
import { HttpAssetService } from '../../services-assetmap/http.assetservice';
import 'leaflet';
import 'leaflet-kml';
import { MatDialog } from '@angular/material/dialog';
import { SummaryAnalyticsComponent } from '../summary-analytics/summary-analytics.component';
import { InverterAnalyticsComponent } from '../inverter-analytics/inverter-analytics.component';
import { InverterwiseAnalyticsComponent } from '../inverterwise-analytics/inverterwise-analytics.component';
declare const L: any;
import * as leafletSideBySide from 'leaflet-side-by-side2';

declare var require: any
//var sideBySide = require('leaflet-side-by-side');
var selected_point = new L.LayerGroup();

@Component({
  selector: 'comparision-asset',
  templateUrl: './comparision-asset.component.html',
  styleUrls: ['./comparision-asset.component.css']
})
export class ComparisionAssetComponent implements OnInit {
  main_data: any;
  Asset_Datelist: any;
  Date: any;
  public map;
  center: string;
  lat: string;
  long: any;
  tilelayer: any;
  LeftLayer1: any;
  rightLayer2: any;
  base_ortho_layer: any;
  dateleft: any;
  dateright: any;
  ortho_onleft: any;
  ortho_onright: any;

  constructor(private _http: HttpAssetService, public dialog: MatDialog) { }

  ngOnInit(): void {
    this._http.Asset_project().subscribe(data => {
      this.main_data = data['data']
      this.onload()

    })
  }

  onload() {
    console.log(this.main_data['projectdata']);
    this.Date = localStorage.getItem('date')
    this.dateleft = localStorage.getItem('date')
    this.dateright = localStorage.getItem('date')
    sessionStorage.setItem("dateleft",this.dateleft)
    sessionStorage.setItem("dateright",this.dateright)

    this.Asset_Datelist = Object.keys(this.main_data['projectdata'])
    console.log(this.Asset_Datelist)
    this.ortho_onleft = this.main_data['projectdata'][this.Date]['SCPM']['project_properties']['ortho']['RGB']
    this.ortho_onright = this.main_data['projectdata'][this.Date]['SCPM']['project_properties']['ortho']['RGB']

    var new_center = localStorage.getItem('center')
    if (new_center != '') {
      this.center = new_center
    } else {
      this.center = this.center
    }
    // alert("--afet center----"+this.dateonload)
    var str_center = this.center.split(",");
    this.lat = str_center[0];
    this.long = str_center[1];

    // Initialize the map
    this.map = L.map('compare_map', {
      attributionControl: false,
      zoomControl: false
    }).setView([this.lat, this.long], 17);

    // default MAP layer

    this.tilelayer = L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
    }).addTo(this.map);
    this.Load_comparemaps(this.ortho_onleft, this.ortho_onright)
  }

  RemoveKml(value: any) {
    if (this.base_ortho_layer) {
      this.map.removeLayer(this.base_ortho_layer);
    }
  }

  Load_comparemaps(left_ortho, right_ortho) {

    this.LeftLayer1 = L.tileLayer(left_ortho + '{z}/{x}/{y}.png', {
      attribution: '© <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
      center: [this.center],
      maxZoom: 22,
      // maxNativeZoom: 20
    }).addTo(this.map); //left side map

    this.rightLayer2 = L.tileLayer(right_ortho + '{z}/{x}/{y}.png', {
      attribution: '© <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
      center: [this.center],
      maxZoom: 22,
      // maxNativeZoom: 20
    }).addTo(this.map) //right side map

    this.base_ortho_layer = L.control.sideBySide(this.LeftLayer1, this.rightLayer2).addTo(this.map);


  }

  selectChangeleft(dateleft) {
    // alert(dateleft + "-----------")
    sessionStorage.setItem("dateleft",dateleft)

    this.RemoveKml(this.LeftLayer1)
    this.ortho_onleft = this.main_data['projectdata'][dateleft]['SCPM']['project_properties']['ortho']['RGB']

    this.Load_comparemaps(this.ortho_onleft, this.ortho_onright)

  }

  selectChangeright(dateright) {
    // alert(dateright + "-----------")
    sessionStorage.setItem("dateright",dateright)

    this.RemoveKml(this.LeftLayer1)
    this.ortho_onright = this.main_data['projectdata'][dateright]['SCPM']['project_properties']['ortho']['RGB']

    this.Load_comparemaps(this.ortho_onleft, this.ortho_onright)

  }

  Summary_analytics(){

    sessionStorage.setItem("dateleft",this.dateleft)
    sessionStorage.setItem("dateright",this.dateright)
    let dialogRef = this.dialog.open(SummaryAnalyticsComponent);
    dialogRef.afterClosed().subscribe(result => {
      sessionStorage.removeItem("dateright")
      sessionStorage.removeItem("dateleft")
    });
  }

  Inverter_analytics(){
    sessionStorage.setItem("dateleft",this.dateleft)
    sessionStorage.setItem("dateright",this.dateright)
    let dialogRef = this.dialog.open(InverterAnalyticsComponent);
    dialogRef.afterClosed().subscribe(result => {
      sessionStorage.removeItem("dateright")
      sessionStorage.removeItem("dateleft")
    });
  }

  Inverter_analytics_featurewise(){
    sessionStorage.setItem("dateleft",this.dateleft)
    sessionStorage.setItem("dateright",this.dateright)
    let dialogRef = this.dialog.open(InverterwiseAnalyticsComponent);
    dialogRef.afterClosed().subscribe(result => {
      sessionStorage.removeItem("dateright")
      sessionStorage.removeItem("dateleft")
    });
  }



}
