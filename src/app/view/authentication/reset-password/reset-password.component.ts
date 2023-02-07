import { HttpClient, HttpClientModule, HttpHandler, HttpHeaders } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { HttpErrorResponse } from '@angular/common/http';
import { environment } from '../../../../environments/environment';
import { ToastrService } from 'ngx-toastr';


@Component({
  selector: 'app-reset-password',
  templateUrl: './reset-password.component.html',
  styleUrls: ['./reset-password.component.css']
})
export class ResetPasswordComponent implements OnInit {
  public loginForm: FormGroup;

  constructor(private router: Router,private http: HttpClient, private toastr: ToastrService) {
    this.loginForm = new FormGroup({
      username: new FormControl('', [Validators.required]),
      mail: new FormControl('', [Validators.required, Validators.email,Validators.pattern('[a-z0-9.]+@[a-z]+\.[a-z]{2,3}')])
      // mail: new FormControl('', [Validators.required, Validators.email,Validators.pattern('^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$')])
      // password: new FormControl('', Validators.required)
    });
  }

  ngOnInit(): void {
  }
  gotologin(){
    this.router.navigate(['auth/login'])
  }
  Resetpassword(mail){
    var data = {
      "email": mail
      // "username":username
    }
    this.http.post(environment.api_name+'api/accounts/generate_link/', data).subscribe(data => {
      if(data['success'] == true){
        this.toastr.success('Please check mail for recovery password link');
        this.router.navigate(['auth/login/'])
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
// alert(mail)
  }
}
