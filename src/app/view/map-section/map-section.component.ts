import { Component, OnInit, ViewChild, Output, EventEmitter, Input } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../environments/environment';
import { MatDialog } from '@angular/material/dialog';
import { DefectrectificationComponent } from '../map-section/defectrectification/defectrectification.component'

// TODO
// Handle zoom and pan ortho errors
// Ichawar lat long have to make it dynamic
// optimise multiple polygon loading
// Delete polygon
// Remove leaflet citation
// Color option for AOI dialog
// ToolTip for AOI
// Draw tool layer management try catch
// Delete / Hide issue (redrawing ploygons)
// aoi color based sorting/ date based sorting
// add tooltip in sidebar
// Change view menu name
// Measure
import {
  ChartComponent,
  ApexNonAxisChartSeries,
  ApexPlotOptions,
  ApexChart,
  ApexLegend,
  ApexResponsive,
  ApexTheme,
  ApexTitleSubtitle,
  ApexAxisChartSeries,
  ApexDataLabels,
  ApexXAxis,
  ApexYAxis,
  ApexFill,
  ApexStroke,
  ApexTooltip,
  ApexGrid,
} from "ng-apexcharts";

import html2canvas from 'html2canvas';
// Leaflet declarations and imports
import 'leaflet';
import 'leaflet-kml';
import { Observable } from 'rxjs';
import { HttpService } from './services-map/http.service';
import * as $ from 'jquery';
import { FormControl } from '@angular/forms';
import { type } from 'os';
import { visibility } from 'html2canvas/dist/types/css/property-descriptors/visibility';
import { ToastrService } from 'ngx-toastr';
import { RawImageComponent } from './raw-image/raw-image.component';
// import 'leaflet-draw/dist/leaflet.draw-src.js';

export type ChartOptions = {
  series: ApexAxisChartSeries;
  chart: ApexChart;
  xaxis: ApexXAxis;
  yaxis: ApexYAxis;
  title: ApexTitleSubtitle;
  legend: ApexLegend;
  labels: string[];
  stroke: any; // ApexStroke;
  dataLabels: ApexDataLabels;
  // ApexDataLabels;
  grid: ApexGrid;

  fill: ApexFill;
  colors: string[];
  tooltip: ApexTooltip;
};


declare var require: any
// require('leaflet-side-by-side');

declare const L: any;

var selected_point = new L.LayerGroup();

@Component({
  selector: 'app-map-section',
  templateUrl: './map-section.component.html',
  styleUrls: ['./map-section.component.css'],
})
export class MapSectionComponent implements OnInit {
  @Input() item: any;
  @ViewChild("chart") chart: ChartComponent;
  public chartOptions: Partial<ChartOptions>;
  // If passing this variable to child components as @Input causes problems use a dedicated service for passing this map object
  public map;
  public thermal_layer;
  public cad_layer;
  public satellite_layer;
  public rgb_layer;
  public base_ortho_layer;
  public ortho_file_location;
  previousID: string;
  public sliderControl;
  track: any = null;

  gb_layer: any = null;

  public popupDesc = null;
  public popupKml: any;

  public ITC_No: any;
  public Table_No: any;
  public Defect: any;
  public Description: any;
  public popup_lat: any;
  public popup_lng: any;
  public Thermal_Image_src: any;
  public popup_card_visibility: boolean;
  public popup_card_visibility_cadestral: boolean;
  public popup_card_visibility_grading: boolean;


  public summaryState: string;
  public summaryLayerGroup: any = null;

  public inv_main_data: any;
  public project_id_inv: any;
  public date_inv: any;
  public projectProject_layer_inv_id_inv: any;
  project_layer_inv_data = [];
  project_layer_inv_lable = [];
  public Project_layer_inv: any;
  Hotspot_inv = [];
  ShortCircit_inv = [];
  Open_Circuit_inv = [];
  pannel_inv = [];
  Pid = [];
  inver_wise_data = [];
  inver_wise_lable = [];
  removekml_list = [];
  removekml_list_inv = [];
  removekml_list_sub = [];

  private activeViewMenu: string;
  toppings = new FormControl();




  public main_data: any;
  public project_id_summary: any;
  Project_data: any;
  Project_data_layouts: any;
  Project_data_values: any;
  Project_data_inverter_values: any;
  public project_name: any;

  Project_data_inverter: any;


  inver_wise_def_lable: any;
  inver_wise_def_hot: any;
  inver_wise_def_sc: any;
  inver_wise_def_os: any;
  inver_wise_def_pf: any;
  inver_wise_def_pid: any;
  public ortho_file_location_onLoad
  date: any;
  dateonload: any;
  date_new_length: any;
  summ: any;

  total_Count = [];

  data = [];
  // constructor(private http: HttpClient) { }
  current_date: any;
  @Output() current_date_event: EventEmitter<any> = new EventEmitter<any>();

  grading_defect: any;
  @Output() grading_defect_event: EventEmitter<any> = new EventEmitter<any>();

  ChangedDate: any;
  SelectedDate: any;
  SelectedDatefromanalytics: any;
  datevalue: any;
  center: any;
  ChangedDateAllProjects: any;
  newDatefromAllProjects: any;
  screenshot: any;
  getscreenshotfromsidebar: any;
  public date_inv_status_key: any;
  public date_inv_status_value: any;
  public Completed_date_array: any;
  str_center: any;
  lat: any;
  long: any;
  public kml_file_location: any;
  public marker: any;
  poly: any;
  polies = [];
  descObj: any;
  descObj_cadestral: any;
  table_no: any;
  public thermal_location: any;
  Max_temp: any;
  Min_temp: any;
  Module_no: any;
  thermal_img: any;
  img_tag: ChildNode;
  cad_file_location: any;
  public current_kml_data: any;
  Document: any;
  Description_cadestral: any;
  Survey_No: any;
  Document_link: any;
  popup_opened: boolean;
  public satelliteview: any;
  satellite = '../../../assets/images/satellite.jpg'
  default = '../../../assets/images/default.jpg'
  public isShown1 = "visibility_off"
  public isShown2 = "visibility_off"
  public default_dtm = "";
  public default_slope = "";
  public project_feature: any;
  public project_feature1: any;
  public slope_layer: any;
  public dtm_layer: any;
  proj_name_contains: any;
  public location_data: any;
  public location_value: any;
  public splitted_project_name: any;
  public selected: any;
  public Adani_locations: any;
  public zoom_level: number;
  public subdefects_visibility: any;
  public grading_visibility: any;
  public defect_rectify_visibility: any;
  public accepted: any;
  public accepted1: any;
  public accepted2: any;
  public adani_proj_name: any;
  public csv_path: any;
  public userArray_value: any;
  public userArray_Distance: any;
  table_number: any;
  get_missions_flights_data: any;
  mission_data: any[] = [];
  markers: any;
  marker_data: any[] = [];
  uploaded_raw_image: any;
  get_missions_flights_status: string;
  accepted3: boolean
  accepted4: boolean


  constructor(private _http: HttpService, private http: HttpClient, private router: Router, private toastr: ToastrService, public dialog: MatDialog) { }

  public ngOnInit(): void {
    localStorage.setItem('thermal', 'thermal');
    localStorage.setItem('cad', 'cad');
    localStorage.setItem('DTM', 'DTM');
    localStorage.setItem('slope', 'slope');
    localStorage.setItem('satellite', 'satellite');
    localStorage.getItem('product');
    sessionStorage.setItem('rawImage', 'rawImage');
    this.adani_proj_name = localStorage.getItem('name')
    // this.zoom_level = Number(sessionStorage.getItem("zoom_level"))
    // alert(this.adani_proj_name+"=")
    this.subdefects_visibility = "visibility_off"
    this.grading_visibility = "visibility_off"
    this.defect_rectify_visibility = "visibility_off"
    this._http.getdefect_table_no().subscribe(info => {
      var tableno = info;
      var Table_No_val = tableno.Table_No_val
      // alert(Table_No_val)
    })

    this._http.getNewdateanalyticsInfo().subscribe(info => {
      this.ChangedDate = info;
      this.SelectedDatefromanalytics = this.ChangedDate.dateval

      this._http.getChangedCompletedDate().subscribe(info => {
        this.ChangedDateAllProjects = info;
        this.newDatefromAllProjects = this.ChangedDateAllProjects.dateval
        // // alert(this.newDatefromAllProjects)

        this._http.getscreenshotmap().subscribe(info => {
          this.screenshot = info;
          this.getscreenshotfromsidebar = this.screenshot.screenshotdata
          var capture_val = localStorage.getItem("capture")

          if (capture_val === "capture") {
            this.screenshotcapture(this.getscreenshotfromsidebar)

          }

        })

        this._http.summary_data().subscribe(data => {

          this.summ = data['data']
          this.Completed_date_array = [];
          data['data']['dates'] = Object.keys(data['data']['date_status'])
          // console.log(data['data'])
          this.project_id_summary = Object.keys(data['data']['date_status'])
          // this.date_inv = Object.values(data[this.project_id_summary])[2]
          // console.log(data[this.project_id_summary]['zoom_level'])
          // this.zoom_level = Number((data[this.project_id_summary])[7])
          // alert(Number((data[this.project_id_summary])[7]))
          this.date_inv_status_key = Object.keys(data['data']["date_status"])
          this.date_inv_status_value = Object.values(data['data']["date_status"])
          for (var k = 0; k < this.date_inv_status_key.length; k++) {
            if (this.date_inv_status_value[k] == "completed") {
              this.Completed_date_array.push(this.date_inv_status_key[k])
              // // alert(this.Completed_date_array)
            }
          }
          // console.log(this.Completed_date_array)
          // this.project_name = Object.values(data[this.project_id_summary])[1]
          // alert(this.project_name)
          // this.center = Object.values(data[this.project_id_summary])[5]
          // // alert(this.center+"---length")
          this.date_new_length = this.Completed_date_array.length - 1;
          this.datevalue = this.Completed_date_array[this.date_new_length]
          this.date = this.Completed_date_array[this.date_new_length]
          // alert(this.date)
          var project_name = localStorage.getItem('name')

          var project_feature_show = project_name.includes("Sudair")
          var project_feature_show1 = project_name.includes("Adani")
          // // alert(project_feature_show)
          if (project_feature_show1) {
            this.project_feature1 = "visible"
            this.splitted_project_name = this.project_name.split('-', 2)
            this.zoom_level = 18

            // // alert(localStorage.getItem('thermal'))

            // console.log(this.splitted_project_name)
            this.project_name = this.splitted_project_name[1];
          } else {
            this.project_feature1 = "visible_off"
            this.project_name = project_name
            this.zoom_level = 15
            // // alert(this.zoom_level)

          }
          if (project_feature_show) {
            this.project_feature = "visible"
          } else {
            this.project_feature = "visible_off"
          }
          var date_local = localStorage.getItem('date')
          // console.log('date')
          // if (date_local == "undefined" || date_local == "" || date_local == null) {
          //   if (this.newDatefromAllProjects == "undefined" || this.newDatefromAllProjects == "" || this.newDatefromAllProjects == null) {
          //     if (this.SelectedDatefromanalytics == "undefined" || this.SelectedDatefromanalytics == "" || this.SelectedDatefromanalytics == null) {
          //       this.dateonload = this.datevalue
          //       // // alert("---map section date ===="+this.datevalue)

          //     } else if (this.SelectedDatefromanalytics != "undefined" && this.SelectedDatefromanalytics != "" && this.SelectedDatefromanalytics != null) {
          //       this.dateonload = this.SelectedDatefromanalytics
          //       this.date = this.ChangedDate.dateval

          //       // // alert("---defaukt date ===="+this.datevalue)
          //     }
          //   } else if (this.newDatefromAllProjects != "undefined" || this.newDatefromAllProjects != "" || this.newDatefromAllProjects != null) {
          //     this.dateonload = this.newDatefromAllProjects
          //     this.date = this.newDatefromAllProjects

          //   }
          // }
          // else {
          this.dateonload = date_local
          this.date = date_local
          // }
          // // alert("------this.dateonload -----"+this.dateonload )
          // // alert("center----"+localStorage.getItem('center'))
          var new_center = localStorage.getItem('center')
          if (new_center != '') {
            this.center = new_center
          } else {
            this.center = this.center
          }
          // // alert("--afet center----"+this.dateonload)
          // localStorage.setItem("date", this.dateonload);
          this.str_center = this.center.split(",");
          this.lat = this.str_center[0];
          this.long = this.str_center[1];
          // console.log((data['data']));
          // console.log(Object.keys(data['data']['processed_data']));
          // console.log(Object.keys(data['data']['processed_data'][this.dateonload]));
          // console.log(Object.keys(data['data']['processed_data'][this.dateonload]['summary_layers']));
          // console.log(Object.keys(data['data']['processed_data'][this.dateonload]['summary_layers']));

          this.Project_data = Object.keys(data['data']['processed_data'][this.dateonload]['summary_layers'])
          console.log(this.Project_data);

          this.ortho_file_location_onLoad = data['data']['processed_data'][this.dateonload]['ortho_file_location']
          this.ortho_file_location = data['data']['processed_data'][this.dateonload]['ortho_file_location']
          this.kml_file_location = data['data']['processed_data'][this.dateonload]['kml_file_location']
          this.thermal_location = data['data']['processed_data'][this.dateonload]['thermal_location']
          this.cad_file_location = data['data']['processed_data'][this.dateonload]['cad_file_location']
          this.csv_path = data['data']['processed_data'][this.dateonload]['csv_path']
          // this.zoom_level = Number(Object.values(data['data']['processed_data'])[7])
          // alert(Object.values(data['data']['processed_data'])[7])
          // // alert("----project_id_summary---"+this.ortho_ file_location_onLoad)
          // this.map.removeLayer(this.base_ortho_layer);
          this.rgb_layer = L.tileLayer(this.ortho_file_location_onLoad + '{z}/{x}/{y}.png', {
            attribution: '© <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
            center: [this.lat, this.long],
            minZoom: 1,
            maxZoom: 22,
            // maxNativeZoom: 18
          }).addTo(this.map);

          // this.map.maxZoom(22);
          this.base_ortho_layer = this.rgb_layer;

        })
      })
    })
    this.onload_get_mission_flights()

    this.Adani_locations = {
      "Adas": {
        "name": "Adas",
        "center": "18.78292,76.224969",
        "domain": "https://datasee-ai-public-assets.s3.ap-south-1.amazonaws.com/2k22/AT/Adani/Adas/"
      },
      "Arjapur": {
        "name": "Arjapur",
        "center": "18.784681, 77.746012",
        "domain": "https://datasee-ai-public-assets.s3.ap-south-1.amazonaws.com/2k22/AT/Adani/Arjapur/"
      },
      "Bardapur": {
        "name": "Bardapur",
        "center": "18.638965, 76.488198",
        "domain": "https://datasee-ai-public-assets.s3.ap-south-1.amazonaws.com/2k22/AT/Adani/Bardapur/"
      },
      "Bedkevasti": {
        "name": "Bedkevasti",
        "center": "18.016272, 74.637315",
        "domain": "https://datasee-ai-public-assets.s3.ap-south-1.amazonaws.com/2k22/AT/Adani/Bedkevasti/"
      },
      "Bilur": {
        "name": "Bilur",
        "center": "16.954485, 75.181413",
        "domain": "https://datasee-ai-public-assets.s3.ap-south-1.amazonaws.com/2k22/AT/Adani/Bilur/"
      },
      "Boradi": {
        "name": "Boradi",
        "center": "21.513632, 74.893418",
        "domain": "https://datasee-ai-public-assets.s3.ap-south-1.amazonaws.com/2k22/AT/Adani/Boradi/"
      },
      "Butibori": {
        "name": "Butibori",
        "center": "20.920029,78.963844",
        "domain": "https://datasee-ai-public-assets.s3.ap-south-1.amazonaws.com/2k22/AT/Adani/Butibori/"
      },
      "Chikalthna": {
        "name": "Chikalthna",
        "center": "20.192348, 75.203303",
        "domain": "https://datasee-ai-public-assets.s3.ap-south-1.amazonaws.com/2k22/AT/Adani/Chikalthna/"
      },
      "Chousala": {
        "name": "Chousala",
        "center": "18.716802, 75.695154",
        "domain": "https://datasee-ai-public-assets.s3.ap-south-1.amazonaws.com/2k22/AT/Adani/Chousala/"
      },
      "Chowka": {
        "name": "Chowka",
        "center": "20.001990, 75.389868",
        "domain": "https://datasee-ai-public-assets.s3.ap-south-1.amazonaws.com/2k22/AT/Adani/Chowka/"
      },

      "Dapchery": {
        "name": "Dapchery",
        "center": "20.069421, 72.911139",
        "domain": "https://datasee-ai-public-assets.s3.ap-south-1.amazonaws.com/2k22/AT/Adani/Dapchery/"
      },
      "Dhanora": {
        "name": "Dhanora",
        "center": "20.267832, 80.303065",
        "domain": "https://datasee-ai-public-assets.s3.ap-south-1.amazonaws.com/2k22/AT/Adani/Dhanora/"
      },
      "Devgoan_Rangari": {
        "name": "Devgoan_Rangari",
        "center": "20.031200, 75.030757",
        "domain": "https://datasee-ai-public-assets.s3.ap-south-1.amazonaws.com/2k22/AT/Adani/Devgoan_Rangari/"
      },
      "Ghadhinglaj": {
        "name": "Ghadhinglaj",
        "center": "16.226703, 74.338929",
        "domain": "https://datasee-ai-public-assets.s3.ap-south-1.amazonaws.com/2k22/AT/Adani/Ghadhinglaj/"
      },
      "Ganekhadpoli": {
        "name": "Ganekhadpoli",
        "center": "17.519838, 73.601643",
        "domain": "https://datasee-ai-public-assets.s3.ap-south-1.amazonaws.com/2k22/AT/Adani/Ganekhadpoli/"
      },
      "Ghatnandur": {
        "name": "Ghatnandur",
        "center": "18.731351, 76.546789",
        "domain": "https://datasee-ai-public-assets.s3.ap-south-1.amazonaws.com/2k22/AT/Adani/Ghatnandur/"
      },
      "Girnare": {
        "name": "Girnare",
        "center": "20.069622, 73.663833",
        "domain": "https://datasee-ai-public-assets.s3.ap-south-1.amazonaws.com/2k22/AT/Adani/Girnare/"
      },
      "Hadgaon": {
        "name": "Hadgaon",
        "center": "19.489868, 77.663272",
        "domain": "https://datasee-ai-public-assets.s3.ap-south-1.amazonaws.com/2k22/AT/Adani/Hadgaon/"
      },
      "Halkarni": {
        "name": "Halkarni",
        "center": "16.168017, 74.476735",
        "domain": "https://datasee-ai-public-assets.s3.ap-south-1.amazonaws.com/2k22/AT/Adani/Halkarni/"
      },
      "Himayat_Nagar": {
        "name": "Himayat_Nagar",
        "center": "19.422712, 77.879124",
        "domain": "https://datasee-ai-public-assets.s3.ap-south-1.amazonaws.com/2k22/AT/Adani/Himayatnagar/"
      },
      "Islapur": {
        "name": "Islapur",
        "center": "19.405438, 78.011682",
        "domain": "https://datasee-ai-public-assets.s3.ap-south-1.amazonaws.com/2k22/AT/Adani/Islapur/"
      },
      "Jalgoan": {
        "name": "Jalgoan",
        "center": "18.230282, 74.454206",
        "domain": "https://datasee-ai-public-assets.s3.ap-south-1.amazonaws.com/2k22/AT/Adani/Jalgoan/"
      },
      "Jambazzar": {
        "name": "Jambazzar",
        "center": "19.955344, 77.499267",
        "domain": "https://datasee-ai-public-assets.s3.ap-south-1.amazonaws.com/2k22/AT/Adani/Jambazzar/"
      },
      "Junvane": {
        "name": "Junvane",
        "center": "20.754037, 74.841969",
        "domain": "https://datasee-ai-public-assets.s3.ap-south-1.amazonaws.com/2k22/AT/Adani/Junvane/"
      },
      "Kada": {
        "name": "Kada",
        "center": "18.890290, 75.083517",
        "domain": "https://datasee-ai-public-assets.s3.ap-south-1.amazonaws.com/2k22/AT/Adani/Kada/"
      },
      "Katigoan": {
        "name": "Katigoan",
        "center": "18.035293, 74.945868",
        "domain": "https://datasee-ai-public-assets.s3.ap-south-1.amazonaws.com/2k22/AT/Adani/Katigoan/"
      },
      "Khapa": {
        "name": "Khapa",
        "center": "21.409048, 78.985100",
        "domain": "https://datasee-ai-public-assets.s3.ap-south-1.amazonaws.com/2k22/AT/Adani/Khapa/"
      },
      "Khaparkheda": {
        "name": "Khaparkheda",
        "center": "21.262181, 79.096371",
        "domain": "https://datasee-ai-public-assets.s3.ap-south-1.amazonaws.com/2k22/AT/Adani/Khaparkheda/"
      },
      "Khondamalli": {
        "name": "Khondamalli",
        "center": "21.442927, 74.337851",
        "domain": "https://datasee-ai-public-assets.s3.ap-south-1.amazonaws.com/2k22/AT/Adani/Khondamalli/"
      },
      "Kudavale": {
        "name": "Kudavale",
        "center": "17.876170, 73.240305",
        "domain": "https://datasee-ai-public-assets.s3.ap-south-1.amazonaws.com/2k22/AT/Adani/Kudavale/"
      },
      "Kuhi": {
        "name": "Kuhi",
        "center": "21.010657, 79.353864",
        "domain": "https://datasee-ai-public-assets.s3.ap-south-1.amazonaws.com/2k22/AT/Adani/Kuhi/"
      },
      "Lamjana": {
        "name": "Lamjana",
        "center": "18.155353, 76.599641",
        "domain": "https://datasee-ai-public-assets.s3.ap-south-1.amazonaws.com/2k22/AT/Adani/Lamjana/"
      },

      "Leet": {
        "name": "Leet",
        "center": "18.624790, 75.599065",
        "domain": "https://datasee-ai-public-assets.s3.ap-south-1.amazonaws.com/2k22/AT/Adani/Leet/"
      },
      "Limbaganesh": {
        "name": "Limbaganesh",
        "center": "18.799008, 75.642208",
        "domain": "https://datasee-ai-public-assets.s3.ap-south-1.amazonaws.com/2k22/AT/Adani/Limbaganesh/"
      },
      "Mana": {
        "name": "Mana",
        "center": "20.754492, 77.472836",
        "domain": "https://datasee-ai-public-assets.s3.ap-south-1.amazonaws.com/2k22/AT/Adani/Mana/"
      },
      "Margtamhane": {
        "name": "Margtamhane",
        "center": "17.480665, 73.360856",
        "domain": "https://datasee-ai-public-assets.s3.ap-south-1.amazonaws.com/2k22/AT/Adani/Margtamhane/"
      },
      "Mhsward": {
        "name": "Mhsward",
        "center": "17.633368, 74.835809",
        "domain": "https://datasee-ai-public-assets.s3.ap-south-1.amazonaws.com/2k22/AT/Adani/Mhsward/"
      },
      "MIDC": {
        "name": "MIDC",
        "center": "20.843416, 74.753973",
        "domain": "https://datasee-ai-public-assets.s3.ap-south-1.amazonaws.com/2k22/AT/Adani/MIDC/"
      },
      "Muluj": {
        "name": "Muluj",
        "center": "17.849419, 76.708841",
        "domain": "https://datasee-ai-public-assets.s3.ap-south-1.amazonaws.com/2k22/AT/Adani/Muluj/"
      },
      "Nathra": {
        "name": "Nathra",
        "center": "18.954732, 76.467007",
        "domain": "https://datasee-ai-public-assets.s3.ap-south-1.amazonaws.com/2k22/AT/Adani/Nathra/"
      },
      "Nigdol": {
        "name": "Nigdol",
        "center": "20.250631, 73.755500",
        "domain": "https://datasee-ai-public-assets.s3.ap-south-1.amazonaws.com/2k22/AT/Adani/Nigdol/"
      },
      "Niwgha": {
        "name": "Niwgha",
        "center": "19.589512, 77.564793",
        "domain": "https://datasee-ai-public-assets.s3.ap-south-1.amazonaws.com/2k22/AT/Adani/Niwgha/"
      },
      "Pachod": {
        "name": "Pachod",
        "center": "19.569949,75.62233",
        "domain": "https://datasee-ai-public-assets.s3.ap-south-1.amazonaws.com/2k22/AT/Adani/Pachod/"
      },
      "Pathra": {
        "name": "Pathra",
        "center": "18.628470, 76.142038",
        "domain": "https://datasee-ai-public-assets.s3.ap-south-1.amazonaws.com/2k22/AT/Adani/Pathra/"
      },
      "Pimpari_Achal": {
        "name": "Pimpari_Achal",
        "center": "20.406118, 73.827538",
        "domain": "https://datasee-ai-public-assets.s3.ap-south-1.amazonaws.com/2k22/AT/Adani/Pimpari_Achal/"
      },
      "Pinjar": {
        "name": "Pinjar",
        "center": "20.538117, 77.261311",
        "domain": "https://datasee-ai-public-assets.s3.ap-south-1.amazonaws.com/2k22/AT/Adani/Pinjar/"
      },
      "Serkhani": {
        "name": "Serkhani",
        "center": "19.800312, 78.114323",
        "domain": "https://datasee-ai-public-assets.s3.ap-south-1.amazonaws.com/2k22/AT/Adani/Serkhani/"
      },
      "Shelgaon": {
        "name": "Shelgaon",
        "center": "18.491540, 75.361118",
        "domain": "https://datasee-ai-public-assets.s3.ap-south-1.amazonaws.com/2k22/AT/Adani/Shelgaon/"
      },
      "Shendra_MIDC": {
        "name": "Shendra_MIDC",
        "center": "19.869476, 75.499472",
        "domain": "https://datasee-ai-public-assets.s3.ap-south-1.amazonaws.com/2k22/AT/Adani/Shendra_MIDC/"
      },
      "Shinoli": {
        "name": "Shinoli",
        "center": "15.874123, 74.390593",
        "domain": "https://datasee-ai-public-assets.s3.ap-south-1.amazonaws.com/2k22/AT/Adani/Shinoli/"
      },
      "Sirur_Tajband": {
        "name": "Sirur_Tajband",
        "center": "18.638214, 76.964121",
        "domain": "https://datasee-ai-public-assets.s3.ap-south-1.amazonaws.com/2k22/AT/Adani/Sirur_Tajband/"
      },
      "Talbid": {
        "name": "Talbid",
        "center": "17.357983, 74.118509",
        "domain": "https://datasee-ai-public-assets.s3.ap-south-1.amazonaws.com/2k22/AT/Adani/Talbid/"
      },
      "Tiroda": {
        "name": "Tiroda",
        "center": "21.419721, 79.915084",
        "domain": "https://datasee-ai-public-assets.s3.ap-south-1.amazonaws.com/2k22/AT/Adani/Tiroda/"
      },
      "Umapur": {
        "name": "Umapur",
        "center": "19.299966, 75.598590",
        "domain": "https://datasee-ai-public-assets.s3.ap-south-1.amazonaws.com/2k22/AT/Adani/Umapur/"
      },
      "Vasanth_Nagar": {
        "name": "Vasanth_Nagar",
        "center": "20.032730, 77.761784",
        "domain": "https://datasee-ai-public-assets.s3.ap-south-1.amazonaws.com/2k22/AT/Adani/Vasanth_Nagar/"
      },
      "Vihamnadwa": {
        "name": "Vihamnadwa",
        "center": "19.464114, 75.584754",
        "domain": "https://datasee-ai-public-assets.s3.ap-south-1.amazonaws.com/2k22/AT/Adani/Vihamnadva/"
      },
      "Wai_MIDC": {
        "name": "Wai_MIDC",
        "center": "17.974564, 73.894087",
        "domain": "https://datasee-ai-public-assets.s3.ap-south-1.amazonaws.com/2k22/AT/Adani/Wai_MIDC/"
      },
      "Wakhari": {
        "name": "Wakhari",
        "center": "17.911001, 74.359745",
        "domain": "https://datasee-ai-public-assets.s3.ap-south-1.amazonaws.com/2k22/AT/Adani/Wakhari/"
      },
      "Walluj_Garware": {
        "name": "Walluj_Garware",
        "center": "19.807258, 75.225367",
        "domain": "https://datasee-ai-public-assets.s3.ap-south-1.amazonaws.com/2k22/AT/Adani/Walluj_Garware/"
      }
    };
    this.project_name = localStorage.getItem('name')
    this.splitted_project_name = this.project_name.split('-', 2)
    // console.log(this.splitted_project_name)
    this.selected = this.splitted_project_name[1];
    this.location_value = Object.values(this.Adani_locations)
    // for (var k = 0; k < Object.values(this.location_value).length; k++) {
    //   console.log(this.location_value)
    // }
    // const headers = { 'Authorization': 'token 9881e95800afe06c804e6ea3417591cfcaa50164'}
    // this.http.get<any>(environment.api_name+'project/retrieve_project_data/hero', { headers }).subscribe(data => {
    //   this.inv_main_data = data;
    //   // console.log(this.inv_main_data)
    //   this.project_id_inv = Object.keys(this.inv_main_data)
    //   this.date_inv = Object.values(this.inv_main_data[this.project_id_inv])[2]
    //   // alert("----oninit---"+this.date_inv)
    // })
    var new_center = localStorage.getItem('center')
    if (new_center != '') {
      this.center = new_center
    } else {
      this.center = this.center
    }
    // // alert("--afet center----"+this.center)
    this.str_center = this.center.split(",");
    this.lat = this.str_center[0];
    this.long = this.str_center[1];
    // // alert("2"+this.center)
    var project_name = localStorage.getItem('name')

    var project_feature_show1 = project_name.includes("Adani")
    // // alert(project_feature_show)
    if (project_feature_show1) {
      this.zoom_level = 18
    } else {
      this.zoom_level = 15
    }
    // alert(typeof this.zoom_level)

    this.map = L.map('map', {
      attributionControl: false,
      zoomControl: false,
      minZoom: 1,
      maxZoom: 22,
      //... other options
    }).setView([this.lat, this.long], this.zoom_level);


    this.Carnot_map_page()
    // default MAP layer
    // 18.189025,77.467555

    // "23.04214116137265", "76.93120479583742"], 15);





    // this.popup_card_visibility_grading = false;

  }

  onload_get_mission_flights() {
    let project_id = localStorage.getItem("project_id");
    let project_type = sessionStorage.getItem("project_type");
    let date = localStorage.getItem("date");

    const token = localStorage.getItem("token");
    const headers = {
      'Authorization': `Bearer ${token}`,
      'Content-Type': 'application/json',
    };

    var url = environment.api_name + 'api/project/get_missions_flights/' + project_id + '/' + date + '/' + project_type
    // console.log(url);
    fetch(url, { headers })
      .then(response => response.json())
      .then(datavalue => {
        // console.log(datavalue);

        if (datavalue['data'] != "Data Not Available" && datavalue['data'].length > 0) {
          this.toastr.success('Mission and Flight data are ready');
        }
        this.get_missions_flights_data = datavalue['data']
        this.get_missions_flights_data = datavalue['status']
        // console.log(datavalue['data'])
        this._http.set_mision_flight_detail(datavalue['data'])
      })
  }
  Carnot_map_page() {
    // default MAP layer
    // // alert("1")
    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
      minZoom: 1,
      maxZoom: 22,
    }).addTo(this.map);

    // default RGB layer
    this.base_ortho_layer = L.tileLayer(this.ortho_file_location_onLoad + '{z}/{x}/{y}.png', {
      attribution: '© <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
      center: [this.lat, this.long],
      minZoom: 1,
      maxZoom: 22,
      // maxNativeZoom: 20
    }).addTo(this.map);

    this.map.fitBounds(this.lat, this.long);


    this.popup_card_visibility = false;
    this.popup_card_visibility_cadestral = false;
  }

  outerfunction(date: any) {

    // // alert("----outerfunction  for side bar ----"+date)
    localStorage.setItem("date", date)
    this._http.setNewUserInfo({
      dateval: date
    });
    this._http.setclosesidebar({
      close_side_bar: "summarySidebar/True"
    });

  }
  Datemenu(date) {
    // alert(date)
    localStorage.setItem("date", date)
    this.date = date

    this.project_id_inv = Object.keys(this.summ)
    this.Project_data = Object.keys(this.summ['processed_data'][date]['summary_layers'])
    // alert(this.Project_data)
    this.Project_data_values = this.summ['processed_data'][date]['summary_layers']
    this.Project_data_inverter = Object.keys(this.summ['processed_data'][date]['inverter_layers'])
    this.Project_data_inverter_values = this.summ['processed_data'][date]['inverter_layers']
    this.ortho_file_location = this.summ['processed_data'][date]['ortho_file_location']
    this.kml_file_location = this.summ['processed_data'][date]['kml_file_location']
    this.thermal_location = this.summ['processed_data'][date]['thermal_location']
    this.cad_file_location = this.summ['processed_data'][date]['cad_file_location']
    this.csv_path = this.summ['processed_data'][date]['csv_path']
    // this.zoom_level = Number(this.summ['processed_data']['zoom_level'])
    // alert(this.zoom_level)
    this.map.removeLayer(this.base_ortho_layer);
    this.rgb_layer = L.tileLayer(this.ortho_file_location + '{z}/{x}/{y}.png', {
      attribution: '© <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
      center: [this.center],
      minZoom: 1,
      maxZoom: 22,
      // maxNativeZoom: 20
    }).addTo(this.map);

    this.base_ortho_layer = this.rgb_layer;

  }

  zoomreset() {
    this.map.setZoom(this.zoom_level)
  }
  zoomin() {
    this.map.setZoom(this.map.getZoom() + 1)
  }


  zoomout() {
    this.map.setZoom(this.map.getZoom() - 1)
  }
  // loadPopUpContent_cadestralmap(dec_obj_cadestral) {
  //   this.popup_card_visibility_cadestral = true;
  //   this.popup_card_visibility = false;
  //   // console.log(dec_obj_cadestral)
  //   if (dec_obj_cadestral != "") {
  //     selected_point.clearLayers();
  //     // console.log("popupdetails cadestral");
  //     this.Survey_No = dec_obj_cadestral["Survey No "]
  //     this.Description_cadestral = dec_obj_cadestral['Description']
  //     this.Document =dec_obj_cadestral['Document']
  //     this.Document_link ="https://datasee-ai-public-assets.s3.ap-south-1.amazonaws.com/2k21/AT/Amathur/Documents/"+dec_obj_cadestral['Document']
  //   }else{
  //   this.popup_card_visibility_cadestral = true;

  //   }
  // }
  loadPopUpContent(dec_obj) {
    // // alert(img_tag)
    this.popup_card_visibility = true;
    this.popup_card_visibility_cadestral = false;

    if (dec_obj != "") {


      selected_point.clearLayers();

      // console.log("popupdetails");
      // // console.log(kml.getElementById(placemarkId).childNodes[1].textContent);



      this.ITC_No = dec_obj['Inverter No:']
      this.Table_No = dec_obj['Table No:']
      this.Defect = dec_obj['Defect:']
      this.Description = dec_obj['Description:']
      this.popup_lat = dec_obj['Latitude:']
      this.popup_lng = dec_obj['Longitude:']
      this.Max_temp = dec_obj['Maximum Temperature:']
      this.Min_temp = dec_obj['Minimum Temperature:']
      this.Module_no = dec_obj['Module No:']
      this.thermal_img = dec_obj['Thermal Image']
      // // alert(this.thermal_img)

      // this.Thermal_Image_src = markup.getElementsByTagName('img')[0].getAttribute('src');

      // this.marker = L.marker([this.popup_lat, this.popup_lng])
      // selected_point.addLayer(this.marker).addTo(this.map);

      // // console.log(dec_obj.Defect+':')
    }
  }
  loadPopUpContent_grading(table_no) {
    this.grading_visibility = "visible"

    this._http.setgradingtable({
      gradingval: table_no
    });



  }

  RemoveKml(value: any) {
    // alert(this.polies)
    // this.zoomreset()

    this.remove_Popup_card()
    this.subdefects_visibility = "visiblity_off"
    this.grading_visibility = "visiblity_off"
    this.defect_rectify_visibility = "visibility_off"

    // console.log("cosing_component")
    if (this.summaryLayerGroup !== null) {


      for (var n in this.removekml_list) {
        this.map.removeLayer(this.removekml_list[n])
      }
      for (var n in this.removekml_list_inv) {
        this.map.removeLayer(this.removekml_list_inv[n])
      }

    }
    for (var l in this.polies) {
      this.map.removeLayer(this.polies[l])
    }


    this.map.removeLayer(this.gb_layer);
  }
  polygonMarkerCreating(lat, col, dec) {
    var proj_name = localStorage.getItem('name')
    var polygonPoints = []
    // console.log(dec)
    // console.log("---------------------------")
    let j = 1
    let k = 0
    let l = 2
    let iterate = lat.length / 3

    for (let i = 0; i < iterate; i++) {
      polygonPoints.push([lat[i + j], lat[i + k], lat[i + l]])
      j = j + 2;
      k = k + 2;
      l = l + 2
    }
    var project_feature_show = proj_name.includes("Sudair")
    if (project_feature_show) {
      var kml_name = localStorage.getItem("kml_name")
      // // console.log(kml_name)
      var kml_name_for_spotheight = kml_name.includes("Spotheight")

      if (kml_name == "Transmission_Tower" || kml_name == "Benchmark") {
        this.poly = L.polygon(polygonPoints, { color: col }, { weight: 6 }).addTo(this.map);
      } else {
        this.poly = L.polyline(polygonPoints, { color: col }, { weight: 6 }).addTo(this.map);

      }
      if (kml_name_for_spotheight) {
        // console.log("inside")
        this.poly = L.polygon(polygonPoints, { color: col }, { weight: 6 }).addTo(this.map);

      }

    } else {
      this.poly = L.polygon(polygonPoints, { color: col }, { weight: 6 }).addTo(this.map);
    }
    // // console.log(this.poly)
    this.polies.push(this.poly)
    this.poly.on("click", (e) => {
      // // console.log(e["latlng"])
      const parser = new DOMParser();
      var markup = parser.parseFromString(dec, "text/html");
      // var markup_img = parser.parseFromString(dec, "image/svg+xml");
      // // console.log(markup_img)
      // // console.log("---------------------------")
      var y = markup.getElementsByTagName("td");
      let i = 0;
      let s = 0;
      let b = null;
      let d = null;
      this.descObj = {};
      this.descObj_cadestral = {};
      b = "";

      // console.log(y.length)
      // // console.log("---------------------------")
      // // alert("------"+this.current_kml_data)
      if (y.length > 0) {

        for (var t = 0; t < y.length; t++) {
          // // console.log(y[19].lastChild)
          if (this.current_kml_data == "cadastral_map") {
            // console.log(y)
            // console.log(y[t].textContent)
            if ((y[t].textContent == "" || y[t].textContent == undefined) && (y[t].lastChild['tagName'] == "IMG")) {
              // // console.log(y[t].lastChild['src'])
              let image_src = y[t].lastChild['src']
              // // alert(image_src)
              // console.log(y)

              this.descObj_cadestral[b] = image_src
              s++;
              // console.log(this.descObj_cadestral)

            } else {
              // // console.log("//////////////////////////")

              if (i % 2 == 0) {
                b = y[t].textContent;
                //  // console.log(b)
              } else {
                if (b == "Table No") {
                  d = b;
                  this.table_no = y[t].textContent;
                } else {
                  let c = y[t].textContent;
                  this.descObj_cadestral[b] = c;

                }
              }
              i++;
            }
          } else if (this.current_kml_data == "Grading") {
            // console.log(y)
            console.log(y[t].textContent)
            if (t == 0) {
              b = y[t].textContent;
            } else {
              if (b == "Table No") {
                d = b;
                var userArray_Distance = []
                var userArray_value = []
                this.table_no = y[t].textContent;
                console.log(y[t].textContent)
                // this.http.get(this.csv_path + y[t].textContent + ".csv", { responseType: 'text' })
                //   .subscribe(
                //     data => {
                //       let csvToRowArray = data.split("\n");
                //       for (let index = 1; index < csvToRowArray.length - 1; index++) {
                //         let row = csvToRowArray[index].split(",");
                //         // userArray_Distance.push(parseFloat(parseFloat(row[0]).toFixed(5)));
                //         // userArray_value.push(parseFloat(row[3].split("\r")[0]))
                //         // userArray_value.push({"X":row[0],"Z":row[3].split("\r")[0]})
                //         // userArray_value.push([parseFloat(row[3].split("\r")[0]),parseFloat(parseFloat(row[0]).toFixed(5))])
                //         userArray_value.push([row[3].split("\r")[0], row[0]])

                //       }
                //       // console.log(userArray_Distance);
                //       // console.log(userArray_value);
                //     },
                //     error => {
                //       console.log(error);
                //     }
                //   );

                // console.log(b+"---------------"+this.table_no)new User( parseInt( row[0], 10), row[1], row[2].trim())
              }
            }


          } else {
            if ((y[t].textContent == "" || y[t].textContent == undefined) && (y[t].lastChild['tagName'] == "IMG")) {
              // // console.log(y[t].lastChild['src'])
              let image_src = y[t].lastChild['src']
              // // alert(image_src)
              // console.log(y)

              this.descObj[b] = image_src
              s++;
              // console.log(this.descObj)

            } else {
              // // console.log("//////////////////////////")

              if (i % 2 == 0) {
                b = y[t].textContent;
                //  // console.log(b)
              } else {
                if (b == "Table No") {
                  d = b;
                  this.table_no = y[t].textContent;
                } else {
                  let c = y[t].textContent;
                  this.descObj[b] = c;

                }
              }
              i++;
            }
          }
          // alert(this.subdefects_visibility)
          // this.subdefects_visibility = "visible"

          // console.log(this.descObj)
        }
      } else {
        // console.log("else")
        this.descObj_cadestral["Description"] = dec
      }
      // // alert(this.current_kml_data )
      if (this.current_kml_data == "cadastral_map") {

        var popup = L.popup({
          closePopupOnClick: true,
          autoClose: true
        })
          .setLatLng([e["latlng"]["lat"], e["latlng"]["lng"]])
          .setContent(dec)
          .openOn(this.map);

        this.popup_opened = true

      } else if (this.current_kml_data == "Grading") {
        // console.log(userArray_value)
        // alert(this.table_no)
        this.loadPopUpContent_grading(this.table_no)
        // this.loadPopUpContent_grading(userArray_value, dec)
        // this.loadPopUpContent_grading(userArray_value,userArray_Distance,dec)

      } else {
        this.loadPopUpContent(this.descObj)

      }
    });

    // this.polies.push(this.poly)


  }
  remove_Popup_card() {
    if (this.popup_opened) {
      this.map.closePopup();
      this.popup_opened = false
    }
  }

  LoadKml(value: any) {
    // console.log(value)
    // alert("in Map")
    // alert(value.menu)
    // console.log(value)
    // return
    this.remove_Popup_card()
    if (value.menu == 'cadastral_map') {
      this.current_kml_data = value.menu

      if (this.gb_layer != null) {

        this.map.removeLayer(this.gb_layer);
      }
      if (this.summaryLayerGroup !== null) {

        for (var n in this.removekml_list_inv) {
          this.map.removeLayer(this.removekml_list_inv[n])
        }
        for (var n in this.removekml_list) {
          this.map.removeLayer(this.removekml_list[n])
        }
      }
      for (var l in this.polies) {
        this.map.removeLayer(this.polies[l])
      }
      this.summaryState = value.tab;
      // console.log(this.summaryState)
      localStorage.setItem("kml_name", this.summaryState)
      var kml_name_load_sub = this.summaryState.split(",")
      this.subdefects_page_load('visibilty_off')

      // console.log(this.kml_file_location + 'GLOBAL/' + kml_name_load_sub[i] + '.kml')
      if (kml_name_load_sub.length >= 1) {
        for (var i = 0; i < kml_name_load_sub.length; i++) {
          console.log(this.kml_file_location + 'GLOBAL/' + kml_name_load_sub[i] + '.kml')

          fetch(this.kml_file_location + 'GLOBAL/' + kml_name_load_sub[i] + '.kml')
            .then(res => res.text())
            .then(kmltext => {
              // console.log(kmltext)

              const parser = new DOMParser();
              const kml = parser.parseFromString(kmltext, 'text/xml');
              // // alert("wait")
              // console.log(kml)


              this.track = new L.KML(kml);

              var el = kml.getElementsByTagName('coordinates');
              var place = kml.getElementsByTagName('Placemark')

              let n = 0;
              let b
              let d

              for (var i in place) {
                let dec = place[i].childNodes[1].textContent
                // // console.log(dec)
                let coor = place[i].getElementsByTagName('coordinates')
                let latlngArray = coor[0].textContent.replace(/\n/g, " ").split(/[ ,]+/).filter(Boolean)
                var pa = parser.parseFromString(dec, "text/html")
                let u = pa.getElementsByTagName("td")
                for (var r in u) {
                  if (n % 2 == 0) {
                    b = u[r].textContent;
                    //  // console.log(b)
                  }
                  else {
                    if (b == "Defect:") {
                      d = b;
                      this.table_no = u[r].textContent;

                      // // console.log(u[r].textContent)
                    }

                  }
                  n++
                }
                // console.log(this.table_no)

                if (this.table_no == 'Hotspot') {
                  //  green
                  this.polygonMarkerCreating(latlngArray, 'green', dec)
                }
                else {
                  this.polygonMarkerCreating(latlngArray, value.color, dec)
                }
                //
              }
              // Adjust map to show the kml
              const bounds = this.track.getBounds();
              this.map.fitBounds(bounds);


              this.map.on('click', (e) => {
                // console.log("reg" + localStorage.getItem('kml_popup_node'));
                // this.popupDesc = localStorage.getItem('kml_popup_node');
                // this.loadPopUpContent(this.popupKml, this.popupDesc);
              })
            })
        }
      } else {
        fetch(this.kml_file_location + 'GLOBAL/' + kml_name_load_sub + '.kml')
          .then(res => res.text())
          .then(kmltext => {
            // console.log(kmltext)

            const parser = new DOMParser();
            const kml = parser.parseFromString(kmltext, 'text/xml');
            // // alert("wait")
            // console.log(kml)


            this.track = new L.KML(kml);

            var el = kml.getElementsByTagName('coordinates');
            var place = kml.getElementsByTagName('Placemark')

            let n = 0;
            let b
            let d

            for (var i in place) {
              let dec = place[i].childNodes[1].textContent
              // // console.log(dec)
              let coor = place[i].getElementsByTagName('coordinates')
              let latlngArray = coor[0].textContent.replace(/\n/g, " ").split(/[ ,]+/).filter(Boolean)
              var pa = parser.parseFromString(dec, "text/html")
              let u = pa.getElementsByTagName("td")
              for (var r in u) {
                if (n % 2 == 0) {
                  b = u[r].textContent;
                  //  // console.log(b)
                }
                else {
                  if (b == "Defect:") {
                    d = b;
                    this.table_no = u[r].textContent;

                    // // console.log(u[r].textContent)
                  }

                }
                n++
              }
              // console.log(this.table_no)

              if (this.table_no == 'Hotspot') {
                //  green
                this.polygonMarkerCreating(latlngArray, 'green', dec)
              }
              else {
                this.polygonMarkerCreating(latlngArray, value.color, dec)
              }
              //
            }
            // Adjust map to show the kml
            const bounds = this.track.getBounds();
            this.map.fitBounds(bounds);


            this.map.on('click', (e) => {
              // console.log("reg" + localStorage.getItem('kml_popup_node'));
              // this.popupDesc = localStorage.getItem('kml_popup_node');
              // this.loadPopUpContent(this.popupKml, this.popupDesc);
            })
          })
      }

    }
    if (value.menu == 'Grading') {

      if (this.gb_layer != null) {

        this.map.removeLayer(this.gb_layer);
      }
      if (this.summaryLayerGroup !== null) {

        for (var n in this.removekml_list_inv) {
          this.map.removeLayer(this.removekml_list_inv[n])
        }
        for (var n in this.removekml_list) {
          this.map.removeLayer(this.removekml_list[n])
        }
      }
      for (var l in this.polies) {
        this.map.removeLayer(this.polies[l])
      }
      this.summaryState = value.tab;
      // console.log(this.summaryState)
      localStorage.setItem("kml_name", this.summaryState)
      var kml_name_load_sub = this.summaryState.split(",")
      this.subdefects_page_load('visibilty_off')
      // alert(kml_name_load_sub.length)
      // console.log(this.kml_file_location + 'GLOBAL/' + kml_name_load_sub[i] + '.kml')
      // if (kml_name_load_sub.length >= 1) {

      for (var q = 0; q < kml_name_load_sub.length; q++) {
        console.log(this.kml_file_location + 'GLOBAL/' + kml_name_load_sub[q] + '.kml' + "---------" + q)
        var elevation = kml_name_load_sub[q].includes("Elevation")
        // alert(elevation)
        if (elevation) {
          this.current_kml_data = value.menu
          // alert(this.current_kml_data)
        } else {
          this.current_kml_data = 'cadastral_map'
          this.grading_visibility = "visiblity_off"

        }

        fetch(this.kml_file_location + 'GLOBAL/' + kml_name_load_sub[q] + '.kml')
          .then(res => res.text())
          .then(kmltext => {
            // console.log(kmltext)

            const parser = new DOMParser();
            const kml = parser.parseFromString(kmltext, 'text/xml');
            // // alert("wait")
            // console.log(kml)


            this.track = new L.KML(kml);

            var el = kml.getElementsByTagName('coordinates');
            var place = kml.getElementsByTagName('Placemark')

            let n = 0;
            let b
            let d

            for (var i in place) {
              // console.log(place[i])
              let dec = place[i].childNodes[1].textContent
              let coor = place[i].getElementsByTagName('coordinates')
              let latlngArray = coor[0].textContent.replace(/\n/g, " ").split(/[ ,]+/).filter(Boolean)
              var pa = parser.parseFromString(dec, "text/html")
              let u = pa.getElementsByTagName("td")
              for (var r in u) {
                // console.log(r+"---------r")
                // console.log(u[r].textContent);
                if (r != "1") {
                  b = u[r].textContent;
                } else {
                  if (b == "Table No") {
                    d = b;
                    this.table_no = u[r].textContent;

                    // console.log(b+"---------------"+u[r].textContent)
                  }
                }

                n++
                // console.log(u[r].textContent)
              }



              if (this.table_no == 'Hotspot') {
                //  green
                this.polygonMarkerCreating(latlngArray, 'green', dec)
              }
              else {

                this.polygonMarkerCreating(latlngArray, value.color, dec)
              }
              //
            }
            // Adjust map to show the kml
            const bounds = this.track.getBounds();
            this.map.fitBounds(bounds);


            this.map.on('click', (e) => {
              // console.log("reg" + localStorage.getItem('kml_popup_node'));
              // this.popupDesc = localStorage.getItem('kml_popup_node');
              // this.loadPopUpContent(this.popupKml, this.popupDesc);
            })
          })
      }


    }
    if (value.menu == 'summary_sub_details') {
      var x = value.menu
      sessionStorage.setItem("mode", x)
      this.current_kml_data = value.menu

      if (this.gb_layer != null) {

        this.map.removeLayer(this.gb_layer);
      }
      if (this.summaryLayerGroup !== null) {

        for (var n in this.removekml_list_inv) {
          this.map.removeLayer(this.removekml_list_inv[n])
        }
        for (var n in this.removekml_list) {
          this.map.removeLayer(this.removekml_list[n])
        }
      }
      for (var l in this.polies) {
        this.map.removeLayer(this.polies[l])
      }
      this.summaryState = value.tab;
      sessionStorage.setItem("kmlfilename", this.summaryState)

      this.summaryState = value.tab;
      var kml_name_load_sub = this.summaryState.split(",")
      // alert(kml_name_load_sub)
      this.subdefects_page_load('visible')

      for (var p = 0; p < kml_name_load_sub.length; p++) {
        fetch(this.kml_file_location + 'GLOBAL/' + kml_name_load_sub[p] + '.kml')
          .then(res => res.text())
          .then(kmltext => {
            // const parser = new DOMParser();
            // const kml = parser.parseFromString(kmltext, 'text/xml');

            const parser = new DOMParser();
            const kml = parser.parseFromString(kmltext, 'text/xml');


            this.track = new L.KML(kml);

            var el = kml.getElementsByTagName('coordinates');
            var place = kml.getElementsByTagName('Placemark')

            let n = 0;
            let b
            let d
            for (var i in place) {
              let dec = place[i].childNodes[1].textContent
              // // console.log(dec)
              let coor = place[i].getElementsByTagName('coordinates')
              let latlngArray = coor[0].textContent.replace(/\n/g, " ").split(/[ ,]+/).filter(Boolean)
              var pa = parser.parseFromString(dec, "text/html")
              let u = pa.getElementsByTagName("td")
              for (var r in u) {
                if (n % 2 == 0) {
                  b = u[r].textContent;
                  //  // console.log(b)
                }
                else {
                  if (b == "Defect:") {
                    d = b;
                    this.table_no = u[r].textContent;

                    // // console.log(u[r].textContent)
                  }

                }
                n++
              }

              // console.log(this.table_no)

              if (this.table_no == 'Hotspot') {
                //  green
                this.polygonMarkerCreating(latlngArray, 'green', dec)
              }
              else {
                this.polygonMarkerCreating(latlngArray, value.color, dec)
              }


            }


            // this.track = new L.KML(kml);

            // // console.log(this.track)
            // this.summaryLayerGroup = L.layerGroup([this.track]).addTo(this.map);
            // this.removekml_list_inv.push(this.summaryLayerGroup)



            // // console.log(this.track)
            // this.popupKml = kml
            // var el = kml.getElementsByTagName('coordinates')[0].parentNode.parentNode;





            // Adjust map to show the kml
            const bounds = this.track.getBounds();
            this.map.fitBounds(bounds);
          })
      }
      this.map.on('click', (e) => {
        // console.log("reg" + localStorage.getItem('kml_popup_node'));
        // this.popupDesc = localStorage.getItem('kml_popup_node');
        // this.loadPopUpContent(this.popupKml, this.popupDesc);
      })
    }

    if (value.menu == 'inverter_sub_details') {
      var x = value.menu
      this.current_kml_data = value.menu

      sessionStorage.setItem("mode", x)
      this.summaryState = value.tab;
      var kml_name_load_inv_sub = this.summaryState.split(",")
      sessionStorage.setItem("kmlfilename", this.summaryState)

      // alert(kml_name_load_sub)
      this.subdefects_page_load('visible')
      if (this.summaryLayerGroup !== null) {
        for (var n in this.removekml_list_inv) {
          this.map.removeLayer(this.removekml_list_inv[n])
        }
      }
      for (var l in this.polies) {
        this.map.removeLayer(this.polies[l])
      }
      var url;
      if (value.pageno <= 9 && value.pageno >= 1) {
        url = this.kml_file_location + 'INVERTER0' + value.pageno + '/'
      }
      else {
        // console.log("esle")
        url = this.kml_file_location + 'INVERTER' + value.pageno + '/'
      }
      for (var m = 0; m < kml_name_load_inv_sub.length; m++) {
        // console.log(url + kml_name_load_inv_sub[m] + '.kml')


        fetch(url + kml_name_load_inv_sub[m] + '.kml')
          .then(res => res.text())
          .then(kmltext => {
            const parser = new DOMParser();
            const kml = parser.parseFromString(kmltext, 'text/xml');


            this.track = new L.KML(kml);

            var el = kml.getElementsByTagName('coordinates');
            var place = kml.getElementsByTagName('Placemark')

            let n = 0;
            let b
            let d
            for (var i in place) {
              let dec = place[i].childNodes[1].textContent
              // // console.log(dec)
              let coor = place[i].getElementsByTagName('coordinates')
              let latlngArray = coor[0].textContent.replace(/\n/g, " ").split(/[ ,]+/).filter(Boolean)
              var pa = parser.parseFromString(dec, "text/html")
              let u = pa.getElementsByTagName("td")
              for (var r in u) {
                if (n % 2 == 0) {
                  b = u[r].textContent;
                  //  // console.log(b)
                }
                else {
                  if (b == "Defect:") {
                    d = b;
                    this.table_no = u[r].textContent;

                    // // console.log(u[r].textContent)
                  }

                }
                n++
              }
              // console.log(this.table_no)
              // console.log(value.color)
              if (this.table_no == 'Hotspot') {
                //  green
                this.polygonMarkerCreating(latlngArray, 'green', dec)
              }
              else {
                this.polygonMarkerCreating(latlngArray, value.color, dec)
              }
              //               if (this.table_no == 'Dirt') {
              //
              //                 this.polygonMarkerCreating(latlngArray, value.color, dec)
              //               }
              //               if (this.table_no == 'Multicell Hotspot' || this.table_no == 'Multicell_Hotspot') {
              //
              //                 this.polygonMarkerCreating(latlngArray, value.color, dec)
              //               }
              //
              //
              //               if (this.table_no == 'DirBy_Pass_Diode_Issuest' || this.table_no == 'DirBy Pass Diode Issuest') {
              //
              //                 this.polygonMarkerCreating(latlngArray, value.color, dec)
              //               }
              //
              //
              //               if (this.table_no == 'Panel Failure' || this.table_no == 'Panel_Failure') {
              //
              //                 this.polygonMarkerCreating(latlngArray, value.color, dec)
              //               } if (this.table_no == 'Open String Tables' || this.table_no == 'Open_String_Tables') {
              //
              //                 this.polygonMarkerCreating(latlngArray, value.color, dec)
              //               }
              //               if (this.table_no == 'Open Circuit' || this.table_no == 'Open_Circuit') {
              //                 this.polygonMarkerCreating(latlngArray, value.color, dec)
              //               }
              //               if (this.table_no == 'Short Circuit' || this.table_no == 'Short_Circuit') {
              //                 this.polygonMarkerCreating(latlngArray, value.color, dec)
              //               }
              //               if (this.table_no == 'Uniform Panel Heating' || this.table_no == 'Uniform_Panel_Heating') {
              //                 this.polygonMarkerCreating(latlngArray, value.color, dec)
              //               }
              //               if (this.table_no == 'Open_String_Tables' || this.table_no == 'Open String Tables') {
              //                 this.polygonMarkerCreating(latlngArray, value.color, dec)
              //               }
              //               if (this.table_no == 'PID') {
              //                 this.polygonMarkerCreating(latlngArray, value.color, dec)
              //               }

            }



            // // Create new kml overlay
            // const parser = new DOMParser();
            // const kml = parser.parseFromString(kmltext, 'text/xml');
            // // // console.log(kml);
            // // console.log(kmltext)
            // this.track = new L.KML(kml);

            // // Add track to map
            // this.summaryLayerGroup = L.layerGroup([this.track]).addTo(this.map);
            // this.removekml_list_inv.push(this.summaryLayerGroup)


            // this.popupKml = kml
            // var el = kml.getElementsByTagName('coordinates')[0].parentNode.parentNode;
            // // console.log(el)



            // Adjust map to show the kml
            const bounds = this.track.getBounds();
            this.map.fitBounds(bounds);
          });
      }
    }

    if (value.menu === 'summary') {
      var x = value.menu
      sessionStorage.setItem("mode", x)
      this.current_kml_data = value.menu

      // alert(x)
      // to remove existing inverter gb kml
      if (this.gb_layer != null) {

        this.map.removeLayer(this.gb_layer);
      }
      if (this.summaryLayerGroup !== null) {

        for (var n in this.removekml_list) {
          this.map.removeLayer(this.removekml_list[n])
        }
      }
      for (var l in this.polies) {
        this.map.removeLayer(this.polies[l])
      }
      this.subdefects_page_load('visible')


      // console.log(value)
      this.summaryState = value.tab;
      localStorage.setItem("kml_name", this.summaryState)

      var kml_name_load = this.summaryState.split(",")
      console.log(kml_name_load)
      sessionStorage.setItem("kmlfilename", this.summaryState)
      for (var i = 0; i < kml_name_load.length; i++) {
        // console.log(kml_name_load[i])

        fetch(this.kml_file_location + 'GLOBAL/' + kml_name_load[i] + '.kml')
          .then(res => res.text())
          .then(kmltext => {


            // Create new kml overlay
            const parser = new DOMParser();
            const kml = parser.parseFromString(kmltext, 'text/xml');


            this.track = new L.KML(kml);

            var el = kml.getElementsByTagName('coordinates');
            var place = kml.getElementsByTagName('Placemark')

            let n = 0;
            let b
            let d
            for (var i in place) {
              let dec = place[i].childNodes[1].textContent
              // console.log(dec)

              let coor = place[i].getElementsByTagName('coordinates')
              let latlngArray = coor[0].textContent.replace(/\n/g, " ").split(/[ ,]+/).filter(Boolean)
              var pa = parser.parseFromString(dec, "text/html")
              let u = pa.getElementsByTagName("td")
              for (var r in u) {
                if (n % 2 == 0) {
                  b = u[r].textContent;
                  //  // console.log(b)
                }
                else {
                  if (b == "Defect:") {
                    d = b;
                    this.table_no = u[r].textContent;

                    // // console.log(u[r].textContent)
                  }

                }
                n++
              }


              // alert(this.subdefects_visibility )

              // // console.log(this.table_no)
              // // console.log(value.color)
              if (this.table_no == 'Hotspot') {
                //  green

                this.polygonMarkerCreating(latlngArray, 'green', dec)


              }
              if (this.table_no == 'Dirt') {

                this.polygonMarkerCreating(latlngArray, value.color[1], dec)
              }
              if (this.table_no == 'Multicell Hotspot' || this.table_no == 'Multicell_Hotspot') {

                this.polygonMarkerCreating(latlngArray, value.color[2], dec)
              }


              if (this.table_no == 'DirBy_Pass_Diode_Issuest') {

                this.polygonMarkerCreating(latlngArray, value.color[1], dec)
              }
              if (this.table_no == 'By_Pass_Diode_Issues') {

                this.polygonMarkerCreating(latlngArray, value.color[1], dec)
              }
              if (this.table_no == 'Dirt_By_Pass_Diode_Issues') {

                this.polygonMarkerCreating(latlngArray, value.color[1], dec)
              }
              if (this.table_no == 'Panel Failure' || this.table_no == 'Panel_Failure') {

                this.polygonMarkerCreating(latlngArray, value.color[0], dec)
              } if (this.table_no == 'Open String Tables' || this.table_no == 'Open_String_Tables') {

                this.polygonMarkerCreating(latlngArray, value.color[1], dec)
              }
              if (this.table_no == 'Open Circuit' || this.table_no == 'Open_Circuit') {
                // console.log("op")
                this.polygonMarkerCreating(latlngArray, value.color[0], dec)
              }
              if (this.table_no == 'Short Circuit' || this.table_no == 'Short_Circuit') {
                this.polygonMarkerCreating(latlngArray, value.color[0], dec)
              }
              if (this.table_no == 'Uniform Panel Heating' || this.table_no == 'Uniform_Panel_Heating') {
                this.polygonMarkerCreating(latlngArray, value.color[0], dec)
              }
              if (this.table_no == 'Open_String_Tables' || this.table_no == 'Open String Tables') {
                this.polygonMarkerCreating(latlngArray, value.color[1], dec)
              }

              if (this.table_no == 'PID') {
                this.polygonMarkerCreating(latlngArray, value.color[0], dec)
              }

            }

            // this.summaryLayerGroup = L.layerGroup([this.track]).addTo(this.map);
            // this.removekml_list.push(this.summaryLayerGroup)



            // // console.log(this.track)
            this.popupKml = kml
            // var el = kml.getElementsByTagName('coordinates')[0].parentNode.parentNode;





            // Adjust map to show the kml
            const bounds = this.track.getBounds();
            this.map.fitBounds(bounds);
          });
      }

      this.map.on('click', (e) => {
        // console.log("reg" + localStorage.getItem('kml_popup_node'));
        // this.popupDesc = localStorage.getItem('kml_popup_node');
        // this.loadPopUpContent(this.popupKml, this.popupDesc);
      })

      localStorage.setItem('kml_popup_node', '');

    }


    if (value.menu === 'inventor') {
      var x = value.menu
      this.current_kml_data = value.menu

      var page = value.pageno
      sessionStorage.setItem("mode", x)
      sessionStorage.setItem("page", page)
      if (this.summaryLayerGroup !== null) {
        for (var n in this.removekml_list_inv) {
          this.map.removeLayer(this.removekml_list_inv[n])
        }
      }
      for (var l in this.polies) {
        this.map.removeLayer(this.polies[l])
      }

      this.summaryState = value.tab;

      var url;
      if (value.pageno <= 9 && value.pageno >= 1) {
        url = this.kml_file_location + 'INVERTER0' + value.pageno + '/'
      }
      else {
        // console.log("esle")
        url = this.kml_file_location + 'INVERTER' + value.pageno + '/'
      }
      this.summaryState = value.tab;
      sessionStorage.setItem("kmlfilename", this.summaryState)
      var kml_name_load_inv = this.summaryState.split(",")
      // console.log(value)
      this.subdefects_page_load('visible')

      for (var m = 0; m < kml_name_load_inv.length; m++) {
        // console.log(url + kml_name_load_inv[m] + '.kml')


        fetch(url + kml_name_load_inv[m] + '.kml')
          .then(res => res.text())
          .then(kmltext => {


            const parser = new DOMParser();
            const kml = parser.parseFromString(kmltext, 'text/xml');


            this.track = new L.KML(kml);

            var el = kml.getElementsByTagName('coordinates');
            var place = kml.getElementsByTagName('Placemark')

            let n = 0;
            let b
            let d
            for (var i in place) {
              let dec = place[i].childNodes[1].textContent
              // // console.log(dec)
              let coor = place[i].getElementsByTagName('coordinates')
              let latlngArray = coor[0].textContent.replace(/\n/g, " ").split(/[ ,]+/).filter(Boolean)
              var pa = parser.parseFromString(dec, "text/html")
              let u = pa.getElementsByTagName("td")
              for (var r in u) {
                if (n % 2 == 0) {
                  b = u[r].textContent;
                  // console.log(b)
                }
                else {
                  if (b == "Defect:") {
                    d = b;
                    this.table_no = u[r].textContent;

                    // // console.log(u[r].textContent)
                  }

                }
                n++
              }
              // this.subdefects_visibility =



              // console.log(this.table_no)
              // console.log(value.color)
              if (this.table_no == 'Hotspot') {
                //  green

                this.polygonMarkerCreating(latlngArray, 'green', dec)


              }
              if (this.table_no == 'Dirt') {

                this.polygonMarkerCreating(latlngArray, value.color[1], dec)
              }
              if (this.table_no == 'Multicell Hotspot' || this.table_no == 'Multicell_Hotspot') {

                this.polygonMarkerCreating(latlngArray, value.color[2], dec)
              }


              if (this.table_no == 'DirtBy_Pass_Diode_Issues') {

                this.polygonMarkerCreating(latlngArray, value.color[1], dec)
              }


              if (this.table_no == 'Panel Failure' || this.table_no == 'Panel_Failure') {

                this.polygonMarkerCreating(latlngArray, value.color[0], dec)
              } if (this.table_no == 'Open String Tables' || this.table_no == 'Open_String_Tables') {

                this.polygonMarkerCreating(latlngArray, value.color[1], dec)
              }
              if (this.table_no == 'Open Circuit' || this.table_no == 'Open_Circuit') {
                // console.log("op")
                this.polygonMarkerCreating(latlngArray, value.color[0], dec)
              }
              if (this.table_no == 'Short Circuit' || this.table_no == 'Short_Circuit') {
                this.polygonMarkerCreating(latlngArray, value.color[0], dec)
              }
              if (this.table_no == 'Uniform Panel Heating' || this.table_no == 'Uniform_Panel_Heating') {
                this.polygonMarkerCreating(latlngArray, value.color[0], dec)
              }
              if (this.table_no == 'Open_String_Tables' || this.table_no == 'Open String Tables') {
                this.polygonMarkerCreating(latlngArray, value.color[1], dec)
              }
              if (this.table_no == 'PID') {
                this.polygonMarkerCreating(latlngArray, value.color[0], dec)
              }

            }

            // // Create new kml overlay
            // const parser = new DOMParser();
            // const kml = parser.parseFromString(kmltext, 'text/xml');
            // // // console.log(kml);
            // // console.log(kmltext)
            // this.track = new L.KML(kml);

            // // Add track to map
            // this.summaryLayerGroup = L.layerGroup([this.track]).addTo(this.map);
            // this.removekml_list_inv.push(this.summaryLayerGroup)


            // this.popupKml = kml
            // var el = kml.getElementsByTagName('coordinates')[0].parentNode.parentNode;
            // // console.log(el)



            // Adjust map to show the kml
            const bounds = this.track.getBounds();
            this.map.fitBounds(bounds);
          });
      }



      this.map.on('click', (e) => {
        // console.log("reg");
        // this.popupDesc = localStorage.getItem('kml_popup_node');



        // this.loadPopUpContent(this.popupKml, this.popupDesc);
      })

      localStorage.setItem('kml_popup_node', '');

    }
    this.close_popup_card()
  }
  subdefects_page_load(visibility: any) {
    // alert(visibility)
    this.subdefects_visibility = visibility
    // this.zoomreset()
    if (visibility == "visible") {
      this._http.setsubdefects({
        status: visibility
      });
    }

  }


  LoadGBKml(value: any) {
    // // alert(value)
    // this.RemoveKml("Remove")
    this.remove_Popup_card()

    var url;
    // // alert(value + 'sdsd');
    // console.log(value, 'sdsd');

    if (this.gb_layer !== null) {
      // this.summaryLayerGroup.removeLayer(this.track)
      this.map.removeLayer(this.gb_layer);
    }


    if (value <= 9 && value >= 1) {
      url = this.kml_file_location + 'INVERTER0' + value + '/gb.kml'
      // console.log("if")
    }
    else {
      // console.log("else")
      url = this.kml_file_location + 'INVERTER' + value + '/gb.kml'
    }
    // // alert(url)
    fetch(url)
      .then(res => res.text())
      .then(kmltext => {



        // Create new kml overlay
        const parser = new DOMParser();
        const kml = parser.parseFromString(kmltext, 'text/xml');
        // // console.log(kml);
        // // alert("kml")

        this.gb_layer = new L.KML(kml);

        // Add track to map
        this.map.addLayer(this.gb_layer)


        this.popupKml = kml
        var el = kml.getElementsByTagName('coordinates')[0].parentNode.parentNode;
        // console.log(el)
        // // alert("el"+this.track)

        // // console.log(this.track)
        // Adjust map to show the kml
        const bounds = this.gb_layer.getBounds();
        this.map.fitBounds(bounds);
        // // alert("bounds")
      });


    this.close_popup_card()

  }


  ViewMenu(option) {
    if (this.activeViewMenu) {
      if (this.activeViewMenu === option) {
        $('#' + option + 'Menu').css({ 'background-color': 'transparent', 'color': '#333' });
        this.activeViewMenu = null;
      } else {
        $('#' + this.activeViewMenu + 'Menu').css({ 'background-color': 'transparent', 'color': '#333' });
        $('#' + option + 'Menu').css({ 'background-color': 'var(--primary)', 'color': '#eee' });
        this.activeViewMenu = option;
      }
    } else {
      $('#' + option + 'Menu').css({ 'background-color': 'var(--primary)', 'color': '#eee' });
      this.activeViewMenu = option;
    }

    if (option === 'rgb') {

      this.map.removeLayer(this.base_ortho_layer);
      this.rgb_layer = L.tileLayer(this.ortho_file_location + '{z}/{x}/{y}.png', {
        attribution: '© <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
        center: [this.center],
        minZoom: 1,
        maxZoom: 22,
        // maxNativeZoom: 19
      }).addTo(this.map);

      this.base_ortho_layer = this.rgb_layer;


    } else if (option === 'thermal') {
      // Adding Thermal layer
      // alert("Adding Thermal layer"+option)

      var thermal_val = localStorage.getItem('thermal');

      if (thermal_val == "thermal") {

        localStorage.setItem('thermal', 'none');

        this.thermal_layer = L.tileLayer(this.thermal_location + '{z}/{x}/{y}.png', {
          attribution: '© <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
          center: [this.center],
          minZoom: 1,
          maxZoom: 22,
          // maxNativeZoom: 20
        }).addTo(this.map);
        this.accepted = 'true'

      } else if (thermal_val == "none") {
        // Removing Thermal layer

        localStorage.setItem('thermal', "thermal");
        this.map.removeLayer(this.thermal_layer);

      }


    }else if (option === 'cad') {
      // Adding CAD layer
      var proj_name = localStorage.getItem('name')
      // alert(proj_name)

      var cad_val = localStorage.getItem('cad');

      if (cad_val == "cad") {

        localStorage.setItem('cad', 'none');

        this.cad_layer = L.tileLayer(this.cad_file_location + '{z}/{x}/{y}.png', {
          attribution: '© <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
          center: [this.center],
          minZoom: 1,
          maxZoom: 22,
          // maxNativeZoom: 20
        }).addTo(this.map);

        if (proj_name == "Rewa") {
          var value = { "menu": "cadastral_map", "tab": "CAD" }
          this.LoadKml(value)

        }
        this.accepted1 = true
      } else if (cad_val == "none") {
        // Removing CAD layer
        this.map.removeLayer(this.cad_layer);
        localStorage.setItem('cad', "cad");
        // this.RemoveKml(value)
        if (proj_name == "Rewa") {
          this.remove_Popup_card()

          for (var l in this.polies) {
            this.map.removeLayer(this.polies[l])
          }
        }
      }
    } else if (option === 'DTM') {
      // Adding DTM layer
      var proj_name = localStorage.getItem('name')
      this.proj_name_contains = proj_name.includes("Sudair")
      // if (this.proj_name_contains) {
      //   this.default_dtm = 'https://datasee-ai-public-assets.s3.ap-south-1.amazonaws.com/2k22/Infrastructure/' + proj_name + '/DTM/DTM.PNG'
      //   // // alert(this.default_dtm )
      // }
      // this.proj_name_contains = proj_name.includes("Bhadla_R")
      // if (this.proj_name_contains) {
      //   this.default_dtm = 'https://datasee-ai-public-assets.s3.ap-south-1.amazonaws.com/2k22/AT/' + proj_name + '/DTM/DTM.PNG'
      // }
      var cad_val = localStorage.getItem('DTM');
      if (this.cad_file_location != null) {

        if (cad_val == "DTM") {

          localStorage.setItem('DTM', 'none');


          this.dtm_layer = L.tileLayer(this.cad_file_location + '{z}/{x}/{y}.png', {
            attribution: '© <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
            center: [this.center],
            minZoom: 1,
            maxZoom: 22,
            // maxNativeZoom: 20
          }).addTo(this.map);
          this.isShown1 = "visibility"
          this.accepted2 = false


        } else if (cad_val == "none") {
          // Removing CAD layer
          this.map.removeLayer(this.dtm_layer);
          this.isShown1 = "visibility_off"

          localStorage.setItem('DTM', "DTM");
          this.accepted2 = true
        }
      } else {
        alert("There is no DTM for this project")
        this.accepted2 = true
      }
      // // alert(this.isShown1)

    } else if (option === 'slope') {
      // Adding SLOPE layer
      var proj_name = localStorage.getItem('name')
      // this.proj_name_contains = proj_name.includes("Sudair")
      // if (this.proj_name_contains) {
      //   this.default_slope = 'https://datasee-ai-public-assets.s3.ap-south-1.amazonaws.com/2k22/Infrastructure/' + proj_name + '/SLOPE/Slope.PNG'

      // }

      var cad_val = localStorage.getItem('slope');
      if (this.thermal_location != null) {
        if (cad_val == "slope") {

          localStorage.setItem('slope', 'none');


          this.slope_layer = L.tileLayer(this.thermal_location + '{z}/{x}/{y}.png', {
            attribution: '© <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
            center: [this.center],
            minZoom: 1,
            maxZoom: 22,
            // maxNativeZoom: 20
          }).addTo(this.map);
          this.isShown2 = "visibility"
          this.accepted4 = false
        } else if (cad_val == "none") {
          // Removing CAD layer
          this.map.removeLayer(this.slope_layer);
          this.isShown2 = "visibility_off"

          localStorage.setItem('slope', "slope");
          this.accepted4 = true
        }
      } else {
        alert("There is no SLOPE for this project")
        this.accepted4 = true
      }


    } else if (option === 'RawThermal') {
      this.markers = L.layerGroup()
      var rawImg = sessionStorage.getItem('rawImage');

      if (rawImg == 'rawImage') {
        // // console.log(this.get_missions_flights_data)
        // alert(this.get_missions_flights_status)
        if (this.get_missions_flights_status == undefined) {
          this.toastr.warning('Please wait.... getting mission and Flight data.');
          this.accepted3 = false;
        }
        if (this.get_missions_flights_data == "Data Not Available" && this.get_missions_flights_status == "success") {
          alert("There is no Raw image for this project.")
          this.accepted3 = false;

        } else if (this.get_missions_flights_data != "Data Not Available" && this.get_missions_flights_status == "success") {
          sessionStorage.setItem('rawImage', 'rawImage');
          // setTimeout(() => {
          //   this.ngxService.stop();
          // }, 10000)
          const dialogRef = this.dialog.open(RawImageComponent, {
            width: '250px',
            // data: {mission: this.mission, flight: this.flight}
          });

          dialogRef.afterClosed().subscribe(result => {
            let dataval = this._http.getmissiondata();
            // console.log(dataval['mission'])
            // this.accepted3 = false;


            let project_id = localStorage.getItem("project_id");
            let project_type = sessionStorage.getItem("project_type");
            let date = localStorage.getItem("date");

            const token = localStorage.getItem("token");
            const headers = {
                'Authorization': `Bearer ${token}`,
                'Content-Type': 'application/json',
            };

            var url = environment.api_name + 'api/project/get_thermal_assets/' + project_id + '/' + date + '/' + project_type + '?filter={"mission":"' + dataval['mission'] + '","flight":"' + dataval['flight'] + '"}'
            fetch(url, { headers })
              .then(response => response.json())
              .then(datavalue => {
                // console.log(datavalue['data'])
                this.uploaded_raw_image = datavalue['data']
                let popupContent = `
                  <form class="popup-form">
                    <div class="form-group">
                      <label class="mb-0" for="comment">Comment:</label>
                      <textarea class="form-control" rows="4" class="comment"></textarea>
                    </div>
                    <div class="d-flex">
                      <button class="btn btn-outline-info btn-sm">Save</button>
                      <button class="delete-button btn btn-outline-danger btn-sm ml-auto">
                         Delete
                      </button>
                    </div>
                  </form>
                  `;
                var greenIcon = L.icon({
                  iconSize: [30, 30],
                  iconUrl: 'http://maps.google.com/mapfiles/ms/icons/blue-dot.png',
                });

                // var marker = L.marker([23.91353722222222, 71.19426805555555], { icon: greenIcon }).bindPopup(popupContent)
                // // var marker = L.marker([23.91353722222222, 71.19426805555555], { icon: greenIcon }).bindPopup("<html><head></head><body><table><tr><td>url:</td><td><image src="' + element["url"] + '"</td></tr></body></html>")
                // selected_point.addLayer(marker).addTo(this.map);
                // marker.on('click', this.open_dialog())
                this.uploaded_raw_image.forEach(element => {

                  // let popupContent = '<form class="popup-form"><div class="row"><label class="mb-0" for="comment">Note: <b>use ctrl+ click link <b> <br>to view the image in new tab</label><label class="mb-0" for="comment">url:<span><a href="' + element["url"] + '">' + element["filename"] + '</a></span></label></div></form>'
                  let popupContent = '<html><head><style> .leaflet-popup-content-wrapper {width:680px}</style></head><body><table><tr><td><img src="' + element["url"] + '"/></td></tr><tr><td>' + element["filename"] + '</td></tr></body></html>'
                  var markers = L.marker([element['latitude'], element['longitude']], { icon: greenIcon }).bindPopup(popupContent)
                  // var marker = L.marker([23.91353722222222, 71.19426805555555], { icon: greenIcon }).bindPopup("<html><head></head><body><table><tr><td>url:</td><td><button click='open_dialog()'>asdasd</button></td></tr></body></html>")
                  this.marker_data.push(markers)
                  this.markers.addLayer(markers).addTo(this.map)

                });

              })
          })
          sessionStorage.setItem('rawImage', 'none');
        }
        // })


        // // console.log("---")
        // // console.log(this.mission_data)
      } else {
        sessionStorage.setItem('rawImage', 'rawImage');
        // this.map.removeLayer()
        // this.map.removeLayer(this.markers)
        for (var l in this.marker_data) {
          this.map.removeLayer(this.marker_data[l])
        }

      }


    }
  }

  satellite_view() {
    // // alert("satellite_view")
    this.satelliteview = localStorage.getItem('satellite');
    if (this.satelliteview == "satellite") {

      this.satellite_layer = L.tileLayer('https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}', {
        attribution: 'Tiles &copy; Esri &mdash; Source: Esri, i-cubed, USDA, USGS, AEX, GeoEye, Getmapping, Aerogrid, IGN, IGP, UPR-EGP, and the GIS User Community',
        center: [this.center],
        // minZoom: 1,
        // maxZoom: 22,
      }).addTo(this.map);

      this.rgb_layer = L.tileLayer(this.ortho_file_location_onLoad + '{z}/{x}/{y}.png', {
        attribution: '© <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
        center: [this.lat, this.long],
        minZoom: 1,
        maxZoom: 22,
        // maxNativeZoom: 18
      }).addTo(this.map);
      localStorage.setItem('satellite', 'terrain');

      var thermal_val = localStorage.getItem('thermal');

      if (thermal_val == "none") {
        this.accepted = 'false';
        // alert(thermal_val)
        localStorage.setItem('thermal', 'thermal');

        this.ViewMenu("thermal")

      }
      var cad_val = localStorage.getItem('cad')

      if (cad_val == "none") {
        this.accepted1 = 'false';
        // alert(thermal_val)
        localStorage.setItem('cad', 'cad');

        this.ViewMenu("cad")

      }
      var dtm_val = localStorage.getItem('DTM')

      if (dtm_val == "none") {
        this.accepted2 = 'false';
        // alert(thermal_val)
        localStorage.setItem('DTM', 'DTM');

        this.ViewMenu("DTM")

      }


    } else if (this.satelliteview == "terrain") {
      // Removing satellite layer
      this.map.removeLayer(this.satellite_layer);

      localStorage.setItem('satellite', "satellite");
    }
  }


  close_popup_card() {

    this.popup_card_visibility = false;
    this.popup_card_visibility_cadestral = false;
    this.popup_card_visibility_grading = false;
  }


  sliderEventReciever($event) {


    // if ($event === true) {
    //   // console.log("slider on");
    //   this.thermal_layer = L.tileLayer('http://106.51.3.224:6660/HERO_Ichawar/Thermal_Ortho/{z}/{x}/{y}.png', {
    //     attribution: '© <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
    //   }).addTo(this.map);
    //   this.sliderControl = L.control.sideBySide(this.base_ortho_layer, this.thermal_layer);
    //   this.sliderControl.addTo(this.map);

    //   // console.log(this.sliderControl);


    // }
    // else {
    //   // console.log("off");

    //   this.sliderControl.remove()

    // }

  }


  // summaryStateEventReciever(value: any) {
  //   this.summaryState = value;

  //   // console.log(value);

  // }
  // public gotoAnalytics(){
  //   this.router.navigate(['app/analytics'])
  // }
  screenshotcapture(getscreenshotfromsidebar) {
    // // alert("---------"+this.getscreenshotfromsidebar)
    // html2canvas(document.body).then(function(canvas) {
    //   document.body.appendChild(canvas);
    // });
    let element = document.querySelector(".capture");
    // console.log(document.querySelector("#map"))
    html2canvas(document.querySelector("#map,.capture"), {
      // backgroundColor: null,
      useCORS: true,
      // removeContainer: true,
      // scale: window.devicePixelRatio
    }).then(function (canvas) {
      // Convert the canvas to blob
      canvas.toBlob(function (blob) {
        // To download directly on browser default 'downloads' location
        let link = document.createElement("a");
        link.download = "image.png";
        // console.log(blob);

        link.href = URL.createObjectURL(blob);
        // console.log(link.href);
        link.click();

        // To save manually somewhere in file explorer


      }, 'image/png');
    });
    localStorage.setItem("capture", "capturedone")

  }

  Change_location(location_name) {
    this.Adani_locations[location_name]
    localStorage.setItem("name", "Adani-" + this.Adani_locations[location_name]['name'])
    localStorage.setItem("center", this.Adani_locations[location_name]['center'])
    this.map.removeLayer(this.rgb_layer);
    const newtoken = localStorage.getItem("token");
    const newName = localStorage.getItem("name");

    if (newName == "Adani-Limbaganesh") {
      sessionStorage.setItem("prev_proj", "Adani-" + this.Adani_locations[location_name]['name'])
    }
    this.map.removeLayer(this.rgb_layer);

    const token = localStorage.getItem("token");
    const headers = {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json',
    };

    // fetch(environment.api_name + "project/retrieve_project_data/Adani-" + this.Adani_locations[location_name]['name'], { headers })
    //   .then(response => response.json())
    //   .then(datavalue => {
    //     var main_data = datavalue
    //     // // console.log(datavalue)

    //     this.project_id_summary = Object.keys(datavalue)
    //     this.date_inv = Object.values(datavalue[this.project_id_summary])[2]
    //     // // console.log(datavalue)

    //     this.date_inv_status_key = Object.keys(datavalue[this.project_id_summary]["date_status"])
    //     // // alert(datavalue[this.project_id_summary][this.date_inv_status_key[0]]['report_path'])

    //     sessionStorage.setItem("reportPath", datavalue[this.project_id_summary][this.date_inv_status_key[0]]['report_path'])
    //     localStorage.setItem("date", this.date_inv_status_key[0])
    //     this.map.remove()
    //     // main_data[this.project_id_summary]['name']
    //     //  // alert(main_data[this.project_id_summary]['dates'][0])
    //     // localStorage.setItem("date", main_data[this.project_id_summary]['dates'][0])
    //     this._http.setclosesidebar({
    //       close_side_bar: "summarySidebar/True"
    //     });
    //     this._http.setproject_name({
    //       proj_name_val: newName
    //     });
    //     this.accepted = 'false';
    //     this.accepted1 = 'false';

    //     //   const input = document.getElementById("checkbox")
    //     //   input.inngetElementsById('#checkbox-input').checked = false
    //     //   // alert()
    //     //   var x = input.getElementsByClassName("mat-checkbox-ripple")
    //     // //  alert(x)


    //     //   // input.ariaChecked = "false"

    //     //   // // // alert(input)
    //     //   // // var x = document.getElementById('checkbox-input');
    //     //   // var x = $(".checkbox-input").prop("mat-checkbox-input", false)
    //     //   // // x.checked = false
    //     //   // alert(document.getElementsByClassName('mat-checkbox-input cdk-visually-hidden'))
    //     //   // // $('#checkbox').is(':checked');
    //     //   // // alert('Checkbox checked!');
    //     this.ngOnInit();
    //   })


  }

  subdefects_page(latlong) {
    // alert(latlong[0])
    this.map.setView(new L.LatLng(latlong[0], latlong[1]), 22);
  }

  rectification_defect(defect) {
    // this.defect_rectify_visibility = "visible"
    // const dialogRef = this.dialog.open(DefectrectificationComponent);

    // dialogRef.afterClosed().subscribe(result => {
    //   // console.log(`Dialog result: ${result}`);
    // });
    // console.log(this.item);

    // alert("inside")
    // console.log(defect)

  }

}
