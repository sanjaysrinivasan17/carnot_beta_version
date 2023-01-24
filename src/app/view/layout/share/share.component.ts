import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { environment } from '../../../../environments/environment';
import { FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-share',
  templateUrl: './share.component.html',
  styleUrls: ['./share.component.css']
})
export class ShareComponent implements OnInit {
  main_data: any;
  project_id_summary: any[];
  project_id_summary_val: any;
  shared_array: any;
  created_by: any;
  user_id: any;
  project_name: any;
  public user: any = [];
  shared_to: any;
  shared_to_data: unknown[];
  public project_id: any;
  postId: Object;
  success: any;
  ngxService: any;
  shared_account_count: any;
  user_data = new FormControl('');
  projname: any;
  list: any;
  public Role_mapping: FormGroup;

  user_val: any;
  Yet_to_share_profile_list: any;
  post_id: Object;
  user_arr: any;
  roles: any = [];

  constructor(private http: HttpClient, private router: Router, private toastr: ToastrService) {

    this.Role_mapping = new FormGroup({
      user_data: new FormControl('', Validators.required),
    });
  }

  ngOnInit(): void {

    // alert(this.projname)
    sessionStorage.setItem("shareComponent", "open");

    this.user_id = localStorage.getItem("id");
    this.project_name = localStorage.getItem("project_name");

    const token = localStorage.getItem("token");
    const headers = {
      'Authorization': `Bearer ${token}`,
      'Content-Type': 'application/json',
    };

    fetch(`${environment.api_name}project/get_projects_status/`, {
      method: 'GET',
      headers,
      credentials: 'omit'
    })
      .then(response => response.json())
      .then(datavalue => {
        this.main_data = datavalue
        // // console.log(this.main_data)
        this.shared_to = []
        this.project_id_summary = Object.keys(datavalue)
        // // console.log(this.project_id_summary.length)
        // for (var i = 0; i < this.project_id_summary.length; i++) {
        // alert("---name ---"+this.project_id_summary[1])
        // // // console.log("---------------------------------------------"+this.id)
        this.project_id_summary_val = this.project_id_summary[this.user_id]
        this.project_id = this.main_data[this.project_id_summary_val]['id']
        this.shared_array = this.main_data[this.project_id_summary_val]['shared']
        // // console.log(this.shared_array)

        this.created_by = this.shared_array['created_by']
        // // console.log(this.created_by)

        this.shared_to_data = this.shared_array['shared_to']
        // // console.log(this.shared_to_data)
        if (this.shared_to_data.length == 0) {
          this.shared_account_count = 0
        }
        for (var j = 0; j < this.shared_to_data.length; j++) {
          if (this.shared_to_data[j]["email"] != 'info@datasee.ai' && this.shared_to_data[j]["email"] != 'datasee@gmail.com') {
            if (j == 0) {
              this.shared_account_count = 1
            } else {
              this.shared_account_count = j;
            }

            this.shared_to.push({ "name": this.shared_to_data[j]["name"], "email": this.shared_to_data[j]["email"] })
            // // // console.log("---------------------------------------------"+j)
            // // console.log(this.shared_to_data[j]["email"])
          }


        }
        // alert(this.shared_account_count)
        if (this.shared_account_count == undefined) {
          this.shared_account_count = 0
        }
        // alert(this.shared_account_count)


        // }

      })

    const user_id = localStorage.getItem("user_id");

    fetch(`${environment.api_name}api/accounts/manage_users`, {
      method: 'GET',
      headers,
      credentials: 'omit'
    })
      .then(response => response.json())
      .then(datavalue => {
        console.log(datavalue)
        if (datavalue['status'] == 'failed') {
          this.toastr.warning(datavalue['message']);
        } else {


          var user_name = datavalue['data']
          var count_user = 0
          for (let i = 0; i < user_name.length; i++) {
            // console.log(user_name[i]['is_active'])
            if (user_name[i]['is_active'] == true) {
              this.user.push(user_name[i])
            }

          }
        }
      })

    this.Get_shared_list()


    // if(proj_type == "asset"){
    //  copy here
    // }else if (projectyep = :carnot){
    // copy here
    // }

  }

  Get_shared_list() {
    const token = localStorage.getItem("token");
    const headers = {
      'Authorization': `Bearer ${token}`,
      'Content-Type': 'application/json',
    };

    const user_id = localStorage.getItem("user_id");
    const project_id = localStorage.getItem("project_id")
    const project_type = sessionStorage.getItem("project_type")
    if (project_type == "asset") {

      fetch(`${environment.api_name}api/asset/get_asset_project/${project_id}`, {
        method: 'GET',
        headers,
        credentials: 'omit'
      })
        .then(response => response.json())
        .then(datavalue => {
          // console.log(datavalue)
          var list = datavalue['data']
          this.user_arr = datavalue['data']['users']
          var count_user = 0
          for (let i = 0; i < this.user_arr.length; i++) {
            // console.log(this.user_arr[i])
            if (this.user_arr[i]['role'] != 'superadmin') {
              this.roles.push(this.user_arr[i])

            }

          }
        })
    }
    else if (project_type == "carnot") {
      fetch(environment.api_name + 'api/project/get_project/' + project_id, {
        method: 'GET',
        headers,
        credentials: 'omit',
      })
        .then(response => response.json())
        .then(datavalue => {
          // console.log(datavalue)
          var list = datavalue['data']
          this.user_arr = datavalue['data']['users']
          // console.log(this.user_arr)
          // for (let i = 0; i < list.length; i++) {
          //   // console.log(list[i])
          //   if (list[i]['is_active'] == true) {
          //     this.user.push(list[i])
          //   }
          for (let index = 0; index < this.user_arr.length; index++) {

            if (this.user_arr[index]['role'] != 'superadmin') {
              this.roles.push(this.user_arr[index])

            }
            // // console.log(datavalue[index])


          }

          // }
        })

    }
  }

  user_mapping(role) {
    // console.log(role)
    this.Yet_to_share_profile_list = role
  }
  send_user() {

    var project_id = localStorage.getItem("project_id")
    var user_id = this.Yet_to_share_profile_list.id
    // for (let i = 0; i < this.Yet_to_share_profile_list.length; i++) {
    // // console.log(this.Yet_to_share_profile_list[i]['id'])


    var user_mapping = {
      // "": parseInt(this.Yet_to_share_profile_list),
      "id": parseInt(project_id),
      "user": parseInt(user_id)
    }

    // // console.log(user_mapping)

    // }
    const newtoken = localStorage.getItem("token");
    const project_type = sessionStorage.getItem("project_type")

    var httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + newtoken,
      }),
      withCredentials: false,
    };
    var posturl = environment.api_name + "api/accounts/add_project_users/" + project_type
    this.http.post(posturl, user_mapping, httpOptions).subscribe(data => {
      this.post_id = data;
      // console.log(this.post_id)
      this.success = data["status"]
      var notification = data["message"]
      // alert(this.success)

      if (this.success == 'success') {
        this.toastr.success('Successfully Shared');
        this.roles = []
        this.Get_shared_list()
        // setTimeout(() => {
        //   this.ngxService.stop();
        // }, 2100)
        // this.router.navigate(['app/project/all'])
        // location.reload();
      } else {
        alert(notification)
      }
    })


  }
  onshare(emailid) {
    // alert(emailid +"---"+this.project_id)
    var post_url = environment.api_name + "project/share_project/" + this.project_id

    var userdata = {
      "email_id": emailid,
    }
    // // console.log(userdata)
    const newtoken = localStorage.getItem("token");
    var httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + newtoken,
      }),
      withCredentials: false,
    };
    this.http.post(post_url, userdata, httpOptions).subscribe(data => {
      this.postId = data;
      this.success = data["status"]
      var notification = data["Notification"]
      // alert(this.success)

      if (this.success == 'success') {
        this.toastr.success('Successfully Shared');
        // setTimeout(() => {
        //   this.ngxService.stop();
        // }, 2100)
        // this.router.navigate(['app/project/all'])
        location.reload();
      } else {
        alert(notification)
      }
    })
  }

}
