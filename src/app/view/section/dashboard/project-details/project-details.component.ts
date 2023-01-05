import { Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { MatStepper } from '@angular/material/stepper';
import 'leaflet';
import 'leaflet-kml';
import { environment } from '../../../../../environments/environment';
import { NgxUiLoaderService } from "ngx-ui-loader";
import { Alert } from 'selenium-webdriver';
// import 'leaflet-draw/dist/leaflet.draw-src.js';
declare var require: any
// require('leaflet-side-by-side');
declare const L: any;

var selected_point = new L.LayerGroup();

@Component({
  selector: 'project-details',
  templateUrl: './project-details.component.html',
  styleUrls: ['./project-details.component.css']
})
export class ProjectDetailsComponent implements OnInit {
  @ViewChild('stepper') stepper: MatStepper;

  slideIndex: any;
  slides: any;
  i: any;
  tittle: any;

  public map;
  public base_ortho_layer;
  public ortho_file_location;


  public project_id_summary_length: any;
  public project_id_summary_count: any;

  public project_name0: any;
  public project_location_city0: any;
  public project_location_state0: any;
  public project_location_country0: any;
  public date_summary_count0: any;
  public status0: any;


  public project_name1: any;
  public project_location_city1: any;
  public project_location_state1: any;
  public project_location_country1: any;
  public date_summary_count1: any;
  public status1: any;

  public project_name2: any;
  public project_location_city2: any;
  public project_location_state2: any;
  public project_location_country2: any;
  public date_summary_count2: any;
  public status2: any;

  date: any;


  data = [];
  dataval = [];
  data2 = [];
  public idcount: any;
  public date_summary: any;
  public date_summary_val: any;
  public project_id_summary: any;
  main_data: any;
  main_data_get_all: any;
  progressval: string;
  project_id_summary_alldata: any;
  public center: any;
  j: number;
  new_center: any;
  public lat: any;
  public long: any;
  str: any;
  public workflow_status: any;
  new_stepper_index: any;
  project_name: any;
  public recent_3_projects: any;
  public center_val: any;
  recent_3_projects_name: any;
  recent_3_projects_date: any;
  project_number: any;
  slide_new_Index: void;
  user_id: any;
  project_id: any;


  constructor(private router: Router, private http: HttpClient, private ngxService: NgxUiLoaderService) { }
  ngOnInit(): void {

    
    setTimeout(() => {
      this.ngxService.stop();
    }, 3000)
    // alert("proj det")
    const newtoken = localStorage.getItem("token");
    this.user_id = localStorage.getItem("user_id")

    const newName = localStorage.getItem("name");
    const headers = { 'Authorization': 'Bearer ' + newtoken }

console.log(environment.api_name + 'api/project/get_all?filter={"count":"3"}', { headers })
    // fetch(environment.api_name+'api/project/get_all/1/?filter={"count":""}', { headers })
    fetch(environment.api_name + 'api/project/get_all?filter={"count":"3"}', { headers })
      .then(response => response.json())
      .then(data => {
        this.main_data = data['data']
        // console.log("-------------------------------------------")
        // console.log(this.main_data.length)
        // console.log("-------------------------------------------")
        this.project_id_summary_count = Object.keys(data['data'])
        this.project_id_summary_length = this.project_id_summary_count.length
        this.recent_3_projects = [];
        // console.log(this.project_id_summary_count);
        // console.log(this.project_id_summary_count.length);

        for (var g = 0; g < this.project_id_summary_length; g++) {

          let date_key = Object.keys(this.main_data[g]['date_status']).reverse()
          let status_key = Object.values(this.main_data[g]['date_status']).reverse()
          // console.log("---"+this.main_data[g]['processed_data'][this.main_data[g]['processed_data'].length-1]["status"])
          // this.recent_3_projects.push({ "name": this.main_data[g]['name'], "date": this.main_data[g]['date'], "city": this.main_data[g]['city'], "status": this.main_data[g]['status'] })
          // this.recent_3_projects.push({ "name": this.main_data[g]['name'], "date": this.main_data[g]['processed_data'][0]['date'], "city": this.main_data[g]['city'], "status": this.main_data[g]['status'] })
          this.recent_3_projects.push({ "name": this.main_data[g]['name'], "project_id": this.main_data[g]['id'], "date": date_key, "city": this.main_data[g]['city'], "status": status_key})
        }
        // console.log(this.recent_3_projects)

        this.center = [];
        this.recent_3_projects_name = this.recent_3_projects[0].name
        this.recent_3_projects_date = this.recent_3_projects[0].date[0]
        this.project_number = "01"
        localStorage.setItem("slide_index", "1");

        this.project_name = this.main_data[0]['name']
        var project_name_new = this.main_data[0]['name']
        this.center_val = this.main_data[0]['center']
        this.project_id = this.recent_3_projects[0]['project_id']
        localStorage.setItem("proj_name", project_name_new);
        localStorage.setItem("project_id", this.project_id);

        this.workflow_status = this.recent_3_projects[0].status[0]

        if (this.workflow_status == "created") {
          this.new_stepper_index = 1
          for (var s = 0; s < this.new_stepper_index; s++) {
            this.stepper.selectedIndex = s;

          }
        }
        if (this.workflow_status == "ftp") {
          this.new_stepper_index = 2
          for (var s = 0; s < this.new_stepper_index; s++) {
            this.stepper.selectedIndex = s;

          }
        }
        if (this.workflow_status == "processing") {
          this.new_stepper_index = 3
          for (var s = 0; s < this.new_stepper_index; s++) {
            this.stepper.selectedIndex = s;

          }
        }
        if (this.workflow_status == "completed") {
          this.new_stepper_index = 4
          for (var s = 0; s < this.new_stepper_index; s++) {
            this.stepper.selectedIndex = s;

          }
        }
      })


  }

  Clickable_recent3(i, project_name, project_date, project_city, project_status) {
    this.slideIndex = i + 1
    this.showSlides(this.slideIndex);
  }
  plusSlides(n) {
    this.slideIndex = parseInt(localStorage.getItem("slide_index")) + n
    this.showSlides(this.slideIndex);

  }
  showSlides(n) {

    this.stepper.reset()
    this.slides = document.getElementsByClassName("project-card");
    // alert(this.slides.length)

    if (n > this.project_id_summary_length) { this.slideIndex = 1 }
    if (n < 1) { this.slideIndex = this.project_id_summary_length }
    this.slide_new_Index = localStorage.setItem("slide_index", this.slideIndex);


    var project_name_new = this.main_data[this.slideIndex - 1]['name']
    // alert(this.main_data[this.slideIndex - 1]['center'])
    this.center_val = this.main_data[this.slideIndex - 1]['center']
    this.project_name = this.main_data[this.slideIndex - 1]['name']
    // alert(this.slideIndex - 1)
    this.project_id = this.recent_3_projects[this.slideIndex - 1]['project_id']
    localStorage.setItem("project_id", this.project_id);
    this.recent_3_projects_name = this.recent_3_projects[this.slideIndex - 1].name
    this.recent_3_projects_date = this.recent_3_projects[this.slideIndex - 1].date[0]
    this.project_number = "0" + this.slideIndex



    this.workflow_status = this.recent_3_projects[this.slideIndex - 1]['status'][0]
    if (this.workflow_status == "created") {
      this.new_stepper_index = 1
      for (var s = 0; s < this.new_stepper_index; s++) {
        // alert(s)
        this.stepper.selectedIndex = s;

      }
    }
    if (this.workflow_status == "ftp") {
      this.new_stepper_index = 2
      for (var s = 0; s < this.new_stepper_index; s++) {
        // alert(s)
        this.stepper.selectedIndex = s;

      }
    }
    if (this.workflow_status == "processing") {
      this.new_stepper_index = 3
      for (var s = 0; s < this.new_stepper_index; s++) {
        // alert(s)
        this.stepper.selectedIndex = s;

      }
    }
    if (this.workflow_status == "completed") {
      this.new_stepper_index = 4
      for (var s = 0; s < this.new_stepper_index; s++) {
        // alert(s)
        this.stepper.selectedIndex = s;

      }
    }

    // this.stepper.selectedIndex = this.new_stepper_index;

  }




  public gotomap() {
    // alert(this.recent_3_projects_date)
    localStorage.setItem("date", this.recent_3_projects_date);
    localStorage.setItem("center", this.center_val);
    this.router.navigate(['map'])
  }
  public gotoAnalytics() {
    localStorage.setItem("date", this.recent_3_projects_date);
    this.router.navigate(['app/analytics'])
  }

}