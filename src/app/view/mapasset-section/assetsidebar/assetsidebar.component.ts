import { Component, OnInit, ViewChild, Output, EventEmitter, Input } from '@angular/core';
import { Router } from '@angular/router';
import { HttpAssetService } from '../services-assetmap/http.assetservice';
import { Subject } from "rxjs";
import { MatDialog } from '@angular/material/dialog';
import { ComparisionAssetComponent } from '../sub-components/comparision-asset/comparision-asset.component';
import { ShareComponent } from '../../layout/share/share.component';
import { DownloadreportComponent } from '../sub-components/downloadreport/downloadreport.component';
import { AssetSharecomponentComponent } from '../sub-components/asset-sharecomponent/asset-sharecomponent.component';

@Component({
  selector: 'assetsidebar',
  templateUrl: './assetsidebar.component.html',
  styleUrls: ['./assetsidebar.component.css']
})
export class AssetsidebarComponent implements OnInit {
  token_based_logo: any;
  token_logo: string;
  // @Input() resetFormSubject: Subject<boolean> = new Subject<boolean>();
  @Input() resetFormSubject: Subject<boolean>
  Asset_type: string;
  summary_data: any;
  inverter_data: any;
  idd: string;
  previousID: any;
  Summary_tab: boolean;
  currentMenu: string;
  summary_title: any;
  inverter_title: any;
  summary_keys: any;
  inverter_keys: any;
  main_data: any;
  Date: string;
  Asset_typewise_data: any;
  hide: boolean[] = []
  kml_name: any;
  kml_name_key: any;
  kml_name_value: any;
  kml_name_file: any;
  kml_data: any = [];
  inverter: any;

  // Change to appropriate names
  close_popup_card: any = '';
  @Output() close_sidebar_event: EventEmitter<any> = new EventEmitter<any>();
  removing_kml: any = 'remove';
  @Output() removing_kml_event: EventEmitter<any> = new EventEmitter<any>();
  current_summary_state: any = '';
  @Output() current_summary_state_event: EventEmitter<any> = new EventEmitter<any>();
  project_detail: any = '';
  @Output() project_info_event: EventEmitter<any> = new EventEmitter<any>();

  // Comparison Slider output click event

  slider_state: boolean = false;
  @Output() compare_slider_event = new EventEmitter<boolean>();

  isOpenCompare: boolean;
  isShareComponent: boolean;
  dialogRef: any;
  invData: any;

  constructor(private router: Router, private _http: HttpAssetService, public dialog: MatDialog) { }

  ngOnInit(): void {
    // let Asset_typewise_data = this._http.getAsset_data();

    this._http.Asset_project().subscribe(data => {
      this.main_data = data['data']
      if (this.main_data != undefined) {
        this.onload()
      }
    })
    this.resetFormSubject.subscribe(response => {
      if (response) {
        var div = document.getElementById('SCPM');
        div.style.display = 'block'
        var statusdiv = document.getElementById('SCQM');
        statusdiv.style.display = 'none'

      } else {
        var div = document.getElementById('SCPM');
        div.style.display = 'none'
        var statusdiv = document.getElementById('SCQM');
        statusdiv.style.display = 'block'

      }
      this.onload()

    })

  }

  onload() {
    this.Asset_type = sessionStorage.getItem('type')
    this.Date = localStorage.getItem('date')
    this.kml_data = []
    if (this.main_data) {
      this.Asset_typewise_data = this.main_data['projectdata'][this.Date][this.Asset_type]
      if (this.Asset_type == 'SCPM') {
        this.summary_data = this.Asset_typewise_data['summary']
        console.log(this.Asset_typewise_data);
        console.log(this.Asset_typewise_data['inverter']);

        this.inverter_data = this.Asset_typewise_data['inverter']
        this.summary_title = Object.keys(this.Asset_typewise_data['summary'])
        this.inverter_title = 'Sub Camp'
        // console.log(this.summary_title)
        this.summary_keys = Object.keys(this.Asset_typewise_data['summary'][this.summary_title])
        this.inverter_keys = Object.keys(this.Asset_typewise_data['inverter']['Inverter'])
        // console.log(this.summary_keys)
        this.summary_keys.forEach(element => {
          var kml_file_name = []
          var kml_file_color = []
          var kml_sub_group = []
          this.kml_name_key = Object.keys(this.Asset_typewise_data['summary'][this.summary_title][element])
          this.kml_name_value = Object.values(this.Asset_typewise_data['summary'][this.summary_title][element])
          this.kml_name_file = this.Asset_typewise_data['summary'][this.summary_title][element]['kml']

          this.kml_name_value.forEach(key => {

            kml_file_name.push(key['kml'])
            kml_file_color.push(key['color'])
            kml_sub_group.push('summary_sub_group')

          });

          // console.log(kml_file_name);

          this.kml_data.push({ 'type': this.Asset_type, 'menu': 'summary', 'key': this.kml_name_key, 'data': this.kml_name_value, 'sub_group': kml_sub_group, 'name': element, 'kml_list': kml_file_name, 'color': kml_file_color })

        });

      } else if (this.Asset_type == 'SCQM') {
        this.summary_data = this.Asset_typewise_data['summary']
        this.inverter_data = this.Asset_typewise_data['inverter']
      }
    }



  }

  Select_inverter(inverter) {
    // alert()
    inverter = 'ICR_01'
    this.kml_name_key = Object.keys(this.Asset_typewise_data['inverter']['Inverter'][inverter])
    this.kml_name_value = Object.values(this.Asset_typewise_data['inverter']['Inverter'][inverter])
    // console.log(this.kml_name_value);
    this.kml_data = []
    this.kml_name_key.forEach(element => {
      // console.log(element)
      var kml_file_name = []
      var kml_file_color = []
      var kml_sub_group = []
      this.kml_name_value.forEach(key => {
        var temp_key = key
        console.log(key);
        console.log(Object.keys(key));
        console.log(Object.values(key));

        Object.values(key).forEach(data => {

          console.log(data);

          kml_file_name.push(data['kml'])
          kml_file_color.push(data['color'])
          kml_sub_group.push('summary_sub_group')

        });
      });
      this.kml_data.push({ 'type': this.Asset_type, 'menu': 'inverter', 'key': this.kml_name_key, 'data': this.kml_name_value, 'sub_group': kml_sub_group, 'name': element, 'kml_list': kml_file_name, 'color': kml_file_color })
    })
    console.log(this.kml_data)
  }

  project_info() {
    var location = this.main_data['city'] + "," + this.main_data['state'] + "," + this.main_data['country']
    this.project_detail = { name: this.main_data['name'], description: this.main_data['description'], location: location }
    this.project_info_event.emit(this.project_detail)
  }

  logout() {
    // alert(localStorage['token'])
    localStorage.clear();
    // alert(localStorage['token'])
    if (localStorage['token'] == undefined) {
      this.router.navigate(["/auth/login"])
    }
  }

  // Function for showing opened sidebar.

  activateMenu(id: string) {
    this.idd = id
    // alert(id)
    // alert(this.Summary_tab)
    if (this.previousID != undefined && (this.Summary_tab == true || this.Summary_tab == undefined)) {

      let prevId = document.getElementById(this.previousID);
      prevId.style.width = '0px';
    }
    else {
      let e = document.getElementById(id);
      e.style.width = '5px';
      this.previousID = id;
    }

  }

  // Function for slider in comparison page

  public sliderToggle() {
    this.slider_state = !this.slider_state;
    console.log("slider", this.slider_state);
    this.compare_slider_event.emit(this.slider_state)
  }

  Send_kml_data(data, hide) {
    // alert(hide)
    if (hide) {
      this.current_summary_state_event.emit(data)

    } else {
      this.removing_kml_event.emit(this.removing_kml)
    }
  }


  send_subgroup_kml_data(i, row_id, data) {
    // console.log(i)
    // console.log(data)
    var key_array = []
    key_array.push(data['key'][row_id])
    var color_array = []
    color_array.push(data['color'][row_id])
    var new_data = []
    new_data.push({ 'type': this.Asset_type, 'menu': 'summary_subgroup', 'key': key_array, 'data': this.kml_name_value, 'sub_group': data['data'][row_id], 'name': data['name'], 'kml_list': data['kml_list'][row_id], 'color': color_array })

    // console.log(new_data)
    this.current_summary_state_event.emit(new_data[0])


  }

  openSidbar(id: string, menuId: string) {

    let sideBar = document.getElementById(id);

    sideBar.style.display = 'block';
    sideBar.style.width = '380px';

    window.addEventListener("resize", function (event) {
      if (document.body.clientWidth > 600) {
        sideBar.style.width = '380px';
      } else {
        sideBar.style.width = '300px';
      }
    });
    // alert(menuId)
    switch (menuId) {
      case 'summary':
        this.summary_data = [];
        this.currentMenu = 'summary';
        this.summary_data_render();
        break;
      case 'inverter':
        this.invData = [];
        this.currentMenu = 'inverter';
        this.inverter_data_render();
        this.Select_inverter("ICR_01");
        break;
      // case 'Topography':
      //   this.topograpyData = [];
      //   this.currentMenu = 'Topography';
      //   this.Topography_data_render();
      //   break;
      // case 'Grading':
      //   this.topograpyData = [];
      //   this.currentMenu = 'Grading';
      //   this.Grading_data_render();
      //   break;
    }
  }

  // Function for closing sidebar
  closeSidebar(id: string) {
    let sideBar = document.getElementById(id);
    sideBar.style.display = 'none';
    sideBar.style.width = '0px';
    this.removing_kml_event.emit(this.removing_kml);
    if (this.Summary_tab == true) {
      this.activateMenu(this.previousID)
      this.Summary_tab = false;

    }
    this.close_sidebar_event.emit(this.close_popup_card)
  }

  summary_data_render() {
    sessionStorage.setItem('current_tab', "0")
    var shareComponent_visibility = sessionStorage.getItem("shareComponent")
    if (shareComponent_visibility == "open") {
      this.Summary_tab = false;
      this.dialog.closeAll();
      this.activateMenu("summary")
    }


    if (this.Summary_tab == true) {
      if (this.previousID == "inverter") {
        this.Summary_tab = false
        this.activateMenu("summary")
        return this.summary_data_render()
      } else if (this.previousID == "Topography") {
        this.Summary_tab = false
        this.activateMenu("summary")
        return this.summary_data_render()
      }
      this.previousID = "summary"
      this.Summary_tab = false
      this.closeSidebar('summarySidebar')
      return
    }
    this.Summary_tab = true

  }
  inverter_data_render() {
    sessionStorage.setItem('current_tab', "0")
    var shareComponent_visibility = sessionStorage.getItem("shareComponent")
    if (shareComponent_visibility == "open") {
      this.Summary_tab = false;
      this.dialog.closeAll();
      this.activateMenu("inverter")
    }


    if (this.Summary_tab == true) {
      if (this.previousID == "inverter") {
        this.Summary_tab = false
        this.activateMenu("inverter")
        return this.inverter_data_render()
      } else if (this.previousID == "Topography") {
        this.Summary_tab = false
        this.activateMenu("inverter")
        return this.inverter_data_render()
      }

      this.previousID = "inverter"
      this.Summary_tab = false
      this.closeSidebar('summarySidebar')
      return
    }
    this.Summary_tab = true
  }

  Compare_map(id: string) {
    var shareComponent_visibility = sessionStorage.getItem("shareComponent")
    if (shareComponent_visibility == "open") {
      this.dialog.closeAll();
    }
    let e = document.getElementById(id);

    if (this.isOpenCompare) {
      this.dialogRef.close();
      this.isOpenCompare = false;
      e.style.width = '0px';
    } else {
      this.isOpenCompare = true;
      this.dialogRef = this.dialog.open(ComparisionAssetComponent, {
        height: "calc(100%)",
        width: "calc(100%)",
        maxWidth: "100%",
        maxHeight: "100%"
      });
      e.style.width = '5px';
      this.closeSidebar('summarySidebar')
    }

    this.dialogRef.afterClosed().subscribe(result => {
      e.style.width = '0px';
      sessionStorage.removeItem("dateright")
      sessionStorage.removeItem("dateleft")
    });
  }

  gotodashboard() {
    var shareComponent_visibility = sessionStorage.getItem("shareComponent")
    // if (shareComponent_visibility == "open") {
    //   this.dialog.closeAll();
    // }
    // if (this.isOpenCompare) {
    //   // this.openComparision('compare')
    // }
    this.router.navigate(['app/home'])
  }

  share_project(id: string) {
    if (this.Summary_tab == true) {
      this.closeSidebar('summarySidebar')
    }
    let e = document.getElementById(id);
    if (this.isShareComponent) {
      this.dialogRef.close();
      this.isShareComponent = false;
      e.style.width = '0px';
    } else {
      this.isShareComponent = true;
      this.dialogRef = this.dialog.open(ShareComponent);
      // this.dialogRef = this.dialog.open(AssetSharecomponentComponent);
      e.style.width = '5px';
      this.closeSidebar('summarySidebar')
    }

  }

  Download() {
    this.dialogRef = this.dialog.open(DownloadreportComponent);
  }

}
