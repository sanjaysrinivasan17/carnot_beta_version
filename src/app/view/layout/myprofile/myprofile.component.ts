import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Country, State, City } from 'country-state-city';
import { environment } from 'src/environments/environment';
import { HttpService } from "../../map-section/services-map/http.service";
import { HttpClient, HttpHeaders } from '@angular/common/http';

// import {} from '../../../../assets/images/user_profile.png'


@Component({
  selector: 'app-myprofile',
  templateUrl: './myprofile.component.html',
  styleUrls: ['./myprofile.component.css']
})
export class MyprofileComponent implements OnInit {
  public profileForm: FormGroup;
  public base64image: any;
  country_name: any;
  state_name: any;
  city_name: any;
  postId: any;
  public countries: any;
  public cities: any;
  public states: any;
  country_data: any;
  states_data: any;
  cities_data: any;
  public countryval_data: any;
  base64image_split: any;
  image: string;
  main_data: any;
  fname: any;
  lname: any;
  uname: any;
  mnum: any;
  mail: any;
  pincode: any;
  country: any;
  state: any;
  city: any;
  myprofiledetails: any[];
  success: any;
  ngxService: any;
  putId: Object;
  companyname: any;


  constructor(private router: Router,  private http: HttpClient, private _http: HttpService) {
    this.profileForm = new FormGroup({

      fname: new FormControl('', Validators.required),
      lname: new FormControl('', Validators.required),
      uname: new FormControl('', Validators.required),
      mnum: new FormControl('', Validators.required),
      mail: new FormControl('', Validators.required),
      country: new FormControl('', Validators.required),
      state: new FormControl('', Validators.required),
      city: new FormControl('', Validators.required),
      pincode: new FormControl('', Validators.required),
      companyname: new FormControl('', Validators.required),

    });
  }

  ngOnInit(): void {

    this.countries = Country.getAllCountries()
    this.states = State.getAllStates()
    this.cities = City.getAllCities()
    this.country_data = this.countries
    // // console.log(this.states)
    // // console.log(this.countries)
    // alert(this.countries)
    // // console.log(this.cities)


    document.getElementById("uploadBtn").onmouseover = function () { mouseOver() };
    document.getElementById("uploadBtn").onmouseout = function () { mouseOut() };

    function mouseOver() {
      document.getElementById("uploadBtn").style.color = "white";
    }

    function mouseOut() {
      document.getElementById("uploadBtn").style.color = "black";
    }
    // // console.log(this.base64image)
    if (this.base64image == undefined) {
      this.url = "../../../../assets/images/user_profile.png";
    }

    const newtoken = localStorage.getItem("token");
    const user_id = localStorage.getItem("user_id");

    const headers = { 'Authorization': 'Bearer ' + newtoken }
    fetch(environment.api_name + 'api/accounts/user/'+user_id, { headers })
      .then(response => response.json())
      .then(datavalue => {
        this.main_data = datavalue
        // console.log(this.main_data)
        this.fname = this.main_data['first_name'];
        this.lname = this.main_data['last_name'];
        this.uname = this.main_data['username'];
        this.mnum = this.main_data['contact'];
        this.mail = this.main_data['email'];
        this.companyname = this.main_data['company']['name']
        // console.log(this.companyname)
        this.pincode = this.main_data['pincode'];
        var country_val = this.main_data['country']
        var state_val = this.main_data['state']
        var cities_val = this.main_data['city']
        for (let c = 0; c < this.countries.length; c++) {
          if (country_val === this.countries[c].name) {
            this.country = this.countries[c]
            this.selectChange(this.country.isoCode) 
          }
        }
        for (let d = 0; d < this.states.length; d++) {
          // if(state_val === this.states[d].name){
          if (this.states[d]["countryCode"] == this.country.isoCode) {
            if (state_val == this.states[d].name) {
              this.state = this.states[d]
              // // console.log(this.state)
            }
          }
        }
        for (let e = 0; e < this.cities.length; e++) {
          if (this.cities[e]["stateCode"] == this.state.isoCode && this.cities[e]["countryCode"] == this.country.isoCode) {
            if (cities_val === this.cities[e].name) {
              this.city = this.cities[e]
              // // console.log(this.city)
              this.selectState(this.state.isoCode)
            }
          }
        }


        // return hero.category.toLowerCase().includes(this.tab_name.toLowerCase());

        // // console.log(Thermography_project)


      })

  }
  saveDetails() {

    // console.log((<HTMLInputElement>document.getElementById("uname")).value)
    // console.log((<HTMLInputElement>document.getElementById("fname")).value)

    var uname = (<HTMLInputElement>document.getElementById("uname")).value
    var fname = (<HTMLInputElement>document.getElementById("fname")).value
    var lname = (<HTMLInputElement>document.getElementById("lname")).value
    var mnum = (<HTMLInputElement>document.getElementById("mnum")).value
    var mail = (<HTMLInputElement>document.getElementById("mail")).value
    
    // saveDetails(fname, lname, uname, mnum, mail) {
    // // console.log(fname," ---",mail)
    this.myprofiledetails = [];

    
    const user_id = localStorage.getItem("user_id");
    var put_url = (environment.api_name + "api/accounts/user/"+user_id)
    // console.log(put_url)
    const newtoken = localStorage.getItem("token");

    var userdata = {
      "username": uname,
      "first_name": fname,
      "last_name": lname,
      "mobile_number": mnum,
      "email": mail
    }
    // console.log(userdata)
    // return
    var httpOptions = {


      headers: { 'Authorization': 'Bearer ' + newtoken }
    };
    this.http.put(put_url, userdata, httpOptions).subscribe(data => {
      this.putId = data;
      this.success = data["status"]
  
      alert(this.success)
  
      if (this.success == 'success') {
  
        setTimeout(() => {
          this.ngxService.stop();
        }, 2100)
        location.reload();
      }
    })
  }

 


  selectChange(countryval) {
    // alert("inside"+countryval)
    // // // console.log(this.states)
    // alert(this.states.length)
    this.states_data = [];
    for (var i = 0; i < this.states.length; i++) {
      if (this.states[i]["countryCode"] == countryval) {
        var cou = this.states[i].length
        this.states_data.push(this.states[i])
        // // console.log(this.states_data)

      }
    }
    this.countryval_data = countryval
    // alert("inside" + cou)
    // this.country_data = this.countries
  }

  selectState(stateval) {
    // alert(stateval+"-----"+this.countryval_data)
    // // // console.log(this.cities)
    this.cities_data = [];
    for (var i = 0; i < this.cities.length; i++) {
      if (this.cities[i]["stateCode"] == stateval && this.cities[i]["countryCode"] == this.countryval_data) {
        this.cities_data.push(this.cities[i])
        // // console.log(this.cities_data)

      }
    }

  }

  selectCity(cityval) {
    // alert(cityval)
  }


  url = "./assets/images/unnamed.png";
  onselectFile(e) {
    if (e.target.files) {
      var reader = new FileReader();
      reader.readAsDataURL(e.target.files[0]);
      reader.onload = (event: any) => {
        this.url = event.target.result;
        this.base64image = event.target.result;
        // // console.log(this.base64image)
        this.base64image_split = this.base64image.split('base64,');
        // // // console.log(this.base64image_split[1])

      }
    }

  }

  public gotodashboard() {
    this.router.navigate(['app/home'])
  }

}

// const imgDiv = document.querySelector('profile-pic-div');
// const img = document.querySelector('#photo');
// const file = document.querySelector('#file');
// const uploadBtn = document.querySelector
// ('#uploadBtn');

// imgDiv.addEventListener('mouseenter', function()
// {
//   uploadBtn.style.display = "block";

// });
// imgDiv.addEventListener('mouseleave', function()
// {
//   uploadBtn.style.display = "none";

// });


