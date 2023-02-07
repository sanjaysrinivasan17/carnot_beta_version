import { HttpClient, HttpClientModule, HttpHandler, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AuthserviceService {

  profile_pic: any;
  username: any;
  filename: any;
  size: any;
  type: any;
  extension: any;
  emailid: any;


  constructor(private http: HttpClient) { }

  userauth(username, password, captcha) {
    var data = { "username": username, "password": password,"recaptcha": captcha}

    return this.http.post(environment.api_name + 'api/accounts/login/', data)
    // return this.http.post(environment.api_name+'users/login/', data)

  }
  Username_exist(username) {
    // var data = { "name": organization }

    return this.http.get(environment.api_name + 'api/accounts/is_username?query=' + username)

  }
  Email_exist(email) {
    // var data = { "name": organization }

    return this.http.get(environment.api_name + 'api/accounts/is_email?query=' + email)

  }
  profile_picture(profile_pic,filename,size,type,extension) {
    this.profile_pic = profile_pic
    this.filename = filename
    this.size = size
    this.type = type
    this.extension = extension
  }
  set_username(username) {
    this.username = username
  }
  set_emailid(email) {
    this.emailid = email
  }
  userauth_signup(values: any) {
    var country = sessionStorage.getItem('country')
    var state = sessionStorage.getItem('state')
    var city = sessionStorage.getItem('city')


    var signup_data = {

      "username": this.username,
      "firstname": values.fname,
      "lastname": values.lname,
      "password": values.password,
      "email": this.emailid,
      "contact": values.mnum,
      "organization": values.organization,
      "country": country,
      "state": state,
      "city": values.city,
      "pincode": values.pincode,
      "role":values.role,
      "image": "",
      "mimetype": "",
      "extension": "",
      "size": "",
      "filename": ""
  }
    return this.http.post(environment.api_name + 'api/accounts/user/', signup_data)
    // return this.http.post(environment.api_name+'users/create/', signup_data)
  }


}
