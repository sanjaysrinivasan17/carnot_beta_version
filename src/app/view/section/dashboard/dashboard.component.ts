import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { HttpService } from "../../map-section/services-map/http.service";
import { environment } from '../../../../environments/environment';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { NgxUiLoaderService } from "ngx-ui-loader";
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  main_data: any;
  project_id_summary_count: any;
  project_id_summary_length: any;
  recent_3_projects: any;
  items: any;
  login: any;
  redirect: any;
  public loginForm: FormGroup;
  message: any;
  user_id: any;


  constructor(private _http: HttpService, private router: Router, private ngxService: NgxUiLoaderService, private http: HttpClient) {
    this.ngxService.start();
    this.loginForm = new FormGroup({
      mobilno: new FormControl('', Validators.required),
      email: new FormControl('', Validators.required)
    });
  }

  ngOnInit(): void {
    this.login = localStorage.getItem("login");
    this.redirect = localStorage.getItem("redirect");
    const newtoken = localStorage.getItem("token");
    this.message = localStorage.getItem("message")
    const newName = localStorage.getItem("name");
    this.user_id = localStorage.getItem("user_id");
    const headers = { 'Authorization': 'Bearer ' + newtoken }
    this._http.setNewMapIcon({
      dateval: "dashboard"
    });

    fetch(environment.api_name + 'api/project/get_all?filter={"count":"3"}', { headers })
      .then(response => response.json())
      .then(data => {
        this.main_data = data['data']
        // // console.log("-------------------------------------------")
        // // console.log(this.main_data.length)
        // // console.log("-------------------------------------------")
        this.project_id_summary_count = Object.keys(data['data'])
        // alert("project_id_summary_count---"+this.project_id_summary_count)

        this.project_id_summary_length = this.project_id_summary_count.length
        //  alert(this.project_id_summary_length)
        // for (this.i = 0; this.i < this.project_id_summary.length; this.i++) {

        this.recent_3_projects = [];
        for (var g = 0; g < this.project_id_summary_length; g++) {
          this.recent_3_projects.push({ "name": this.main_data[g]['name'], "date": this.main_data[g]['date'], "city": this.main_data[g]['city'], "status": this.main_data[g]['status'] })
          // this.recent_3_projects.push(this.main_data[g]['name'],this.main_data[g]['date'],this.main_data[g]['city'])
        }
      })
    setTimeout(() => {
    this.ngxService.stop();
    }, 3000)

  }
  public hasError = (controlName: string, errorName: string) => {

    return this.loginForm.controls[controlName].hasError(errorName);

  }
  public gotocreateproject() {
    this.router.navigate(['app/project/create'])
  }
  generateOtp(mobileno: any, email: any) {
    // alert(email + mobileno)
  }

  Generate_otp(data: any) {
    // var data = { "name": organization }
    const newtoken = localStorage.getItem("token");

    var httpOptions = {
      headers: { 'Authorization': 'Bearer ' + newtoken }
    };

    // return this.http.post(environment.api_name + 'api/accounts/generate_otp/', data)
    return this.http.post(environment.api_name + 'api/accounts/generate_otp/', data, httpOptions)

  }

  OTPemailVerify(data: any) {
    // var data = { "name": organization }
    const newtoken = localStorage.getItem("token");

    var httpOptions = {
      headers: { 'Authorization': 'Bearer ' + newtoken }
    };
    
    return this.http.post(environment.api_name + 'api/accounts/verify_otp/', data, httpOptions)

  }

}
