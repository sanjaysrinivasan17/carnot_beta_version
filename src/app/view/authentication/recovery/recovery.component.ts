import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from "@angular/router";
import { environment } from '../../../../environments/environment';
import { ToastrService } from 'ngx-toastr';
import { HttpClient, HttpClientModule, HttpHandler, HttpHeaders } from '@angular/common/http';

@Component({
  selector: 'app-recovery',
  templateUrl: './recovery.component.html',
  styleUrls: ['./recovery.component.css']
})
export class RecoveryComponent implements OnInit {
  public loginForm: FormGroup;
  public hide1 = true;
  public hide2 = true;
  uid: any;
  token: any;
  constructor(private router: Router, private route: ActivatedRoute, private http: HttpClient, private toastr: ToastrService) {
    this.loginForm = new FormGroup({
      // mail: new FormControl('', [Validators.required, Validators.email,Validators.pattern('^[a-z0-9._%+-]+@gmail+\\.[a-z]{2,4}$')]),
      // mail: new FormControl('', [Validators.required, Validators.email,Validators.pattern('^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$')])
      password1: new FormControl('', Validators.required),
      password2: new FormControl('', Validators.required)

    });
  }

  ngOnInit(): void {
    this.uid = this.route.snapshot.paramMap.get("uid")
    this.token = this.route.snapshot.paramMap.get("token")

  }

  // throw a error whether form field is valid or invalid
  public hasError = (controlName: string, errorName: string) => {
    return this.loginForm.controls[controlName].hasError(errorName);
  }
  // gotologin(){
  //   this.router.navigate(['auth/login'])
  // }
  Resetpassword(password1, password2) {
    // alert(password1)
    var data = {
      "uid": this.uid,
      "token": this.token,
      "password": password1
    }
    this.http.post(environment.api_name + 'api/accounts/reset_password/', data).subscribe(data => {
      // console.log(data)
      if (data['success'] == true) {
        this.toastr.success('Password updated successfully');
        this.router.navigate(['auth/login/'])
      }
    })
  }
}
