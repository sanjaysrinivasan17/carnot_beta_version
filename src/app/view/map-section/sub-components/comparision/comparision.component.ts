import { Component, OnInit } from '@angular/core';
import { environment } from '../../../../../environments/environment';
import { HttpErrorResponse } from '@angular/common/http';
import { ToastrService } from 'ngx-toastr';
import 'leaflet';
import 'leaflet-kml';
import { Router } from '@angular/router';
declare const L: any;

declare var require: any
//require('leaflet-side-by-side');
var selected_point = new L.LayerGroup();
@Component({
  selector: 'app-comparision',
  templateUrl: './comparision.component.html',
  styleUrls: ['./comparision.component.css']
})
export class ComparisionComponent implements OnInit {

  public map1: any;
  public popupDesc = null;
  main_data: any;
  project_id_summary: any;
  public date_summary: any;
  datevalue: any;
  datevalue_left: any;
  datevalue_right: any;
  public dateright: any;
  public dateleft: any;
  Project_layer_summary: string[];
  public ortho_file_location_onLoad_left: any;
  base_ortho_layer: any;
  rgb_layer: any;
  public myLayer1: any;
  public myLayer2: any;
  public myLayer3: any;
  public myLayer4: any;
  date_new_length: any;
  datevalue_first: any;
  public ortho_file_location_onLoad: any;
  layer: any;
  center: any;
  str_center: any;
  lat: any;
  long: any;
  date_inv_status_key: any;
  date_inv_status_value: any;
  Completed_date_array: any;
  thermal_location_onLoad_left: any;
  thermal_location_onLoad_right: any;
  isShown_left: boolean = false;
  isShown_right: boolean = false;
  kmlname: any;
  defects: any;
  defects_data_left: any;
  defects_data_right: any;
  defectval: any;
  k: any;
  kml_file_location_right: any;
  kml_file_location_left: any;
  track: any = null;
  table_no: any;
  poly: any;
  polies: any;
  descObj: any;
  descObj_cadestral: any;
  current_kml_data: any;
  popup_opened: boolean;
  grading_visibility: string;
  ITC_No: any;
  popup_lat: any;
  Description: any;
  popup_lng: any;
  Max_temp: any;
  Module_no: any;
  Min_temp: any;
  thermal_img: any;
  popup_card_visibility_cadestral: boolean;
  popup_card_visibility: boolean;
  public Tableno: any;
  popup_card_visibility_grading: boolean;
  keys_kml: any;
  defect: any;
  // defects = [{'Hotspot':'Dirt,Multicell_Hotspot,Hotspot','Dirt/vegetation':'Dirt'}]

  constructor(private toastr: ToastrService, private router: Router) { }

  ngOnInit(): void {
    this.defects_data_left = []
    this.defects_data_right = []
    this.keys_kml = []

    const newName = localStorage.getItem("name");
    const project_id = localStorage.getItem("project_id");

    const token = localStorage.getItem("token");
    const headers = {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json',
    };

    fetch(`${environment.api_name}api/project/get_project/${project_id}`, {
      method: 'GET',
      headers,
      credentials: 'omit',
    })
      .then(response => response.json())
      .then(data => {
        this.main_data = data['data']
        // this.project_id_summary = Object.keys(data)
        // this.date_summary = this.main_data['date_status']
        // this.center = this.main_data["center"]

        var new_center = localStorage.getItem('center')
        if (new_center != '') {
          this.center = new_center
        } else {
          this.center = this.center
        }
        this.str_center = this.center.split(",");
        this.lat = this.str_center[0];
        this.long = this.str_center[1];
        this.Completed_date_array = [];
        this.date_inv_status_key = Object.keys(this.main_data["date_status"])
        this.date_inv_status_value = Object.values(this.main_data["date_status"])

        for (var k = 0; k < this.date_inv_status_key.length; k++) {
          if (this.date_inv_status_value[k] == "completed") {
            this.Completed_date_array.push(this.date_inv_status_key[k])
          }
        }

        this.date_new_length = this.Completed_date_array.length - 1;
        this.datevalue_first = this.Completed_date_array[0];
        this.datevalue = this.Completed_date_array[this.date_new_length]
        this.ortho_file_location_onLoad_left = this.main_data['processed_data'][this.datevalue_first]['ortho_file_location']
        this.thermal_location_onLoad_left = this.main_data['processed_data'][this.datevalue_first]['thermal_location']
        this.kml_file_location_left = this.main_data['processed_data'][this.datevalue_first]['kml_file_location']
        this.thermal_location_onLoad_right = this.main_data['processed_data'][this.datevalue]['thermal_location']
        this.ortho_file_location_onLoad = this.main_data['processed_data'][this.datevalue]['ortho_file_location']
        this.kml_file_location_right = this.main_data['processed_data'][this.datevalue]['kml_file_location']
        this.dateleft = this.datevalue_first
        this.dateright = this.datevalue

        for (var key in (Object.keys(this.main_data['processed_data'][this.datevalue_first]['summary_layers']))) {
          var summary_name = Object.keys(this.main_data['processed_data'][this.datevalue_first]['summary_layers'])[key]
            if (this.defects_data_left.indexOf(summary_name) === -1) {
              if (summary_name != 'Hotspot' && summary_name != 'Uniform Panel Heating' && summary_name != 'Panel Failure') {
                this.defects_data_left.push({ key: summary_name, "kml": this.main_data['processed_data'][this.datevalue_first]['summary_layers'][summary_name]['kml'], "color": this.main_data['processed_data'][this.datevalue_first]['summary_layers'][summary_name]['color'] });
                this.defects_data_right.push({ key: summary_name, "kml": this.main_data['processed_data'][this.datevalue]['summary_layers'][summary_name]['kml'], "color": this.main_data['processed_data'][this.datevalue]['summary_layers'][summary_name]['color'] });
              }
            }
            for (var sub_group in this.main_data['processed_data'][this.datevalue_first]['summary_layers'][summary_name]['sub_group']) {
              // this.defects_data.push(sub_group)
              this.defects_data_left.push({ key: sub_group, "kml": this.main_data['processed_data'][this.datevalue_first]['summary_layers'][summary_name]['sub_group'][sub_group]['kml'], "color": this.main_data['processed_data'][this.datevalue_first]['summary_layers'][summary_name]['sub_group'][sub_group]['color'] });
              this.defects_data_right.push({ key: sub_group, "kml": this.main_data['processed_data'][this.datevalue]['summary_layers'][summary_name]['sub_group'][sub_group]['kml'], "color": this.main_data['processed_data'][this.datevalue]['summary_layers'][summary_name]['sub_group'][sub_group]['color'] });
              // this.keys_kml.push(this.main_data[this.project_id_summary][this.datevalue_first]['summary_layers'][key]['sub_group']['kml'])

            }



        }

        this.map1 = L.map('compare_map', {
          attributionControl: false
        }).setView([this.lat, this.long], 17);



        // default MAP layer

        this.layer = L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
          attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        }).addTo(this.map1);

        // default RGB layer http://106.51.3.224:6660/HERO_Ichawar/FULLORTHO/
        L.tileLayer(this.ortho_file_location_onLoad + '{z}/{x}/{y}.png', {
          // attribution: '© <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
          center: [this.lat, this.long],
          maxZoom: 22,
          // maxNativeZoom: 20
        }).addTo(this.map1);


        this.myLayer1 = L.tileLayer(this.thermal_location_onLoad_left + '{z}/{x}/{y}.png', {
          attribution: '© <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
          center: [this.center],
          maxZoom: 22,
          // maxNativeZoom: 20
        }).addTo(this.map1); //left side map

        this.myLayer2 = L.tileLayer(this.thermal_location_onLoad_right + '{z}/{x}/{y}.png', {
          attribution: '© <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
          center: [this.center],
          maxZoom: 22,
          // maxNativeZoom: 20
        }).addTo(this.map1) //right side map

        this.base_ortho_layer = L.control.sideBySide(this.myLayer1, this.myLayer2).addTo(this.map1);

      },
      (err: HttpErrorResponse) => {
        if (err.status == 401) {
          this.toastr.error("Login time expired. Please login again.")
          this.gotologin()
        }
      })

  }
  kmlnameleft(defect) {
    this.RemoveKml('remove')
    this.polies = []

    var kml_key = this.defects_data_left[defect]['key'].split(",")
    if (kml_key == 'Hotspot') {
      var color = "orange"
    } else if (kml_key == 'Short Circuit') {
      var color = "blue"
    } else if (kml_key == 'Open Circuit') {
      var color = "green"
    } else if (kml_key == 'By Pass Diode Issues') {
      var color = "yellow"
    } else if (kml_key == 'Dirt / Vegetation') {
      var color = "blue"
    } else if (kml_key == 'Multicell Hotspot') {
      var color = "red"
    } else if (kml_key == 'Others') {
      var color = "green"
    } else if (kml_key == 'Uniform Panel Heating') {
      var color = "lightred"
    } else if (kml_key == 'Module') {
      var color = "red"
    } else if (kml_key == 'Table') {
      var color = "black"
    } else if (kml_key == 'PID') {
      var color = "darkblue"
    } else if (kml_key == 'Panel Failure') {
      var color = "darkblue"
    }
    var formElement = document.getElementById("bgcolor1");
    formElement.style.backgroundColor = color;
    var formElement = document.getElementById("status_1");
    formElement.style.display = "flex";
    this.defect = this.defects_data_right[defect]['key']
    localStorage.setItem("kml_name", this.defects_data_right[defect]['kml'])


    var kml_name = this.defects_data_left[defect]['kml'].split(",")
    for (var i = 0; i < kml_name.length; i++) {

      fetch(this.kml_file_location_left + 'GLOBAL/' + kml_name[i] + '.kml')
        .then(res => res.text())
        .then(kmltext => {

          const parser = new DOMParser();
          const kml = parser.parseFromString(kmltext, 'text/xml');

          this.track = new L.KML(kml);

          var el = kml.getElementsByTagName('coordinates');
          var place = kml.getElementsByTagName('Placemark')

          let n = 0;
          let b
          let d

          for (var i in place) {
            let dec = place[i].childNodes[1].textContent
            let coor = place[i].getElementsByTagName('coordinates')
            let latlngArray = coor[0].textContent.replace(/\n/g, " ").split(/[ ,]+/).filter(Boolean)

            var polygonPoints = []
            let j = 1
            let k = 0
            let l = 2
            let iterate = latlngArray.length / 3

            for (let i = 0; i < iterate; i++) {
              polygonPoints.push([latlngArray[i + j], latlngArray[i + k], latlngArray[i + l]])
              j = j + 2;
              k = k + 2;
              l = l + 2
            }
            this.polygonMarkerCreating(latlngArray, color, dec)

          }
        })

    }
  }
  kmlnameright(defectright) {


    this.polies = []
    var kml_key = this.defects_data_right[defectright]['key'].split(",")
    if (kml_key == 'Hotspot') {
      var color = "green"
    } else if (kml_key == 'Short Circuit') {
      var color = "yellow"
    } else if (kml_key == 'Open Circuit') {
      var color = "red"
    } else if (kml_key == 'By Pass Diode Issues') {
      var color = "Blue"
    } else if (kml_key == 'Dirt / Vegetation') {
      var color = "yellow"
    } else if (kml_key == 'Multicell Hotspot') {
      var color = "green"
    } else if (kml_key == 'Others') {
      var color = "red"
    } else if (kml_key == 'Uniform Panel Heating') {
      var color = "darkblue"
    } else if (kml_key == 'Module') {
      var color = "green"
    } else if (kml_key == 'Table') {
      var color = "orange"
    } else if (kml_key == 'PID') {
      var color = "violet"
    } else if (kml_key == 'Panel Failure') {
      var color = "orange"
    }
    // this.right_color = color
    var formElement = document.getElementById("bgcolor2");
    formElement.style.backgroundColor = color;
    var formElement = document.getElementById("status_2");
    formElement.style.display = "flex";
    localStorage.setItem("kml_name", this.defects_data_right[defectright]['kml'])

    var kml_name = this.defects_data_right[defectright]['kml'].split(",")
    for (var i = 0; i < kml_name.length; i++) {

      fetch(this.kml_file_location_right + 'GLOBAL/' + kml_name[i] + '.kml')
        .then(res => res.text())
        .then(kmltext => {

          const parser = new DOMParser();
          const kml = parser.parseFromString(kmltext, 'text/xml');

          this.track = new L.KML(kml);

          var el = kml.getElementsByTagName('coordinates');
          var place = kml.getElementsByTagName('Placemark')

          let n = 0;
          let b
          let d

          for (var i in place) {
            let dec = place[i].childNodes[1].textContent
            let coor = place[i].getElementsByTagName('coordinates')
            let latlngArray = coor[0].textContent.replace(/\n/g, " ").split(/[ ,]+/).filter(Boolean)
            var pa = parser.parseFromString(dec, "text/html")
            let u = pa.getElementsByTagName("td")
            for (var r in u) {
              if (n % 2 == 0) {
                b = u[r].textContent;
              }
              else {
                if (b == "Defect:") {
                  d = b;
                  this.table_no = u[r].textContent;

                }

              }
              n++
            }
            var polygonPoints = []
            let j = 1
            let k = 0
            let l = 2
            let iterate = latlngArray.length / 3

            for (let i = 0; i < iterate; i++) {
              polygonPoints.push([latlngArray[i + j], latlngArray[i + k], latlngArray[i + l]])
              j = j + 2;
              k = k + 2;
              l = l + 2
            }
            // this.myLayer4 = L.polygon(polygonPoints, { color: color }, { weight: 6 })
            this.polygonMarkerCreating(latlngArray, color, dec)

            // this.myLayer4.addTo(this.map1)
            // this.myLayer2.addLayer(this.myLayer4)
            //
          }
          // Adjust map to show the kml
          const bounds = this.track.getBounds();
          this.map1.fitBounds(bounds);


          this.map1.on('click', (e) => {
            // this.popupDesc = localStorage.getItem('kml_popup_node');
            // this.loadPopUpContent(this.popupKml, this.popupDesc);
          })
        })
    }
  }
  gotologin(){
    this.router.navigate(['auth/login'])
   }


  polygonMarkerCreating(lat, col, dec) {
    var proj_name = localStorage.getItem('name')
    var polygonPoints = []
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
    var project_feature_show = proj_name.includes("Sudair")
    if (project_feature_show) {
      var kml_name = localStorage.getItem("kml_name")
      var kml_name_for_spotheight = kml_name.includes("Spotheight")

      if (kml_name == "Transmission_Tower" || kml_name == "Benchmark") {
        this.poly = L.polygon(polygonPoints, { color: col }, { weight: 6 }).addTo(this.map1);
      } else {
        this.poly = L.polyline(polygonPoints, { color: col }, { weight: 6 }).addTo(this.map1);

      }
      if (kml_name_for_spotheight) {
        this.poly = L.polygon(polygonPoints, { color: col }, { weight: 6 }).addTo(this.map1);

      }

    } else {
      this.poly = L.polygon(polygonPoints, { color: col }, { weight: 6 }).addTo(this.map1);
    }
    this.polies.push(this.poly)
    this.poly.on("click", (e) => {
      const parser = new DOMParser();
      var markup = parser.parseFromString(dec, "text/html");
      // var markup_img = parser.parseFromString(dec, "image/svg+xml");
      var y = markup.getElementsByTagName("td");
      let i = 0;
      let s = 0;
      let b = null;
      let d = null;
      this.descObj = {};
      this.descObj_cadestral = {};
      b = "";

      if (y.length > 0) {

        for (var t = 0; t < y.length; t++) {
          if (this.current_kml_data == "cadastral_map") {
            if ((y[t].textContent == "" || y[t].textContent == undefined) && (y[t].lastChild['tagName'] == "IMG")) {
              let image_src = y[t].lastChild['src']

              this.descObj_cadestral[b] = image_src
              s++;

            } else {

              if (i % 2 == 0) {
                b = y[t].textContent;
              } else {
                if (b == "Table No") {
                  d = b;
                  this.table_no = y[t].textContent;
                } else {
                  let c = y[t].textContent;
                  this.descObj_cadestral[b] = c;

                }
              }
              i++;
            }
          } else if (this.current_kml_data == "Grading") {
            if (t == 0) {
              b = y[t].textContent;
            } else {
              if (b == "Table No") {
                d = b;
                var userArray_Distance = []
                var userArray_value = []
                this.table_no = y[t].textContent;

              }
            }


          } else {
            if ((y[t].textContent == "" || y[t].textContent == undefined) && (y[t].lastChild['tagName'] == "IMG")) {
              let image_src = y[t].lastChild['src']

              this.descObj[b] = image_src
              s++;

            } else {

              if (i % 2 == 0) {
                b = y[t].textContent;
              } else {
                if (b == "Table No") {
                  d = b;
                  this.table_no = y[t].textContent;
                } else {
                  let c = y[t].textContent;
                  this.descObj[b] = c;

                }
              }
              i++;
            }
          }
          // this.subdefects_visibility = "visible"

        }
      } else {
        this.descObj_cadestral["Description"] = dec
      }
      if (this.current_kml_data == "cadastral_map") {

        var popup = L.popup({
          closePopupOnClick: true,
          autoClose: true
        })
          .setLatLng([e["latlng"]["lat"], e["latlng"]["lng"]])
          .setContent(dec)
          .openOn(this.map1);

        this.popup_opened = true

      } else if (this.current_kml_data == "Grading") {
        this.loadPopUpContent_grading(this.table_no)
        // this.loadPopUpContent_grading(userArray_value, dec)
        // this.loadPopUpContent_grading(userArray_value,userArray_Distance,dec)

      } else {
        this.loadPopUpContent(this.descObj)

      }
    });

    // this.polies.push(this.poly)


  }

  loadPopUpContent(dec_obj) {
    this.popup_card_visibility = true;
    this.popup_card_visibility_cadestral = false;
    if (dec_obj != "") {


      selected_point.clearLayers();

      this.ITC_No = dec_obj['Inverter No:']
      this.Tableno = dec_obj['Table No:']
      this.defects = dec_obj['Defect:']
      this.Description = dec_obj['Description:']
      this.popup_lat = dec_obj['Latitude:']
      this.popup_lng = dec_obj['Longitude:']
      this.Max_temp = dec_obj['Maximum Temperature:']
      this.Min_temp = dec_obj['Minimum Temperature:']
      this.Module_no = dec_obj['Module No:']
      this.thermal_img = dec_obj['Thermal Image']

      // this.Thermal_Image_src = markup.getElementsByTagName('img')[0].getAttribute('src');

      // this.marker = L.marker([this.popup_lat, this.popup_lng])
      // selected_point.addLayer(this.marker).addTo(this.map1);

    }
  }
  loadPopUpContent_grading(table_no) {
    this.grading_visibility = "visible"

  }
  close_popup_card() {

    this.popup_card_visibility = false;
    this.popup_card_visibility_cadestral = false;
    this.popup_card_visibility_grading = false;
  }
  RemoveKml(value: any) {
    // this.zoomreset()
    // this.remove_Popup_card()

    // if (this.summaryLayerGroup !== null) {


    //   for (var n in this.removekml_list) {
    //     this.map.removeLayer(this.removekml_list[n])
    //   }
    //   for (var n in this.removekml_list_inv) {
    //     this.map.removeLayer(this.removekml_list_inv[n])
    //   }

    // }
    for (var l in this.polies) {
      this.map1.removeLayer(this.polies[l])
    }


    // this.map1.removeLayer(this.gb_layer);
  }
  // Date wise and visibility wise Change layer right
  selectChangeright(dateright) {

    if (this.isShown_right == false) {
      this.defects_data_right = []
      this.datevalue_right = dateright;
      // this.ortho_file_location_onLoad_right = "";
      this.Project_layer_summary = Object.keys(this.main_data['processed_data'][this.datevalue_right]['summary_layers'])
      // this.ortho_file_location_onLoad_right =this.main_data['processed_data'][this.datevalue_right]['ortho_file_location']
      this.thermal_location_onLoad_right = this.main_data['processed_data'][this.datevalue_right]['thermal_location']

      for (var key in this.main_data['processed_data'][this.datevalue_right]['summary_layers']) {
        if (this.defects_data_right.indexOf(key) === -1) {
          this.defects_data_right.push({ key: key, "kml": this.main_data['processed_data'][this.datevalue_right]['summary_layers'][key]['kml'], "color": this.main_data['processed_data'][this.datevalue_right]['summary_layers'][key]['color'] });
        }
        for (var sub_group in this.main_data['processed_data'][this.datevalue_right]['summary_layers'][key]['sub_group']) {

          this.defects_data_right.push({ key: sub_group, "kml": this.main_data['processed_data'][this.datevalue_right]['summary_layers'][key]['sub_group'][sub_group]['kml'], "color": this.main_data['processed_data'][this.datevalue_right]['summary_layers'][key]['sub_group'][sub_group]['color'] });


        }

      }
      // this.kmlnameleft(0)
      // this.kmlnameright(0)

      // var myLayer1 = L.tileLayer('{z}/{x}/{y}.png',{}).addTo(this.map1); //right side map
      this.map1.remove(this.base_ortho_layer);
      this.map1 = L.map('compare_map', {
        attributionControl: false
      }).setView([this.lat, this.long], 17);


      L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
      }).addTo(this.map1);
      L.tileLayer(this.ortho_file_location_onLoad + '{z}/{x}/{y}.png', {
        center: [this.lat, this.long],
        maxZoom: 22,
        // maxNativeZoom: 20
      }).addTo(this.map1);
      this.myLayer1 = L.tileLayer(this.thermal_location_onLoad_left + '{z}/{x}/{y}.png', {
        attribution: '© <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
        center: [this.center],
        maxZoom: 22,
        // maxNativeZoom: 20
      }).addTo(this.map1)
      this.myLayer2 = L.tileLayer(this.thermal_location_onLoad_right + '{z}/{x}/{y}.png', {
        attribution: '© <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
        center: [this.center],
        maxZoom: 22,
        // maxNativeZoom: 20
      }).addTo(this.map1) //right side map
      this.base_ortho_layer = L.control.sideBySide(this.myLayer1, this.myLayer2).addTo(this.map1);
    } else {

      this.datevalue_right = dateright;
      // this.ortho_file_location_onLoad_right = "";
      this.Project_layer_summary = Object.keys(this.main_data['processed_data'][this.datevalue_right]['summary_layers'])
      // this.ortho_file_location_onLoad_right =this.main_data['processed_data'][this.datevalue_right]['ortho_file_location']
      this.thermal_location_onLoad_right = this.main_data['processed_data'][this.datevalue_right]['thermal_location']

      // var myLayer1 = L.tileLayer('{z}/{x}/{y}.png',{}).addTo(this.map1); //right side map
      this.map1.remove(this.base_ortho_layer);
      this.map1 = L.map('compare_map', {
        attributionControl: false
      }).setView([this.lat, this.long], 17);

      L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
      }).addTo(this.map1);
      L.tileLayer(this.ortho_file_location_onLoad + '{z}/{x}/{y}.png', {
        center: [this.lat, this.long],
        maxZoom: 22,
        // maxNativeZoom: 20
      }).addTo(this.map1);
      this.myLayer1 = L.tileLayer(this.thermal_location_onLoad_left + '{z}/{x}/{y}.png', {
        attribution: '© <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
        center: [this.center],
        maxZoom: 22,
        // maxNativeZoom: 20
      }).addTo(this.map1)
      this.myLayer2 = L.tileLayer('{z}/{x}/{y}.png', {
        attribution: '© <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
        center: [this.center],
        maxZoom: 22,
        // maxNativeZoom: 20
      }).addTo(this.map1) //right side map
      this.base_ortho_layer = L.control.sideBySide(this.myLayer1, this.myLayer2).addTo(this.map1);
    }


  }

  zoomin() {
    this.map1.setZoom(this.map1.getZoom() + 1)
  }


  zoomout() {
    this.map1.setZoom(this.map1.getZoom() - 1)
  }

  // visibility wise Change layer right

  thermal_layer_right() {
    // this.isShown_left = true
    if (this.isShown_right == false) {
      this.datevalue_right = this.dateright;
      // this.ortho_file_location_onLoad_right = "";
      this.Project_layer_summary = Object.keys(this.main_data['processed_data'][this.datevalue_right]['summary_layers'])
      // this.ortho_file_location_onLoad_right =this.main_data['processed_data'][this.datevalue_right]['ortho_file_location']
      this.thermal_location_onLoad_right = this.main_data['processed_data'][this.datevalue_right]['thermal_location']

      // var myLayer1 = L.tileLayer('{z}/{x}/{y}.png',{}).addTo(this.map1); //right side map
      this.map1.remove(this.base_ortho_layer);
      this.map1 = L.map('compare_map', {
        attributionControl: false
      }).setView([this.lat, this.long], 17);


      L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
      }).addTo(this.map1);
      L.tileLayer(this.ortho_file_location_onLoad + '{z}/{x}/{y}.png', {
        center: [this.lat, this.long],
        maxZoom: 22,
        // maxNativeZoom: 20
      }).addTo(this.map1);
      this.myLayer1 = L.tileLayer(this.thermal_location_onLoad_left + '{z}/{x}/{y}.png', {
        attribution: '© <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
        center: [this.center],
        maxZoom: 22,
        // maxNativeZoom: 20
      }).addTo(this.map1)
      this.myLayer2 = L.tileLayer('{z}/{x}/{y}.png', {
        attribution: '© <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
        center: [this.center],
        maxZoom: 22,
        // maxNativeZoom: 20
      }).addTo(this.map1) //right side map
      this.base_ortho_layer = L.control.sideBySide(this.myLayer1, this.myLayer2).addTo(this.map1);


      this.isShown_right = true

    } else {
      this.datevalue_right = this.dateright;
      // this.ortho_file_location_onLoad_right = "";
      this.Project_layer_summary = Object.keys(this.main_data['processed_data'][this.datevalue_right]['summary_layers'])
      // this.ortho_file_location_onLoad_right =this.main_data['processed_data'][this.datevalue_right]['ortho_file_location']
      this.thermal_location_onLoad_right = this.main_data['processed_data'][this.datevalue_right]['thermal_location']

      // var myLayer1 = L.tileLayer('{z}/{x}/{y}.png',{}).addTo(this.map1); //right side map
      this.map1.remove(this.base_ortho_layer);
      this.map1 = L.map('compare_map', {
        attributionControl: false
      }).setView([this.lat, this.long], 17);

      L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
      }).addTo(this.map1);
      L.tileLayer(this.ortho_file_location_onLoad + '{z}/{x}/{y}.png', {
        center: [this.lat, this.long],
        maxZoom: 22,
        // maxNativeZoom: 20
      }).addTo(this.map1);
      this.myLayer1 = L.tileLayer(this.thermal_location_onLoad_left + '{z}/{x}/{y}.png', {
        attribution: '© <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
        center: [this.center],
        maxZoom: 22,
        // maxNativeZoom: 20
      }).addTo(this.map1)
      this.myLayer2 = L.tileLayer(this.thermal_location_onLoad_right + '{z}/{x}/{y}.png', {
        attribution: '© <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
        center: [this.center],
        maxZoom: 22,
        // maxNativeZoom: 20
      }).addTo(this.map1) //right side map
      this.base_ortho_layer = L.control.sideBySide(this.myLayer1, this.myLayer2).addTo(this.map1);
      this.isShown_right = false

    }
  }

  // Date wise and visibility wise Change layer left
  selectChangeleft(dateleft) {
    if (this.isShown_left == false) {
      this.defects_data_left = []
      this.datevalue_left = dateleft;
      this.Project_layer_summary = Object.keys(this.main_data['processed_data'][this.datevalue_left]['summary_layers'])
      this.thermal_location_onLoad_left = this.main_data['processed_data'][this.datevalue_left]['thermal_location']
      // this.ortho_file_location_onLoad =this.main_data['processed_data'][this.datevalue_left]['ortho_file_location']

      for (var key in this.main_data['processed_data'][this.datevalue_left]['summary_layers']) {
        // this.keys.push(key)
        if (this.defects_data_left.indexOf(key) === -1) {
          this.defects_data_left.push({ key: key, "kml": this.main_data['processed_data'][this.datevalue_left]['summary_layers'][key]['kml'], "color": this.main_data['processed_data'][this.datevalue_left]['summary_layers'][key]['color'] });
        }
        for (var sub_group in this.main_data['processed_data'][this.datevalue_left]['summary_layers'][key]['sub_group']) {
          this.defects_data_left.push({ key: sub_group, "kml": this.main_data['processed_data'][this.datevalue_left]['summary_layers'][key]['sub_group'][sub_group]['kml'], "color": this.main_data['processed_data'][this.datevalue_left]['summary_layers'][key]['sub_group'][sub_group]['color'] });

        }

      }

      this.map1.remove(this.base_ortho_layer);
      this.map1 = L.map('compare_map', {
        attributionControl: false
      }).setView([this.lat, this.long], 17);

      L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
      }).addTo(this.map1);
      L.tileLayer(this.ortho_file_location_onLoad + '{z}/{x}/{y}.png', {
        center: [this.lat, this.long],
        maxZoom: 22,
        // maxNativeZoom: 20
      }).addTo(this.map1);
      this.myLayer2 = L.tileLayer(this.thermal_location_onLoad_right + '{z}/{x}/{y}.png', {
        attribution: '© <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
        center: [this.center],
        maxZoom: 22,
        // maxNativeZoom: 20
      }).addTo(this.map1)
      this.myLayer1 = L.tileLayer(this.thermal_location_onLoad_left + '{z}/{x}/{y}.png', {
        attribution: '© <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
        center: [this.center],
        maxZoom: 22,
        // maxNativeZoom: 20
      }).addTo(this.map1);   //left side map
      this.base_ortho_layer = L.control.sideBySide(this.myLayer1, this.myLayer2).addTo(this.map1);
    }
    else {
      this.datevalue_left = dateleft;
      this.Project_layer_summary = Object.keys(this.main_data['processed_data'][this.datevalue_left]['summary_layers'])
      this.thermal_location_onLoad_left = this.main_data['processed_data'][this.datevalue_left]['thermal_location']
      // this.ortho_file_location_onLoad =this.main_data['processed_data'][this.datevalue_left]['ortho_file_location']

      this.map1.remove(this.base_ortho_layer);
      this.map1 = L.map('compare_map', {
        attributionControl: false
      }).setView([this.lat, this.long], 17);

      L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
      }).addTo(this.map1);
      L.tileLayer(this.ortho_file_location_onLoad + '{z}/{x}/{y}.png', {
        center: [this.lat, this.long],
        maxZoom: 22,
        // maxNativeZoom: 20
      }).addTo(this.map1);
      this.myLayer2 = L.tileLayer(this.thermal_location_onLoad_right + '{z}/{x}/{y}.png', {
        attribution: '© <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
        center: [this.center],
        maxZoom: 22,
        // maxNativeZoom: 20
      }).addTo(this.map1)
      this.myLayer1 = L.tileLayer('{z}/{x}/{y}.png', {
        attribution: '© <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
        center: [this.center],
        maxZoom: 22,
        // maxNativeZoom: 20
      }).addTo(this.map1);   //left side map
      this.base_ortho_layer = L.control.sideBySide(this.myLayer1, this.myLayer2).addTo(this.map1);
    }
  }

  // visibility wise Change layer left
  thermal_layer_left() {

    // this.isShown_left = true
    if (this.isShown_left == false) {
      this.datevalue_left = this.dateleft;
      this.Project_layer_summary = Object.keys(this.main_data['processed_data'][this.datevalue_left]['summary_layers'])
      this.thermal_location_onLoad_left = this.main_data['processed_data'][this.datevalue_left]['thermal_location']
      // this.ortho_file_location_onLoad =this.main_data['processed_data'][this.datevalue_left]['ortho_file_location']

      this.map1.remove(this.base_ortho_layer);
      this.map1 = L.map('compare_map', {
        attributionControl: false
      }).setView([this.lat, this.long], 17);

      L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
      }).addTo(this.map1);
      L.tileLayer(this.ortho_file_location_onLoad + '{z}/{x}/{y}.png', {
        center: [this.lat, this.long],
        maxZoom: 22,
        // maxNativeZoom: 20
      }).addTo(this.map1);
      this.myLayer2 = L.tileLayer(this.thermal_location_onLoad_right + '{z}/{x}/{y}.png', {
        attribution: '© <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
        center: [this.center],
        maxZoom: 22,
        // maxNativeZoom: 20
      }).addTo(this.map1)
      this.myLayer1 = L.tileLayer('{z}/{x}/{y}.png', {
        attribution: '© <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
        center: [this.center],
        maxZoom: 22,
        // maxNativeZoom: 20
      }).addTo(this.map1);   //left side map
      this.base_ortho_layer = L.control.sideBySide(this.myLayer1, this.myLayer2).addTo(this.map1);
      this.isShown_left = true

    } else {
      this.datevalue_left = this.dateleft;
      this.Project_layer_summary = Object.keys(this.main_data['processed_data'][this.datevalue_left]['summary_layers'])
      this.thermal_location_onLoad_left = this.main_data['processed_data'][this.datevalue_left]['thermal_location']
      // this.ortho_file_location_onLoad =this.main_data['processed_data'][this.datevalue_left]['ortho_file_location']

      this.map1.remove(this.base_ortho_layer);
      this.map1 = L.map('compare_map', {
        attributionControl: false
      }).setView([this.lat, this.long], 17);

      L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
      }).addTo(this.map1);
      L.tileLayer(this.ortho_file_location_onLoad + '{z}/{x}/{y}.png', {
        center: [this.lat, this.long],
        maxZoom: 22,
        // maxNativeZoom: 20
      }).addTo(this.map1);
      this.myLayer2 = L.tileLayer(this.thermal_location_onLoad_right + '{z}/{x}/{y}.png', {
        attribution: '© <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
        center: [this.center],
        maxZoom: 22,
        // maxNativeZoom: 20
      }).addTo(this.map1)
      this.myLayer1 = L.tileLayer(this.thermal_location_onLoad_left + '{z}/{x}/{y}.png', {
        attribution: '© <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
        center: [this.center],
        maxZoom: 22,
        // maxNativeZoom: 20
      }).addTo(this.map1);   //left side map
      this.base_ortho_layer = L.control.sideBySide(this.myLayer1, this.myLayer2).addTo(this.map1);
      this.isShown_left = false

    }
  }

}
