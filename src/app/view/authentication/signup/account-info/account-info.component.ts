import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthserviceService } from '../../authservice.service'
import { HttpErrorResponse } from '@angular/common/http';
import { ToastrService } from 'ngx-toastr';
import { Country, State, City } from 'country-state-city';

@Component({
  selector: 'account-info',
  templateUrl: './account-info.component.html',
  styleUrls: ['./account-info.component.css']
})
export class AccountInfoComponent implements OnInit {

  public hide = true;
  public hide2 = true;
  public signupForm: FormGroup;
  public username_verify: FormGroup;
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
  emailid: any;
  uname_verified: any;
  email_verified: any;

  constructor(private router: Router, private autservice: AuthserviceService, private toastr: ToastrService) {
    this.signupForm = new FormGroup({
      organization: new FormControl('', Validators.required),
      fname: new FormControl('', Validators.required),
      lname: new FormControl('', Validators.required),
      uname: new FormControl(''),
      mnum: new FormControl('', Validators.required),
      mail: new FormControl('',),
      country: new FormControl('', Validators.required),
      state: new FormControl('', Validators.required),
      city: new FormControl('', Validators.required),
      pincode: new FormControl('', Validators.required),
      password: new FormControl('', Validators.required),
      cpassword: new FormControl('', Validators.required),
      role: new FormControl('', Validators.required),

    });
    this.username_verify = new FormGroup({
      username: new FormControl('', Validators.required),
      emailid: new FormControl('', Validators.required),
    });
  }

  ngOnInit(): void {
    localStorage.clear();
    this.countries = Country.getAllCountries()
    this.states = State.getAllStates()
    this.cities = City.getAllCities()
    this.country_data = this.countries
  }

  onselectFile(e) {

    if (e.target.files) {
      var reader = new FileReader();
      reader.readAsDataURL(e.target.files[0]);
      reader.onload = (event: any) => {
        // "filename": event.target.files[i].name,
        //   "module": "defects",
        //   "size": event.target.files[i].size,
        //   "url": base64.split("base64,")[1],
        //   "mimetype": event.target.files[i].type,
        //   "extension": event.target.files[i].name.split(".")[1]
        let filename = e.target.files[0].name
        let size = e.target.files[0].size
        let type = e.target.files[0].type
        let extension = e.target.files[0].name.split(".")[1]
        this.url = event.target.result;
        this.base64image = event.target.result;
        this.base64image_split = this.base64image.split('base64,');
        this.autservice.profile_picture(this.base64image_split[1], filename, size, type, extension)

      }
    }

  }
  // throw a error whether form field is valid or invalid
  public hasError = (controlName: string, errorName: string) => {

    return this.signupForm.controls[controlName].hasError(errorName);

  }

  public hasError1 = (controlName: string, errorName: string) => {

    return this.username_verify.controls[controlName].hasError(errorName);

  }

  public goto() {
    this.router.navigate(['auth/login']);
  }
  verify() {
    document.getElementById("verify").setAttribute("disabled","disabled");
    setTimeout(function () {
      document.getElementById("verify").removeAttribute("disabled");
    }, 30000);
    this.uname = (<HTMLInputElement>document.getElementById("username")).value
    this.emailid = (<HTMLInputElement>document.getElementById("emailid")).value
    this.autservice.Username_exist(this.uname).subscribe((data: any) => {
      if (data['success'] == false) {

        this.toastr.error('Username is already taken. Please Choose different username');

      } else if (data['success'] == true) {
        this.uname_verified = data['success']
        let formElement = document.getElementById("username_verify")
        formElement.style.display = "none"
        let formElement1 = document.getElementById("signupform")
        formElement1.style.display = "block";
        let formElement2 = (<HTMLInputElement>document.getElementById("uname"))
        formElement2.disabled = true;
        (<HTMLInputElement>document.getElementById("uname")).value = this.uname
        this.autservice.set_username(this.uname)
      }
    },
    (err: HttpErrorResponse) => {
      if (err.status == 401) {
        this.toastr.error("Login time expired. Please login again.")
        this.gotologin()
      }

      // this.toastr.error("Password Expired. Please set new password.");
      // this.gotoresetpassword()
    })
    this.autservice.Email_exist(this.emailid).subscribe((data: any) => {
      if (data['status'] == false) {

        this.toastr.error('Email ID is already taken. Please Choose different Email ID');

      } else if (data['status'] == true) {
        this.email_verified = data['status']

        let formElement3 = (<HTMLInputElement>document.getElementById("mail"))
        formElement3.disabled = true;
        (<HTMLInputElement>document.getElementById("mail")).value = this.emailid
        this.autservice.set_emailid(this.emailid)
      }
    },
    (err: HttpErrorResponse) => {
      if (err.status == 401) {
        this.toastr.error("Login time expired. Please login again.")
        this.gotologin()
      }

      // this.toastr.error("Password Expired. Please set new password.");
      // this.gotoresetpassword()
    })
    // if (this.uname_verified == true && this.email_verified == true) {
    //   this.changeUI()
    // }
  }
  // changeUI() {

  // }
  gotologin(){
    this.router.navigate(['auth/login'])
   }
  selectChange(countryval) {
    for (var i = 0; i < this.countries.length; i++) {
      if (this.countries[i]["isoCode"] == countryval) {
        var country_name = this.countries[i]["name"]
        sessionStorage.setItem("country", country_name)

      }
    }
    this.states_data = [];
    for (var i = 0; i < this.states.length; i++) {
      if (this.states[i]["countryCode"] == countryval) {
        var cou = this.states[i].length
        this.states_data.push(this.states[i])

      }
    }
    this.countryval_data = countryval
    // this.country_data = this.countries
  }

  selectState(stateval) {
    for (var i = 0; i < this.states_data.length; i++) {
      if (this.states_data[i]["isoCode"] == stateval) {

        var state_name_val = this.states_data[i]["name"]
        sessionStorage.setItem("state", state_name_val)

      }
    }

    this.cities_data = [];
    for (var i = 0; i < this.cities.length; i++) {
      if (this.cities[i]["stateCode"] == stateval && this.cities[i]["countryCode"] == this.countryval_data) {
        this.cities_data.push(this.cities[i])

      }
    }

  }

  selectCity(cityval) {
  }
  signup() {


    if (this.signupForm.valid && this.isValidPassword) {

      document.getElementById("signup").setAttribute("disabled","disabled");
    setTimeout(function () {
      document.getElementById("signup").removeAttribute("disabled");
    }, 30000);
      this.autservice.userauth_signup(this.signupForm.value).subscribe((data: any) => {
        this.goto();

      }, (err: HttpErrorResponse) => {
        this.toastr.error('invalid');

      });
    }
    else {
      this.toastr.error(" form is invalid")
    }
  }

  public checkpassword(event: any) {


    if (this.signupForm.value.password === event.target.value) {
      this.isValidPassword = true;
    }
    else {
      this.isValidPassword = false;
    }

  }

}
