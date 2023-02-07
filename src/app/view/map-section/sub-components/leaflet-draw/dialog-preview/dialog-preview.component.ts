import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { HttpService } from '../../../services-map/http.service';
import { Router } from '@angular/router';
import { HttpErrorResponse } from '@angular/common/http';
import { ToastrService } from 'ngx-toastr';
@Component({
  selector: 'app-dialog-preview',
  templateUrl: './dialog-preview.component.html',
  styleUrls: ['./dialog-preview.component.css']
})
export class DialogPreviewComponent implements OnInit {
  main_data: any;
  project_id_summary: any;
  project_id_summary_values: any;
  date_values: any;
  ChangedAOI: any;
  ChangedfromAOI: any;
  ChangedfromAOI_itemval: any;

  constructor(private toastr: ToastrService, private router: Router, private _http: HttpService,public dialogRef: MatDialogRef<DialogPreviewComponent>,  @Inject(MAT_DIALOG_DATA) public map_data: any) { }

  ngOnInit(): void {
    this._http.getAreaofinterest().subscribe(info => {
      this.ChangedAOI = info;
      this.ChangedfromAOI = this.ChangedAOI.datadescriptionval
      // this.ChangedfromAOI_itemval = this.ChangedAOI.datadescriptionval.itemval

      // alert(this.ChangedfromAOI)
  },
  (err: HttpErrorResponse) => {
    // console.log(err.status);
    if (err.status == 401) {
      this.toastr.error("Login time expired. Please login again.")
      this.gotologin()
    }
  })
}

gotologin(){
  this.router.navigate(['auth/login'])
 }
}
