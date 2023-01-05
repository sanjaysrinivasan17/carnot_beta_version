import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { HttpAssetService } from '../../../services-assetmap/http.assetservice';

@Component({
  selector: 'assetdialog-preview',
  templateUrl: './assetdialog-preview.component.html',
  styleUrls: ['./assetdialog-preview.component.css']
})
export class AssetdialogPreviewComponent {
  main_data: any;
  project_id_summary: any;
  project_id_summary_values: any;
  date_values: any;
  ChangedAOI: any;
  ChangedfromAOI: any;
  ChangedfromAOI_itemval: any;

  constructor(private _http: HttpAssetService, public dialogRef: MatDialogRef<AssetdialogPreviewComponent>, @Inject(MAT_DIALOG_DATA) public map_data: any) { }

  ngOnInit(): void {
    this._http.getAreaofinterest().subscribe(info => {
      this.ChangedAOI = info;
      this.ChangedfromAOI = this.ChangedAOI.datadescriptionval
      // this.ChangedfromAOI_itemval = this.ChangedAOI.datadescriptionval.itemval

      // alert(this.ChangedfromAOI)
    })
  }

}
