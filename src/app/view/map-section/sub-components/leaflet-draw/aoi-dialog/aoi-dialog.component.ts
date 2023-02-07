import { Inject } from '@angular/core';
import { environment } from '../../../../../../environments/environment';
import { Component, OnInit } from '@angular/core';
import {  FormGroup, FormBuilder } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { HttpErrorResponse } from '@angular/common/http';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';
@Component({
  selector: 'app-aoi-dialog',
  templateUrl: './aoi-dialog.component.html',
  styleUrls: ['./aoi-dialog.component.css']
})
export class AoiDialogComponent implements OnInit {


  myform: FormGroup;

  constructor(private toastr: ToastrService, private router: Router, private fb: FormBuilder,   public dialogRef: MatDialogRef<AoiDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public map_data: any) { }

  ngOnInit(): void {
    var project_name = localStorage.getItem("name")
    var date = localStorage.getItem("date")
    this.myform = this.fb.group({ label: '', desc: '', project_name: project_name, date: date });
  }


  // TODO

  // Form validation do not save empty AOI's

  public saveAoi()
  {
    const data = this.myform.value;
    data.polygon = this.map_data.co;
    // // console.log(data);

    const token = localStorage.getItem("token");
    const headers = {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json',
    };

    fetch(environment.api_name+'draw/save_aoi/', {
      method: 'POST',
      headers,
      credentials: 'omit',
      body: JSON.stringify(data),
    })
      .then(response => response.json())
      .then(data => {
        // // console.log('Success:', data);
        this.dialogRef.close([]);
      },
      (err: HttpErrorResponse) => {
        // console.log(err.status);
        if (err.status == 401) {
          this.toastr.error("Login time expired. Please login again.")
          this.gotologin()
        }
      })
      .catch((error) => {
        console.error('Error:', error);
      });
  }

  public removeUnusedInstance()
  {
      // // console.log(this.map_data.elayer);
      this.map_data.event.removeLayer(this.map_data.elayer)

  }
  gotologin(){
    this.router.navigate(['auth/login'])
   }
}
