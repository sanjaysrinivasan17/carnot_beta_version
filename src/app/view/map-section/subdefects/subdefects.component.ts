import { Component, OnInit, ViewChild, Output, EventEmitter, Input } from '@angular/core';
import { ApexYAxis } from 'ng-apexcharts';
import { environment } from '../../../../environments/environment';
import { HttpService } from '../services-map/http.service'
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import {TooltipPosition} from '@angular/material/tooltip';
import {FormControl} from '@angular/forms';
import { DefectrectificationComponent } from '../defectrectification/defectrectification.component'


@Component({
  selector: 'subdefects',
  templateUrl: './subdefects.component.html',
  styleUrls: ['./subdefects.component.css']
})
export class SubdefectsComponent implements OnInit {

  positionOptions: TooltipPosition = 'above';
  // positionOptions: TooltipPosition[] = ['after', 'before', 'above', 'below', 'left', 'right'];
  position = new FormControl(this.positionOptions);

  subdefects_page: any;
  @Output() subdefects_page_event: EventEmitter<any> = new EventEmitter<any>();

  rectify_defects: any;
  @Output() rectify_defect_event: EventEmitter<any> = new EventEmitter<any>();

  track: any = null;
  public kml_file_location: any;
  table_no: any;
  polies = [];
  poly: any;
  descObj: any;
  summ: any;
  project_id_summary: any;
  dateonload: string;
  project_values: any;
  public defect_keys: any
  public defect_values: any;
  public count_dec: any;
  public count_dec_val: any;
  public get_summary_defect_count: any;
  public get_summary_subdefect_defect_count: any;
  public get_inventor_subdefect_defect_count: any;
  public defects_data = {};
  public defects = [];
  public get_inventor_defect_count: any;
  public inventor_keys: any
  public mode: any;
  public count = 0
  defects_value_selected = []
  constructor(private _http: HttpService, public dialog: MatDialog, private router: Router) { }


  ngOnInit(): void {
    // alert(environment.api_name)
    // alert(sessionStorage.getItem("kmlfilename"))
    this._http.getsubdefects().subscribe(info => {
      this.summ = info
      // alert(this.summ.status + "--------------")
      this.defects = []
      this.inventor_keys = []
      this.defect_values = []
      this.dateonload = localStorage.getItem("date")
      // alert(this.dateonload )
      this._http.summary_data().subscribe(data => {
        this.summ = data['data']
        this.project_id_summary = Object.keys(data['data'])
        this.kml_file_location = this.summ['processed_data'][this.dateonload]['kml_file_location']
        var x = sessionStorage.getItem('current_tab')
        this.mode = sessionStorage.getItem('mode')
        var p = parseInt(sessionStorage.getItem('page'), 10);
        // // console.log(this.kml_file_location)
        // return
        // if(x == "Panel Failure"){
        //   x = "Uniform PanelHeating"
        // }
        // alert()
        // return
        // alert(this.mode+"----summary")
        var summary_keys = Object.keys(this.summ['processed_data'][this.dateonload]['summary_layers'])
        // alert(summary_keys)
        this.inventor_keys = Object.keys(this.summ['processed_data'][this.dateonload]['inverter_layers'])
        if (this.mode == 'summary') {
          // alert(this.mode + "----summary")

          this.get_summary_defect_count = this.summ['processed_data'][this.dateonload]['summary_layers'][summary_keys[x]]['Count']
          // alert(this.get_summary_defect_count)
          if (this.get_summary_defect_count != 0) {
            this.opendefectsbar("open")
            this.defect_value_summary()
          } else {
            this.closedefectsbar("close")

          }

        } else if (this.mode == 'inventor') {
          var p_val = Number(p) - 1
          // alert(p_val+"-----"+p)
          // alert([summary_keys[x]]);
          // alert(this.mode+"----inventor")

          this.get_inventor_defect_count = this.summ['processed_data'][this.dateonload]['inverter_layers'][this.inventor_keys[p_val]][summary_keys[x]]['count']
          // alert(this.get_inventor_defect_count)
          // return
          if (this.get_inventor_defect_count != 0) {
            this.opendefectsbar("open")
            this.defect_value_inverter()
          } else {
            this.closedefectsbar("close")

          }
        } else if (this.mode == 'summary_sub_details') {
          // alert(this.mode)
          var n = sessionStorage.getItem('sub_defects')
          // // console.log(n);
          // // console.log(summary_keys[x]);
          // // console.log(this.summ[this.project_id_summary][this.dateonload]['summary_data'][summary_keys[x]])
          this.get_summary_subdefect_defect_count = this.summ['processed_data'][this.dateonload]['summary_layers'][summary_keys[x]]['sub_group'][n]['Count']
          // alert(this.get_summary_subdefect_defect_count)

          if (this.get_summary_subdefect_defect_count != 0) {
            this.opendefectsbar("open")
            this.defect_value_sumary_subdefect()
          } else {
            this.closedefectsbar("close")

          }
        } else if (this.mode == 'inverter_sub_details') {
          var p_val = Number(p) - 1
          var n = sessionStorage.getItem('sub_defects')
          // alert(p_val+"-----"+p)
          // alert([summary_keys[x]]);
          // alert(this.mode+"----inverter_sub_details")

          this.get_inventor_subdefect_defect_count = this.summ['processed_data'][this.dateonload]['inverter_layers'][this.inventor_keys[p_val]][summary_keys[x]]['sub_group'][n]['count']
          // alert(this.get_inventor_defect_count)
          // return
          if (this.get_inventor_subdefect_defect_count != 0) {
            this.opendefectsbar("open")
            this.defect_value_inverter_subdefect()
          } else {
            this.closedefectsbar("close")

          }
        }



      })
    })
  }
  opendefectsbar(val) {
    // alert(document.getElementById("defectssidebar"))
    let sideBar = document.getElementById("defectssidebar");
    sideBar.style.display = 'block';
    sideBar.style.width = '310px';

  }

  closedefectsbar(val) {
    // alert(document.getElementById("defectssidebar"))
    let sideBar = document.getElementById("defectssidebar");
    sideBar.style.display = 'none';
    sideBar.style.width = '0px';

  }
  defect_value_summary() {
    // alert("inside 1")

    var kml_files = sessionStorage.getItem("kmlfilename")
    var kml_name_load = kml_files.split(",")
    // alert(this.kml_file_location + "--------")
    // alert(kml_name_load.length)
    this.count_dec = 0;
    this.count_dec_val = 0;
    for (var i = 0; i < kml_name_load.length; i++) {
      // // console.log(kml_name_load[i])
      // // return
      // // console.log(this.kml_file_location + 'GLOBAL/' + kml_name_load[i] + '.kml')

      fetch(this.kml_file_location + 'GLOBAL/' + kml_name_load[i] + '.kml')
        .then(res => res.text())
        .then(kmltext => {


          // Create new kml overlay
          const parser = new DOMParser();
          const kml = parser.parseFromString(kmltext, 'text/xml');
          // // console.log(kml)

          // this.track = new L.KML(kml);

          var el = kml.getElementsByTagName('coordinates');
          var place = kml.getElementsByTagName('Placemark')
          // // console.log(place)

          let n = 0;
          let b
          let d
          for (var i in place) {
            let dec = place[i].childNodes[1].textContent
            // // console.log(dec)
            this.count_dec_val = this.count_dec_val + 1
            let coor = place[i].getElementsByTagName('coordinates')
            let latlngArray = coor[0].textContent.replace(/\n/g, " ").split(/[ ,]+/).filter(Boolean)
            var pa = parser.parseFromString(dec, "text/html")
            let u = pa.getElementsByTagName("td")
            for (var r in u) {
              if (n % 2 == 0) {
                b = u[r].textContent;
                //  // console.log(b)
              }
              else {
                if (b == "Defect:") {
                  d = b;
                  this.table_no = u[r].textContent;

                  // // // console.log(u[r].textContent)
                }

              }
              n++
            }
            // return
            // alert( this.table_no)
            // // console.log(this.table_no)
            // return
            var value = { "color": ['yellow', 'blue', 'red', 'green'] }
            if (this.table_no == 'Hotspot') {

              this.polygonMarkerCreating(latlngArray, 'green', dec)


            }
            if (this.table_no == 'Dirt') {

              this.polygonMarkerCreating(latlngArray, value.color[1], dec)
            }
            if (this.table_no == 'Multicell Hotspot' || this.table_no == 'Multicell_Hotspot') {

              this.polygonMarkerCreating(latlngArray, value.color[2], dec)
            }


            if (this.table_no == 'DirBy_Pass_Diode_Issuest') {

              this.polygonMarkerCreating(latlngArray, value.color[1], dec)
            }
            if (this.table_no == 'By_Pass_Diode_Issues' || this.table_no == 'Bypass Diode Issues') {

              this.polygonMarkerCreating(latlngArray, value.color[1], dec)
            }
            if (this.table_no == 'Dirt_By_Pass_Diode_Issues') {

              this.polygonMarkerCreating(latlngArray, value.color[1], dec)
            }
            if (this.table_no == 'Panel Failure' || this.table_no == 'Panel_Failure') {

              this.polygonMarkerCreating(latlngArray, value.color[0], dec)
            } if (this.table_no == 'Open String Tables' || this.table_no == 'Open_String_Tables') {

              this.polygonMarkerCreating(latlngArray, value.color[1], dec)
            }
            if (this.table_no == 'Open Circuit' || this.table_no == 'Open_Circuit') {
              // // console.log("op")
              this.polygonMarkerCreating(latlngArray, value.color[0], dec)
            }
            if (this.table_no == 'Short Circuit' || this.table_no == 'Short_Circuit') {
              this.polygonMarkerCreating(latlngArray, value.color[0], dec)
            }
            if (this.table_no == 'Uniform Panel Heating' || this.table_no == 'Uniform_Panel_Heating') {
              this.polygonMarkerCreating(latlngArray, value.color[0], dec)
            }

            if (this.table_no == 'PID') {
              this.polygonMarkerCreating(latlngArray, value.color[0], dec)
            }

          }

        });


    }

  }
  defect_value_sumary_subdefect() {
    var kml_files = sessionStorage.getItem("kmlfilename")
    var kml_name_load = kml_files.split(",")
    // alert(this.kml_file_location + "--------")
    // alert(kml_name_load.length)
    this.count_dec = 0;
    this.count_dec_val = 0;
    for (var i = 0; i < kml_name_load.length; i++) {
      // // console.log(kml_name_load[i])
      // return
      // // console.log(this.kml_file_location + 'GLOBAL/' + kml_name_load[i] + '.kml')

      fetch(this.kml_file_location + 'GLOBAL/' + kml_name_load[i] + '.kml')
        .then(res => res.text())
        .then(kmltext => {


          // Create new kml overlay
          const parser = new DOMParser();
          const kml = parser.parseFromString(kmltext, 'text/xml');
          // // console.log(kml)

          // this.track = new L.KML(kml);

          var el = kml.getElementsByTagName('coordinates');
          var place = kml.getElementsByTagName('Placemark')
          // // console.log(place)

          let n = 0;
          let b
          let d
          for (var i in place) {
            let dec = place[i].childNodes[1].textContent
            // // console.log(dec)
            this.count_dec_val = this.count_dec_val + 1
            let coor = place[i].getElementsByTagName('coordinates')
            let latlngArray = coor[0].textContent.replace(/\n/g, " ").split(/[ ,]+/).filter(Boolean)
            var pa = parser.parseFromString(dec, "text/html")
            let u = pa.getElementsByTagName("td")
            for (var r in u) {
              if (n % 2 == 0) {
                b = u[r].textContent;
                //  // console.log(b)
              }
              else {
                if (b == "Defect:") {
                  d = b;
                  this.table_no = u[r].textContent;

                  // // // console.log(u[r].textContent)
                }

              }
              n++
            }
            // return
            // alert( this.table_no)
            // // console.log(this.table_no)
            // return
            var value = { "color": ['yellow', 'blue', 'red', 'green'] }
            if (this.table_no == 'Hotspot') {

              this.polygonMarkerCreating(latlngArray, 'green', dec)


            }
            if (this.table_no == 'Dirt') {

              this.polygonMarkerCreating(latlngArray, value.color[1], dec)
            }
            if (this.table_no == 'Multicell Hotspot' || this.table_no == 'Multicell_Hotspot') {

              this.polygonMarkerCreating(latlngArray, value.color[2], dec)
            }


            if (this.table_no == 'DirBy_Pass_Diode_Issuest') {

              this.polygonMarkerCreating(latlngArray, value.color[1], dec)
            }
            if (this.table_no == 'By_Pass_Diode_Issues' || this.table_no == 'Bypass Diode Issues') {

              this.polygonMarkerCreating(latlngArray, value.color[1], dec)
            }
            if (this.table_no == 'Dirt_By_Pass_Diode_Issues') {

              this.polygonMarkerCreating(latlngArray, value.color[1], dec)
            }
            if (this.table_no == 'Panel Failure' || this.table_no == 'Panel_Failure') {

              this.polygonMarkerCreating(latlngArray, value.color[0], dec)
            } if (this.table_no == 'Open String Tables' || this.table_no == 'Open_String_Tables') {

              this.polygonMarkerCreating(latlngArray, value.color[1], dec)
            }
            if (this.table_no == 'Open Circuit' || this.table_no == 'Open_Circuit') {
              // // console.log("op")
              this.polygonMarkerCreating(latlngArray, value.color[0], dec)
            }
            if (this.table_no == 'Short Circuit' || this.table_no == 'Short_Circuit') {
              this.polygonMarkerCreating(latlngArray, value.color[0], dec)
            }
            if (this.table_no == 'Uniform Panel Heating' || this.table_no == 'Uniform_Panel_Heating') {
              this.polygonMarkerCreating(latlngArray, value.color[0], dec)
            }

            if (this.table_no == 'PID') {
              this.polygonMarkerCreating(latlngArray, value.color[0], dec)
            }

          }

        });


    }
  }

  defect_value_inverter() {
    var url;
    var p = parseInt(sessionStorage.getItem('page'))
    // alert(typeof p)
    if (p <= 9 && p >= 1) {
      url = this.kml_file_location + 'INVERTER0' + p + '/'
    }
    else {
      // // console.log("esle")
      url = this.kml_file_location + 'INVERTER' + p + '/'
    }
    var kml_files = sessionStorage.getItem("kmlfilename")
    var kml_name_load_inv = kml_files.split(",")
    // console.log(kml_name_load_inv)
    // return



    for (var m = 0; m < kml_name_load_inv.length; m++) {
      // // console.log(url + kml_name_load_inv[m] + '.kml')

      // console.log(url + kml_name_load_inv[m] + '.kml')
      // // console.log(m)
      // return
      fetch(url + kml_name_load_inv[m] + '.kml')
        .then(res => res.text())
        .then(kmltext => {


          const parser = new DOMParser();
          const kml = parser.parseFromString(kmltext, 'text/xml');

          var el = kml.getElementsByTagName('coordinates');
          var place = kml.getElementsByTagName('Placemark')

          let n = 0;
          let b
          let d
          for (var i in place) {
            let dec = place[i].childNodes[1].textContent
            // // console.log(dec)
            let coor = place[i].getElementsByTagName('coordinates')
            let latlngArray = coor[0].textContent.replace(/\n/g, " ").split(/[ ,]+/).filter(Boolean)
            var pa = parser.parseFromString(dec, "text/html")
            let u = pa.getElementsByTagName("td")
            for (var r in u) {
              if (n % 2 == 0) {
                b = u[r].textContent;
                // // console.log(b)
              }
              else {
                if (b == "Defect:") {
                  d = b;
                  this.table_no = u[r].textContent;

                  // // // console.log(u[r].textContent)
                }

              }
              n++
            }

            var value = { "color": ['yellow', 'blue', 'red', 'green'] }

            // // console.log(this.table_no)
            // // console.log(value.color)
            if (this.table_no == 'Hotspot') {
              //  green

              this.polygonMarkerCreating(latlngArray, 'green', dec)


            }
            if (this.table_no == 'Dirt') {

              this.polygonMarkerCreating(latlngArray, value.color[1], dec)
            }
            if (this.table_no == 'Multicell Hotspot' || this.table_no == 'Multicell_Hotspot') {

              this.polygonMarkerCreating(latlngArray, value.color[2], dec)
            }


            if (this.table_no == 'DirtBy_Pass_Diode_Issues') {

              this.polygonMarkerCreating(latlngArray, value.color[1], dec)
            }
            if (this.table_no == 'By_Pass_Diode_Issues' || this.table_no == 'Bypass Diode Issues') {

              this.polygonMarkerCreating(latlngArray, value.color[1], dec)
            }
            if (this.table_no == 'Dirt_By_Pass_Diode_Issues') {

              this.polygonMarkerCreating(latlngArray, value.color[1], dec)
            }

            if (this.table_no == 'Panel Failure' || this.table_no == 'Panel_Failure') {

              this.polygonMarkerCreating(latlngArray, value.color[0], dec)
            } if (this.table_no == 'Open String Tables' || this.table_no == 'Open_String_Tables') {

              this.polygonMarkerCreating(latlngArray, value.color[1], dec)
            }
            if (this.table_no == 'Open Circuit' || this.table_no == 'Open_Circuit') {
              // // console.log("op")
              this.polygonMarkerCreating(latlngArray, value.color[0], dec)
            }
            if (this.table_no == 'Short Circuit' || this.table_no == 'Short_Circuit') {
              this.polygonMarkerCreating(latlngArray, value.color[0], dec)
            }
            if (this.table_no == 'Uniform Panel Heating' || this.table_no == 'Uniform_Panel_Heating') {
              this.polygonMarkerCreating(latlngArray, value.color[0], dec)
            }

            if (this.table_no == 'PID') {
              this.polygonMarkerCreating(latlngArray, value.color[0], dec)
            }

          }


        });
    }





  }
  defect_value_inverter_subdefect() {
    var url;
    var p = parseInt(sessionStorage.getItem('page'))
    // alert(typeof p)
    if (p <= 9 && p >= 1) {
      url = this.kml_file_location + 'INVERTER0' + p + '/'
    }
    else {
      // // console.log("esle")
      url = this.kml_file_location + 'INVERTER' + p + '/'
    }
    var kml_files = sessionStorage.getItem("kmlfilename")
    var kml_name_load_inv = kml_files.split(",")
    // console.log(kml_name_load_inv)
    // return



    for (var m = 0; m < kml_name_load_inv.length; m++) {
      // // console.log(url + kml_name_load_inv[m] + '.kml')

      // console.log(url + kml_name_load_inv[m] + '.kml')
      // // console.log(m)
      // return
      fetch(url + kml_name_load_inv[m] + '.kml')
        .then(res => res.text())
        .then(kmltext => {


          const parser = new DOMParser();
          const kml = parser.parseFromString(kmltext, 'text/xml');

          var el = kml.getElementsByTagName('coordinates');
          var place = kml.getElementsByTagName('Placemark')

          let n = 0;
          let b
          let d
          for (var i in place) {
            let dec = place[i].childNodes[1].textContent
            // // console.log(dec)
            let coor = place[i].getElementsByTagName('coordinates')
            let latlngArray = coor[0].textContent.replace(/\n/g, " ").split(/[ ,]+/).filter(Boolean)
            var pa = parser.parseFromString(dec, "text/html")
            let u = pa.getElementsByTagName("td")
            for (var r in u) {
              if (n % 2 == 0) {
                b = u[r].textContent;
                // // console.log(b)
              }
              else {
                if (b == "Defect:") {
                  d = b;
                  this.table_no = u[r].textContent;

                  // // // console.log(u[r].textContent)
                }

              }
              n++
            }

            var value = { "color": ['yellow', 'blue', 'red', 'green'] }

            // // console.log(this.table_no)
            // // console.log(value.color)
            if (this.table_no == 'Hotspot') {
              //  green

              this.polygonMarkerCreating(latlngArray, 'green', dec)


            }
            if (this.table_no == 'Dirt') {

              this.polygonMarkerCreating(latlngArray, value.color[1], dec)
            }
            if (this.table_no == 'Multicell Hotspot' || this.table_no == 'Multicell_Hotspot') {

              this.polygonMarkerCreating(latlngArray, value.color[2], dec)
            }


            if (this.table_no == 'DirtBy_Pass_Diode_Issues') {

              this.polygonMarkerCreating(latlngArray, value.color[1], dec)
            }
            if (this.table_no == 'By_Pass_Diode_Issues' || this.table_no == 'Bypass Diode Issues') {

              this.polygonMarkerCreating(latlngArray, value.color[1], dec)
            }
            if (this.table_no == 'Dirt_By_Pass_Diode_Issues') {

              this.polygonMarkerCreating(latlngArray, value.color[1], dec)
            }

            if (this.table_no == 'Panel Failure' || this.table_no == 'Panel_Failure') {

              this.polygonMarkerCreating(latlngArray, value.color[0], dec)
            } if (this.table_no == 'Open String Tables' || this.table_no == 'Open_String_Tables') {

              this.polygonMarkerCreating(latlngArray, value.color[1], dec)
            }
            if (this.table_no == 'Open Circuit' || this.table_no == 'Open_Circuit') {
              // // console.log("op")
              this.polygonMarkerCreating(latlngArray, value.color[0], dec)
            }
            if (this.table_no == 'Short Circuit' || this.table_no == 'Short_Circuit') {
              this.polygonMarkerCreating(latlngArray, value.color[0], dec)
            }
            if (this.table_no == 'Uniform Panel Heating' || this.table_no == 'Uniform_Panel_Heating') {
              this.polygonMarkerCreating(latlngArray, value.color[0], dec)
            }

            if (this.table_no == 'PID') {
              this.polygonMarkerCreating(latlngArray, value.color[0], dec)
            }

          }


        });
    }





  }
  polygonMarkerCreating(lat, col, dec) {
    // this.count = this.count + 1
    this.project_values = [];
    // alert("inside 3")
    var proj_name = localStorage.getItem('name')
    var polygonPoints = []
    // // console.log(dec)
    // // console.log("---------------------------")
    let j = 1
    let k = 0
    let l = 2
    let iterate = lat.length / 3

    for (let i = 0; i < iterate; i++) {
      polygonPoints.push([lat[i + j], lat[i + k], lat[i + l]])
      j = j + 2;
      k = k + 2;
      l = l + 2
    }

    // // console.log(this.poly)
    this.polies.push(this.poly)

    const parser = new DOMParser();
    var markup = parser.parseFromString(dec, "text/html");
    // // var markup_img = parser.parseFromString(dec, "image/svg+xml");
    // // console.log(dec)
    // return
    // // // console.log("---------------------------")
    var y = markup.getElementsByTagName("td");
    let i = 0;
    let s = 0;
    let b = null;
    let f = null
    let d = null;
    this.descObj = [];
    this.defect_keys = [];
    // this.defect_values = [];
    // this.descObj_cadestral = {};
    b = "";
    // // console.log(y)
    // // console.log(y.length)
    // // console.log("---------------------------")
    if (y.length > 0) {
      for (var t = 0; t < y.length; t++) {
        // // console.log(y[t].innerText)
        // this.descObj.push(y[t].innerText)
        if (t % 2 == 0) {
          b = y[t].innerText
          f = b.split(":")
          b = f[0].replace(" ", "_");
          this.descObj.push(b)
        } else {
          b = y[t].innerText
          f = b.split(":")
          b = f[0].replace(" ", "_");
          this.descObj.push(b)
          // this.descObj.push(y[t].innerText)
        }
        // if (t % 2 == 0) {
        //   this.defect_keys.push(y[t].innerText)
        // } else {
        //   this.defect_values.push(y[t].innerText)
        // }
      }
      // // console.log(this.count)
      // // console.log(this.descObj)
      // return
      this.defects_array_making(this.descObj)

    }


  }

  defects_array_making(dec_obj) {
    this.count = this.count + 1
    let b = []
    let temp_def = []
    this.project_values.push(dec_obj)
    if (this.count_dec == 0) {
      this.defect_values = this.project_values
    } else {
      this.defect_values = this.defect_values.concat(this.project_values)

    }
    // alert(this.get_inventor_defect_count)
    // // console.log(this.get_summary_defect_count)
    // return
    // // console.log(this.defect_values)
    // this.project_values = []

    // return
    this.project_values = []
    this.count_dec = 1
    // // console.log("------------------------------------------------------------------------------")


    if (this.mode == 'summary') {
      if (this.get_summary_defect_count == this.defect_values.length) {
        var z = 0
        for (var m = 0; m < this.get_summary_defect_count; m++) {
          // // console.log(this.defect_values[m].length)
          var key_name = []
          var value_name = []
          for (var k = 0; k < this.defect_values[m].length; k++) {
            if (k % 2 == 0) {
              key_name.push(this.defect_values[m][k]);
              // // console.log(key_name)
            }
          }
          for (var k = 0; k < this.defect_values[m].length; k++) {
            if (k % 2 != 0) {
              value_name.push(this.defect_values[m][k])
              // // console.log(value_name)
            }
          }
          let temp = {}
          key_name.forEach((element, index) => {
            temp[element] = value_name[index];
          });
          this.defects.push(temp)
          z++
        }
        // console.log(this.defects)
        // // console.log(this.count)
      }
    } else if (this.mode == 'summary_sub_details') {
      if (this.get_summary_subdefect_defect_count == this.defect_values.length) {
        var z = 0
        for (var m = 0; m < this.get_summary_subdefect_defect_count; m++) {
          // // console.log(this.defect_values[m].length)
          var key_name = []
          var value_name = []
          for (var k = 0; k < this.defect_values[m].length; k++) {
            if (k % 2 == 0) {
              key_name.push(this.defect_values[m][k]);
              // // console.log(key_name)
            }
          }
          for (var k = 0; k < this.defect_values[m].length; k++) {
            if (k % 2 != 0) {
              value_name.push(this.defect_values[m][k])
              // // console.log(value_name)
            }
          }
          let temp = {}
          key_name.forEach((element, index) => {
            temp[element] = value_name[index];
          });
          this.defects.push(temp)
          z++
        }
        // console.log(this.defects)
        // // console.log(this.count)
      }
    }
    else if (this.mode == 'inventor') {
      // // console.log(this.get_inventor_defect_count)
      if (this.get_inventor_defect_count == this.defect_values.length) {
        var z = 0
        // // console.log("------------------------------------------------------------------------------")

        for (var m = 0; m < this.get_inventor_defect_count; m++) {

          var key_name = []
          var value_name = []
          for (var k = 0; k < this.defect_values[m].length; k++) {
            if (k % 2 == 0) {
              key_name.push(this.defect_values[m][k]);
              // // console.log(key_name)
            }
          }
          for (var k = 0; k < this.defect_values[m].length; k++) {
            if (k % 2 != 0) {
              value_name.push(this.defect_values[m][k])
              // // console.log(value_name)

            }
          }
          let temp = {}
          key_name.forEach((element, index) => {
            temp[element] = value_name[index];
          });
          this.defects.push(temp)
          z++
        }
        // // console.log(this.defects)
      }
    }
    else if (this.mode == 'inverter_sub_details') {
      // // console.log(this.get_inventor_defect_count)
      if (this.get_inventor_subdefect_defect_count == this.defect_values.length) {
        var z = 0
        // // console.log("------------------------------------------------------------------------------")

        for (var m = 0; m < this.get_inventor_subdefect_defect_count; m++) {

          var key_name = []
          var value_name = []
          for (var k = 0; k < this.defect_values[m].length; k++) {
            if (k % 2 == 0) {
              key_name.push(this.defect_values[m][k]);
              // // console.log(key_name)
            }
          }
          for (var k = 0; k < this.defect_values[m].length; k++) {
            if (k % 2 != 0) {
              value_name.push(this.defect_values[m][k])
              // // console.log(value_name)

            }
          }
          let temp = {}
          key_name.forEach((element, index) => {
            temp[element] = value_name[index];
          });
          this.defects.push(temp)
          z++
        }
        // // console.log(this.defects)
      }
    }

  }
  selectedMaplocation(lat, long) {
    // alert(lat+"----"+long)
    var latlong = [lat, long]
    this.subdefects_page_event.emit(latlong)
  }

  selectDefectrectification(total_defects, defects, Table_No) {
    // console.log(Table_No)
   this.rectify_defects = { 'Total_Defects': total_defects, 'table_no': Table_No };
  //  var defects_data = Table_No
    // // console.log(defects_data)
    this._http.setrectify_data(this.rectify_defects)
  //  this.rectify_defect_event.emit(this.rectify_defects)
  const dialogRef = this.dialog.open(DefectrectificationComponent);

  dialogRef.afterClosed().subscribe(result => {
    // // console.log(`Dialog result: ${result}`);
  });
   

  }
}

