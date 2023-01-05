
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { ToastrService } from 'ngx-toastr';
import { Country, State, City } from 'country-state-city';
import { DashboardComponent } from '../dashboard.component';
import { throwToolbarMixedModesError } from '@angular/material/toolbar';
import { HttpService } from '../../../map-section/services-map/http.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'validation',
  templateUrl: './validation.component.html',
  styleUrls: ['./validation.component.css']
})
export class ValidationComponent implements OnInit {


  public hide = true;
  public hide2 = true;
  public validateForm: FormGroup;
  public verificationform: FormGroup;
  public isValidPassword: boolean = true;
  public countries: any;
  public cities: any;
  public states: any;
  country_data: any;
  states_data: any;
  cities_data: any;
  public countryval_data: any;
  username: any;
  uname: any;
  base64image: any;
  base64image_split: any;
  url = "../../../../assets/images/user_profile.png";
  mnum: any;
  mail: any;
  otp_success: any;
  message: any;
  mailOTP: any;
  mnumOTP: any;
  otp_verify_success: any;
  user_id: any;

  constructor(private _http: HttpService, private router: Router, private toastr: ToastrService, private dashboard: DashboardComponent, private http: HttpClient) {

    this.validateForm = new FormGroup({
      // mnum: new FormControl('', Validators.required),
      mail: new FormControl('',),
    });
    this.verificationform = new FormGroup({
      // mnumOTP: new FormControl('', Validators.required),
      mailOTP: new FormControl('', Validators.required),
    })
  }

  ngOnInit(): void {
    // localStorage.clear();
    this.user_id = localStorage.getItem("user_id")

    this.mail = sessionStorage.getItem("email")
    // console.log(this.mail);

    this.countries = Country.getAllCountries()
    this.states = State.getAllStates()
    this.cities = City.getAllCities()
    this.country_data = this.countries

    // console.log(document.getElementById('email'))
    // console.log(this.states[0])
    // console.log(this.countries[0])
    // alert(this.countries)
    // console.log(this.cities[0])
  }


  validate() {
    // this.mnum = (<HTMLInputElement>document.getElementById("mnum")).value
    // console.log(document.getElementById("validate"))
    // return
    var doc = document.getElementById("validate")
    doc!.setAttribute("disabled","disabled");
    setTimeout(function () {
      doc!.removeAttribute("disabled");
    }, 30000);
    // return
    var data = {
      "user_id": this.user_id,
      "type": "email"
    }
    this.dashboard.Generate_otp(data).subscribe((data: any) => {
      // console.log(data)

      this.message = data['message']
      this.otp_success = data['success']
      if (this.message == "OTP Generated" && this.otp_success == true) {
        this.toastr.success('OTP has Generated. Please check your mail.');
        let formElement = document.getElementById("validateform")
        formElement!.style.display = "none"
        let formElement1 = document.getElementById("verificationform")
        formElement1!.style.display = "block";
      }
    })

    // console.log(this.mnum)
  }
  // throw a error whether form field is valid or invalid
  public hasError = (controlName: string, errorName: string) => {

    return this.validateForm.controls[controlName].hasError(errorName);

  }
  public hasError1 = (controlName: string, errorName: string) => {

    return this.verificationform.controls[controlName].hasError(errorName);

  }

  public goto() {
    this.router.navigate(['auth/login']);
  }
  verification() {
    this.mailOTP = (<HTMLInputElement>document.getElementById("mailOTP")).value
    // this.mnumOTP = (<HTMLInputElement>document.getElementById("mnumOTP")).value
    var doc = document.getElementById("verify")
    doc!.setAttribute("disabled","disabled");
    setTimeout(function () {
      doc!.removeAttribute("disabled");
    }, 30000);
    var data = {
      "user_id": parseInt(this.user_id),
      "type": "email",
      "otp": parseInt(this.mailOTP)
    }
    this.dashboard.OTPemailVerify(data).subscribe((data: any) => {
      // console.log(data)

      this.message = data['message']
      this.otp_verify_success = data['success']
      if (this.otp_verify_success == true && this.message == "OTP verified") {
        this.toastr.success("Email verified successfully please login again.")
        const newtoken = localStorage.getItem("token");

        var httpOptions = {
          headers: { 'Authorization': 'token ' + newtoken }
        };
        this.http.get(environment.api_name + "accounts/logout/" + httpOptions)
        this.router.navigate(['auth/login']);
      }
    })
  }


}
