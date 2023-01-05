import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { Router } from '@angular/router';
import { NavbarComponent } from '../navbar/navbar.component';
import { MatDialog } from '@angular/material/dialog';
import { FormBuilder, FormControl } from '@angular/forms';
import { HttpService } from "../../map-section/services-map/http.service";
import { AdduserComponent } from '../adduser/adduser.component';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from 'src/environments/environment';


@Component({
  selector: 'app-manageuser',
  templateUrl: './manageuser.component.html',
  styleUrls: ['./manageuser.component.css']
})
export class ManageuserComponent implements OnInit {
  @Output() toggleSidebar: EventEmitter<true> = new EventEmitter();
  public lastname: any;
  public firstname: any;
  public firstletter: any;
  public user: any = [];
  Adduser: any;
  adduseraddedfname: any;
  adduseraddedlname: any;
  main_data: any;
  total_sub_user_account: any;
  public privilege: any;
  ngxService: any;
  success: any;
  putId: any;
  isactive: any;
  constructor(private _http: HttpService, private http: HttpClient, public dialog: MatDialog, private router: Router) { }

  ngOnInit(): void {
    this.total_sub_user_account = [];
    this.firstname = localStorage.getItem("firstname");
    this.lastname = localStorage.getItem("lastname");
    this.privilege = localStorage.getItem("privilege");
    // alert(this.privilege)
    this.firstletter = this.firstname.substring(0, 1)
    this.show_user()
    const newtoken = localStorage.getItem("token");

    const headers = { 'Authorization': 'Bearer ' + newtoken }
    const user_id = localStorage.getItem("user_id");

    // fetch(environment.api_name + "api/accounts/manage_users/" + user_id, { headers })
    //   .then(response => response.json())
    //   .then(datavalue => {
    //     this.user = datavalue['data']
    //     // console.log(this.user)
    //     // this.user = [];
    //     for (var i = 0; i < this.user.length; i++) {
    //       // alert(this.user.length)
    //       this.total_sub_user_account = this.user.length
    //     }
        //   var Created = this.main_data[i]["Created"]
        //   var d = new Date(Created),
        //     month = '' + (d.getMonth() + 1),
        //     day = '' + d.getDate(),
        //     year = d.getFullYear();

        //   if ((d.getMonth() + 1) < 10) {
        //     month = "0" + month
        //   } else if ((d.getMonth() + 1) >= 9) {
        //     month = month
        //   }
        //   if ((d.getDate()) < 10) {
        //     day = "0" + day
        //   } else if ((d.getDate()) >= 9) {
        //     day = day
        //   }
        //   var Created_date = year + "-" + month + "-" + day;
        //   this.user.push({ "id": i, "username": this.main_data[i]["Username"], "fullname": this.main_data[i]["Full name"], "email": this.main_data[i]["E mail"], "date": Created_date })
        // 
        // console.log(this.user)
      // })


    // this._http.getNewadduser().subscribe(info => {
    //   this.Adduser = info;
    //   // console.log(this.Adduser.userdetailsfname+"----"+this.Adduser.userdetailslname)

    //   this.user = [];
    //   this.firstname = localStorage.getItem("firstname");
    //   this.lastname = localStorage.getItem("lastname");
    //   this.firstletter = this.firstname.substring(0, 1)
    //   this.user = [{ "id": "1", "username": "sanjay", "fullname": "sanjay", "email": "san@gm.com", "date": "24-10-2021", "number": "9786543213" }, { "id": "2", "username": "sandhya", "fullname": "sandhya", "email": "sand@gm.com", "date": "24-12-2021", "number": "9786588213" }]
    //   // this.user = [{"id":"1","username":"sanjay","fullname":"sanjay","email":"san@gm.com","date":"24-10-2021","number":"9786543213"},{"id":"2","username":"sandhya","fullname":"sandhya","email":"sand@gm.com","date":"24-12-2021","number":"9786588213"}]
    // })
  }

  add_user() {
    const dialogRef = this.dialog.open(AdduserComponent);
    dialogRef.afterClosed().subscribe(result => {
      this.show_user()
      
    })
  }

  show_user() {
    const newtoken = localStorage.getItem("token");
    const headers = { 'Authorization': 'Bearer ' + newtoken }
    const user_id = localStorage.getItem("user_id");
    fetch(environment.api_name + "api/accounts/manage_users/" + user_id, { headers })
      .then(response => response.json())
      .then(datavalue => {
        var user_data = datavalue['data']
        var count_user = 0
        for (let i = 0; i < user_data.length; i++) {
          console.log(user_data[i]['is_active'])
          if(user_data[i]['is_active'] == true){
            this.user.push(user_data[i])
            count_user = count_user + 1
          }
        }
        this.total_sub_user_account = count_user
      });
  }

  logout() {
    // alert(localStorage['token'])
    localStorage.clear();
    // alert(localStorage['token'])
    if (localStorage['token'] == undefined) {
      this.router.navigate(["/auth/login"])
    }
  }
  delete_user(sub_user_id) {
    // alert(sub_user_id)
    const newtoken = localStorage.getItem("token");
    const user_id = localStorage.getItem("user_id");
    var put_url = environment.api_name + "api/accounts/delete_user/"
    var data = {
      "id": sub_user_id,
      "user_id": parseInt(user_id)
    }
    var httpOptions = {
      headers: { 'Authorization': 'Bearer ' + newtoken }
    };
    this.http.put(put_url, data, httpOptions).subscribe(data => {
      console.log(data)

      this.putId = data;

      this.success = data["status"]

      // alert(this.success)

      if (this.success == 'success') {
        this.user = []
        setTimeout(() => {
          this.ngxService.stop();
        }, 2100)
        // this.router.navigate(['app/manageuser'])
        this.show_user();
      }
    })


    // this._http.setNewadduser({
    //   userdetailsfname: fname,
    //   userdetailslname: lname,
    //   userdetailsuname: uname,
    //   userdetailsmnum: mnum,
    //   userdetailsemail: email,
    //   userdetailspwd: pwd,
    // });

  }

  
  public openSidebar() {
    this.toggleSidebar.emit();
  }
  public gotomyprofile() {
    this.router.navigate(['app/myprofile'])
  }
  public gotomanageuser() {
    this.router.navigate(['app/manageuser'])
  }
}


