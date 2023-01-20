import { Component, OnInit } from '@angular/core';
import { mapsection, mapsectionC } from '../map-section'
import { FormBuilder, FormControl } from '@angular/forms';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { environment } from 'src/environments/environment';
import { HttpService } from '../services-map/http.service'
import { HttpClient, HttpHeaders } from '@angular/common/http';


@Component({
  selector: 'raw-image',
  templateUrl: './raw-image.component.html',
  styleUrls: ['./raw-image.component.css']
})
export class RawImageComponent implements OnInit {
  mission: string = "";
  flight: string = "";
  maindata: any[] = [];
  mission_data: any[] = []
  flight_data: any[] = [];

  constructor(private _http: HttpService, private formBuilder: FormBuilder) { }

  ngOnInit(): void {
    alert()
    let project_id = localStorage.getItem("project_id");
    let date = localStorage.getItem("date");

    const newtoken = localStorage.getItem("token");
    const headers = {
    'Content-Type': 'application/json',
    'Authorization': 'Bearer ' + newtoken,
    };

    this.maindata = this._http.get_mision_flight_detail()
    this.mission_data = Object.keys(this.maindata).sort()
// console.log(this.maindata)
    // var url = environment.api_name + 'project/get_missions_flights/' + project_id + '/' + date
    // fetch(url, { headers })
    //   .then(response => response.json())
    //   .then(datavalue => {
    //     this.maindata = datavalue['data']
    //     // console.log(datavalue['data'])
    //     // if(datavalue['data'] == null){
    //     //   alert("there is no Raw image for this project.")
    //     //   this.onNoClick()
    //     // }else{
    //       this.mission_data = Object.keys(datavalue['data'])
    //     // }
    //     // // console.log(this.mission_data)

    //   })
  }
  find_flight(mission) {
    // alert(mission)
    // // console.log(this.maindata[mission].sort())
    if (mission == "All") {
      // this.flight_data = this.maindata['M1']
      this.flight = "All"
    } else {
      this.flight_data = this.maindata[mission].sort()
      // this.flight = this.flight_data[0]
      // document.getElementById("flight").innerHTML = ""

    }
  }
  submit_details() {
    // // console.log(this.mission, this.flight);
    // alert(this.mission)
    if (this.mission == "All" || this.mission == "") {
      this.mission = ""
      this.flight = ""
    }
    let data = {
      "mission": this.mission,
      "flight": this.flight
    }
    this._http.setmissiondata(data)

  }
  onNoClick() {

    // https://asset.datasee.ai/Carnot_BE/carnot/project/get_thermal_assets/163?filter={%22date%22:%202022-05-09,%22mission%22:M1,%22flight%22:F1}
    // http://localhost:8000/carnot/project/get_thermal_assets/163?filter={"date":"2022-06-01", "mission":"M1","flight":"F1"}

  }
}

