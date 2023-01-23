import { HttpErrorResponse } from '@angular/common/http';
import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { AuthserviceService } from '../authservice.service';
import { HttpService } from "../../map-section/services-map/http.service"
import { ReCaptcha2Component } from 'ngx-captcha';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  protected aFormGroup: FormGroup;
  @ViewChild('captchaElem') captchaElem: ReCaptcha2Component;
  @ViewChild('langInput') langInput: ElementRef;
  public hide = true;
  token: any;
  public captchaIsLoaded = false;
  public captchaSuccess = false;
  public captchaIsExpired = false;
  public captchaResponse?: string;

  public theme: 'light' | 'dark' = 'light';
  public size: 'compact' | 'normal' = 'normal';
  public lang = 'en';
  public type: 'image' | 'audio';

  public loginForm: FormGroup;
  captcha: string;

  constructor(private autservice: AuthserviceService, private router: Router, private toastr: ToastrService, private formBuilder: FormBuilder) {
    this.captcha = '';
    this.loginForm = new FormGroup({
      username: new FormControl('', Validators.required),
      password: new FormControl('', Validators.required),
      recaptcha: new FormControl('', Validators.required)
    });
  }

  ngOnInit(): void {
    // if (localStorage['token'] == undefined) {

    localStorage.clear();
    // }
  }
  resolved(captchaResponse: string) {
    // this.captcha = captchaResponse;
  }
  handleSuccess(data) {
    // console.log(data);
    this.captcha = data
  }

  login(UserName, Password) {
    // // console.log(username,password)
    // // console.log('resolved captcha with response: ' + this.captcha);
    if (this.captcha) {
      document.getElementById("login").setAttribute("disabled","disabled");
    setTimeout(function () {
      document.getElementById("login").removeAttribute("disabled");
    }, 30000);
      this.autservice.userauth(UserName, Password,this.captcha).subscribe((data: any) => {
        // // console.log(data)
        // alert("wait"+data['privilege'])

        if (UserName == 'vendor') {
          this.router.navigate(['/vendor'])
        }

        if (data['status'] === "failure") {
          this.toastr.error('Invalid email or password');
        }

        // else if (data['login'] === false){
        //   this.toastr.error('Your Password has expired');
        //   this.gotoresetpassword()
        // }
        else {
          // alert(data['token'] ) firstname: "PD", lastname:
          // console.log(data)
          // console.log(data['token'])
          localStorage.setItem("login", data['login']);
          localStorage.setItem("redirect", data['redirect']);
          localStorage.setItem("token", data['token']);
          sessionStorage.setItem("email", data['email']);
          localStorage.setItem("firstname", data['first_name']);
          localStorage.setItem("lastname", data['last_name']);
          localStorage.setItem("privilege", data['role']);
          localStorage.setItem("user_id", data['id']);
          localStorage.setItem("message", data['message']);
          this.token = data['token']
          this.toastr.success('Logged in Sucessfully');
          this.router.navigate(['app/home'])
        }


      },
      (err: HttpErrorResponse) => {
        // console.log(err.status);
        if (err.status == 500) {
          this.toastr.error("Something went wrong")

        } else if (err.status == 404) {
          this.toastr.error("Something went wrong")
        } else if (err.status == 200) {
          this.toastr.error("Password Expired. Please set new password.")
          this.gotoresetpassword()
        }

        // this.toastr.error("Password Expired. Please set new password.");
        // this.gotoresetpassword()
      });
    }else{
      alert("please authorize captcha")
    }
  }

  // throw a error whether form field is valid or invalid
  public hasError = (controlName: string, errorName: string) => {
    return this.loginForm.controls[controlName].hasError(errorName);
  }

  public resetPassword() {

    // this.router.navigate(['auth/update-credentials']) ;
  }
  public gotoSignup() {
    // // alert("inside")
    this.router.navigate(['auth/signup'])
  }

  public gotoresetpassword() {
    this.router.navigate(['auth/resetpassword'])
  }


}
