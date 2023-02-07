import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'asset-sharecomponent',
  templateUrl: './asset-sharecomponent.component.html',
  styleUrls: ['./asset-sharecomponent.component.css']
})
export class AssetSharecomponentComponent implements OnInit {
  project_name: any;

  constructor() { }

  ngOnInit(): void {
    this.project_name = localStorage.getItem('proj_name')
  }

}
