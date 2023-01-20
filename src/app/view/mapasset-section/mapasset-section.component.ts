import { Component, OnInit, ViewChild } from '@angular/core';
// Leaflet declarations and imports
import 'leaflet';
import 'leaflet-kml';
import { Observable } from 'rxjs';
import { HttpAssetService } from './services-assetmap/http.assetservice';
import { Subject } from "rxjs";
import {
  ChartComponent,
  ApexNonAxisChartSeries,
  ApexPlotOptions,
  ApexChart,
  ApexLegend,
  ApexResponsive,
  ApexTheme,
  ApexTitleSubtitle,
  ApexAxisChartSeries,
  ApexDataLabels,
  ApexXAxis,
  ApexYAxis,
  ApexFill,
  ApexStroke,
  ApexTooltip,
  ApexGrid,
} from "ng-apexcharts";
import { environment } from 'src/environments/environment';
import { ToastrService } from 'ngx-toastr';
import { MatDialog } from '@angular/material/dialog';
import { RawImageComponent } from '../map-section/raw-image/raw-image.component';
import { HttpService } from '../map-section/services-map/http.service';

export type ChartOptions = {
  series: ApexNonAxisChartSeries;
  chart: ApexChart;
  labels: string[];
  colors: string[];
  legend: ApexLegend;
  plotOptions: ApexPlotOptions;
};
declare var require: any
// require('leaflet-side-by-side');

declare const L: any;

var selected_point = new L.LayerGroup();

@Component({
  selector: 'app-mapasset-section',
  templateUrl: './mapasset-section.component.html',
  styleUrls: ['./mapasset-section.component.css']
})
export class MapassetSectionComponent implements OnInit {

  @ViewChild("chart") chart: ChartComponent;
  public chartOptions: Partial<ChartOptions>;

  public map = null;
  center: any;
  Date: any;
  main_data: any;
  projectdata: any;
  ortho_RGB: any;
  summary_data: any;
  ortho_DSM: any;
  KML_location: any;
  ortho_AC_CAD: any;
  ortho_DC_CAD: any;
  inverter_data: any;
  rgb_layer: any;
  Date_list: any;
  project_name: any;
  satelliteview: any;
  satellite = '../../../assets/images/satellite.jpg'
  default = '../../../assets/images/default.jpg'
  lat: any;
  long: any;
  satellite_layer: any;
  checked: boolean;
  Typewise_data: any;
  resetFormSubject: Subject<boolean> = new Subject<boolean>();
  current_kml_data: any;
  gb_layer: any;
  summaryLayerGroup: any;
  removekml_list: any;
  polies: any = [];
  summaryState: any;
  table_no: string;
  track: any;
  poly: any;
  descObj: {};
  popupKml: Document;
  kml_file_path: string;
  pop_up_header: any;
  removekml_list_inv: any = [];
  popup_card_visibility: boolean;
  popup_card_info: boolean;
  pop_up_Actual: any;
  pop_up_planned: any;
  Actual_by_planned: any;
  location: any;
  description: any;
  accepted: boolean;
  accepted1: boolean;
  accepted3: boolean;
  AC_cad_layer: any;
  DC_cad_layer: any;
  uploaded_raw_image: any;
  mission: string;
  flight: string;
  mission_data: any[] = [];
  markers: any;
  marker_data: any[] = [];
  zoom_map: any;
  public get_missions_flights_data: any;
  public get_missions_flights_status: any;



  constructor(private _http: HttpAssetService,private _http_: HttpService, private toastr: ToastrService, public dialog: MatDialog) { }

  ngOnInit(): void {
    sessionStorage.setItem('rawImage', 'rawImage');
    var new_center = localStorage.getItem('center')
    if (new_center != '') {
      this.center = new_center
    } else {
      this.center = this.center
    }
    // // alert("--afet center----"+this.center)
    var str_center = this.center.split(",");
    this.lat = str_center[0];
    this.long = str_center[1];
    var zoom_level = 15

    // Initiallize the Map
    this.map = L.map('Assetmap', {
      attributionControl: false,
      zoomControl: false,
      minZoom: 1,
      maxZoom: 22,
      // ... other options
    }).setView([this.lat, this.long], zoom_level);



    // console.log(this.map)

    this.checked = false
    localStorage.setItem('product', 'asset')
    this.Date = localStorage.getItem('date')
    localStorage.setItem('satellite', 'satellite')

    this._http.Asset_project().subscribe(data => {
      this.main_data = data['data']
      // console.log(this.main_data)
      this.projectdata = this.main_data['projectdata']
      this.project_name = this.main_data['name']
      this.Date_list = Object.keys(this.main_data['projectdata'])
      this.Typewise_data = this.main_data['projectdata'][this.Date]['SCPM']
      this._http.setAsset_data(this.Typewise_data)


      // // console.log(this.map)
      // default MAP layer

      L.tileLayer('https://tile.osm.ch/switzerland/{z}/{x}/{y}{r}.png', {
        // L.tileLayer('https://{s}.basemaps.cartocdn.com/rastertiles/voyager_nolabels/{z}/{x}/{y}{r}.png', {
        maxZoom: 22,
        maxNativeZoom: 19,
        attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
      }).addTo(this.map);
      this.onload_get_mission_flights()
      this.onload('SCPM')

    });
  }


  projectInfo(event) {
    this.popup_card_info = true
    this.location = event.location
    this.description = event.description

  }

  close_popup_card() {
    if (this.popup_card_info) {
      this.popup_card_info = false
    }
    if (this.popup_card_visibility) {
      this.popup_card_visibility = false;
      this.RemoveKml('remove')
    }
  }

  RemoveKml(value: any) {

    if (this.summaryLayerGroup !== null) {


      for (var n in this.removekml_list) {
        this.map.removeLayer(this.removekml_list[n])
      }
      for (var n in this.removekml_list_inv) {
        this.map.removeLayer(this.removekml_list_inv[n])
      }

    }
    for (var l in this.polies) {
      this.map.removeLayer(this.polies[l])
    }



    if (this.gb_layer) {
      this.map.removeLayer(this.gb_layer);
    }


    // this.map.removeLayer(this.gb_layer);
  }

  onload(type) {
    sessionStorage.setItem('type', type)
    sessionStorage.setItem('ac_cad', 'ac_cad');
    sessionStorage.setItem('dc_cad', 'dc_cad');
    if (this.rgb_layer) {
      this.map.removeLayer(this.rgb_layer)
    }
    this.ortho_RGB = this.main_data['projectdata'][this.Date][type]['project_properties']['ortho']['RGB']
    this.ortho_DSM = this.main_data['projectdata'][this.Date][type]['project_properties']['ortho']['DSM']
    this.KML_location = this.main_data['projectdata'][this.Date][type]['project_properties']['kml']
    this.ortho_AC_CAD = this.main_data['projectdata'][this.Date][type]['project_properties']['CAD']['AC_CAD']
    this.ortho_DC_CAD = this.main_data['projectdata'][this.Date][type]['project_properties']['CAD']['DC_CAD']
    this.Typewise_data = this.main_data['projectdata'][this.Date][type]
    if (type == 'SCPM') {

      this.resetFormSubject.next(true);
      this.summary_data = this.main_data['projectdata'][this.Date][type]['summary']
      this.inverter_data = this.main_data['projectdata'][this.Date][type]['inverter']

    } else if (type == 'SCQM') {

      this.summary_data = this.main_data['projectdata'][this.Date][type]['deviation']
      this.inverter_data = this.main_data['projectdata'][this.Date][type]['inverter_deviation']

    }

    this._http.setAsset_data(this.Typewise_data)

    this.rgb_layer = L.tileLayer(this.ortho_RGB + '{z}/{x}/{y}.png', {
      attribution: '© <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
      center: [this.lat, this.long],
      minZoom: 1,
      maxZoom: 22,
      // maxNativeZoom: 18
    }).addTo(this.map);

    // })
  }

  ChangeDate(date) {
    // alert(date)
    this.Date = date
    localStorage.setItem('date', date)
    this.checked = false
    this.resetFormSubject.next(true);
    this.onload('SCPM')
  }
  Loadkml(value: any) {
    // // console.log(value.menu)

    if (value.menu == 'summary') {
      var x = value.menu
      sessionStorage.setItem("mode", x)
      this.current_kml_data = value.menu

      // alert(x)
      // to remove existing inverter gb kml
      if (this.gb_layer != null) {

        this.map.removeLayer(this.gb_layer);
      }
      if (this.summaryLayerGroup !== null) {

        for (var n in this.removekml_list) {
          this.map.removeLayer(this.removekml_list[n])
        }
      }
      for (var l in this.polies) {
        this.map.removeLayer(this.polies[l])
      }


      // // console.log(value)
      // // console.log(value.kml_list)
      // // console.log(value.kml_list.length)
      var match_color = ''
      value.color.forEach(element => {
        match_color = match_color.concat(element, ",")
      });
      // // console.log(match_color)
      var matches = ''
      value.kml_list.forEach(element => {
        var getTheValueWithIndex = element.valueOf();
        matches = matches.concat(getTheValueWithIndex, ",")
      });
      // var matches = value.kml_list.match(/\[(.*?)\]/);
      this.summaryState = matches;
      // // console.log(this.summaryState)


      localStorage.setItem("kml_name", this.summaryState)

      var kml_name_load = this.summaryState.split(",")
      var temp = kml_name_load.pop() // for removing last empty value
      // alert(kml_name_load.length)
      sessionStorage.setItem("kmlfilename", this.summaryState)
      var count = -1
      for (var i = 0; i < kml_name_load.length; i++) {
        // // console.log(this.KML_location + 'summary/' + kml_name_load[i])
        fetch(this.KML_location + 'summary/' + kml_name_load[i] + "")
          .then(res => res.text())
          .then(kmltext => {

            count = count + 1;

            // Create new kml overlay
            // Create new kml overlay
            const parser = new DOMParser();
            const kml = parser.parseFromString(kmltext, 'text/xml');

            this.track = new L.KML(kml);
            // // console.log(kml)
            // Add track to map
            //this.summaryLayerGroup = L.layerGroup([this.track]).addTo(this.map);
            //this.map.addLayer(this.track)
            this.popupKml = kml
            var el = kml.getElementsByTagName('coordinates');
            var place = kml.getElementsByTagName('Placemark')
            // // console.log(place)
            this.pop_up_header = value.name
            for (var each in place) {
              let desc = place[each].childNodes[1].textContent
              let coor = place[each].getElementsByTagName('coordinates')
              // // console.log(coor)
              //let latlngArray = each.childNodes[5].childNodes[1].childNodes[1].childNodes[1].textContent.replace( /\n/g, " " ).split(/[ ,]+/).filter(Boolean)
              let latlngArray = coor[0].textContent.replace(/\n/g, " ").split(/[ ,]+/).filter(Boolean)
              // // console.log(latlngArray)
              // // console.log(i)
              // // console.log(match_color)
              function decToHex(value) {
                if (value > 255) {
                  return 'ff';
                } else if (value <= 0) {
                  return '00';
                } else {
                  return value.toString(16).padStart(2, '0').toLowerCase();
                }
              }
              function rgbToHex(r, g, b) {
                return '#' + decToHex(r) + decToHex(g) + decToHex(b);
              }

              var matchColors = /\(([^)]+)\)/;
              var match = matchColors.exec(value.color[count]);
              var color = match[1].split(", ")
              // // console.log(count+"count--------------------------"+typeof parseInt(color[0]), parseInt(color[1]), parseInt(color[2]))
              var hex = rgbToHex(parseInt(color[0]), parseInt(color[1]), parseInt(color[2]));
              // // console.log(hex)
              this.polygonMarkerCreating(place[each], latlngArray, hex, desc, value.name);
            }
            // Adjust map to show the kml
            // const bounds = this.track.getBounds();
            // this.map.fitBounds(bounds);
          });
        this.map.on('click', (e) => {
          // console.log("reg");
          // console.log(e);
        })
      }
    } else if (value.menu == 'summary_subgroup') {
      var x = value.menu
      sessionStorage.setItem("mode", x)
      this.current_kml_data = value.menu

      // alert(x)
      // to remove existing inverter gb kml
      if (this.gb_layer != null) {

        this.map.removeLayer(this.gb_layer);
      }
      if (this.summaryLayerGroup !== null) {

        for (var n in this.removekml_list) {
          this.map.removeLayer(this.removekml_list[n])
        }
      }
      for (var l in this.polies) {
        this.map.removeLayer(this.polies[l])
      }


      // // console.log(value)
      // // console.log(value.kml_list)
      // // console.log(value.kml_list.length)

      this.popup_card_visibility = true

      this.Popup_Card(value)

      var match_color = ''
      value.color.forEach(element => {
        match_color = match_color.concat(element, ",")
      });
      // // console.log(match_color)
      var matches = ''
      value.kml_list.forEach(element => {
        var getTheValueWithIndex = element.valueOf();
        matches = matches.concat(getTheValueWithIndex, ",")
      });
      // var matches = value.kml_list.match(/\[(.*?)\]/);
      this.summaryState = matches;
      // // console.log(this.summaryState)


      localStorage.setItem("kml_name", this.summaryState)

      var kml_name_load = this.summaryState.split(",")
      var temp = kml_name_load.pop() // for removing last empty value
      // alert(kml_name_load.length)
      sessionStorage.setItem("kmlfilename", this.summaryState)
      var count = -1
      for (var i = 0; i < kml_name_load.length; i++) {
        // // console.log(this.KML_location + 'summary/' + kml_name_load[i])
        fetch(this.KML_location + 'summary/' + kml_name_load[i] + "")
          .then(res => res.text())
          .then(kmltext => {

            count = count + 1;

            // Create new kml overlay
            // Create new kml overlay
            const parser = new DOMParser();
            const kml = parser.parseFromString(kmltext, 'text/xml');

            this.track = new L.KML(kml);
            // // console.log(kml)
            // Add track to map
            //this.summaryLayerGroup = L.layerGroup([this.track]).addTo(this.map);
            //this.map.addLayer(this.track)
            this.popupKml = kml
            var el = kml.getElementsByTagName('coordinates');
            var place = kml.getElementsByTagName('Placemark')
            // // console.log(place)
            for (var each in place) {
              let desc = place[each].childNodes[1].textContent
              let coor = place[each].getElementsByTagName('coordinates')
              // // console.log(coor)
              //let latlngArray = each.childNodes[5].childNodes[1].childNodes[1].childNodes[1].textContent.replace( /\n/g, " " ).split(/[ ,]+/).filter(Boolean)
              let latlngArray = coor[0].textContent.replace(/\n/g, " ").split(/[ ,]+/).filter(Boolean)
              // // console.log(latlngArray)
              // // console.log(i)
              // // console.log(match_color)
              function decToHex(value) {
                if (value > 255) {
                  return 'ff';
                } else if (value <= 0) {
                  return '00';
                } else {
                  return value.toString(16).padStart(2, '0').toLowerCase();
                }
              }
              function rgbToHex(r, g, b) {
                return '#' + decToHex(r) + decToHex(g) + decToHex(b);
              }

              var matchColors = /\(([^)]+)\)/;
              var match = matchColors.exec(value.color[count]);
              var color = match[1].split(", ")
              // // console.log(count+"count--------------------------"+typeof parseInt(color[0]), parseInt(color[1]), parseInt(color[2]))
              var hex = rgbToHex(parseInt(color[0]), parseInt(color[1]), parseInt(color[2]));
              // // console.log(hex)
              this.polygonMarkerCreating(place[each], latlngArray, hex, desc, value.name);
            }
            // Adjust map to show the kml
            // const bounds = this.track.getBounds();
            // this.map.fitBounds(bounds);
          });
        this.map.on('click', (e) => {
          // console.log("reg");
          // console.log(e);
        })
      }
    }
  }

  ViewMenu(value) {
    if (value == "AC_CAD") {
      var ac_cad = sessionStorage.getItem('ac_cad');

      if (ac_cad == "ac_cad") {
        this.accepted = true
        sessionStorage.setItem('ac_cad', 'none');
        this.AC_cad_layer = L.tileLayer(this.ortho_AC_CAD + '{z}/{x}/{y}.png', {
          attribution: '© <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
          center: [this.center],
          minZoom: 1,
          maxZoom: 22,
          // maxNativeZoom: 20
        }).addTo(this.map);

      } else {
        this.accepted = false
        sessionStorage.setItem('ac_cad', 'ac_cad');
        this.map.removeLayer(this.AC_cad_layer);
      }

    } else if (value == "DC_CAD") {

      var dc_cad = sessionStorage.getItem('dc_cad');

      if (dc_cad == "dc_cad") {
        this.accepted1 = true
        sessionStorage.setItem('dc_cad', 'none');

        this.DC_cad_layer = L.tileLayer(this.ortho_DC_CAD + '{z}/{x}/{y}.png', {
          attribution: '© <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
          center: [this.center],
          minZoom: 1,
          maxZoom: 22,
          // maxNativeZoom: 20
        }).addTo(this.map);

      } else {
        this.accepted1 = false
        sessionStorage.setItem('dc_cad', 'dc_cad');
        this.map.removeLayer(this.DC_cad_layer);

      }
    } else if (value == "Raw_image") {
      this.markers = L.layerGroup()
      var rawImg = sessionStorage.getItem('rawImage');

      if (rawImg == 'rawImage') {
        // // console.log(this.get_missions_flights_data)
        // alert(this.get_missions_flights_status)
        if (this.get_missions_flights_data == undefined) {
          this.toastr.warning('Please wait.... getting mission and Flight data.');
          this.accepted3 = false;
        }
        if (this.get_missions_flights_data == "Data Not Available" && this.get_missions_flights_status == "success") {
          alert("There is no Raw image for this project.")
          this.accepted = false;

        } else if (this.get_missions_flights_data != "Data Not Available" && this.get_missions_flights_status == "success") {
          sessionStorage.setItem('rawImage', 'rawImage');
          // setTimeout(() => {
          //   this.ngxService.stop();
          // }, 10000)
          const dialogRef = this.dialog.open(RawImageComponent, {
            width: '250px',
            // data: {mission: this.mission, flight: this.flight}
          });

          dialogRef.afterClosed().subscribe(result => {
            let dataval = this._http_.getmissiondata();
            // console.log(dataval['mission'])
            // this.accepted3 = false;


            let project_id = localStorage.getItem("project_id");
            let project_type = localStorage.getItem("project_type");
            let date = localStorage.getItem("date");

            const newtoken = localStorage.getItem("token");
            const headers = {
             'Content-Type': 'application/json',
             'Authorization': 'token ' + newtoken,
            };

            var url = environment.api_name + 'api/project/get_thermal_assets/' + project_id + '/' + date + '/' + project_type + '?filter={"mission":"' + dataval['mission'] + '","flight":"' + dataval['flight'] + '"}'
            fetch(url, { headers })
              .then(response => response.json())
              .then(datavalue => {
                // console.log(datavalue['data'])
                this.uploaded_raw_image = datavalue['data']
                let popupContent = `
                  <form class="popup-form">
                    <div class="form-group">
                      <label class="mb-0" for="comment">Comment:</label>
                      <textarea class="form-control" rows="4" class="comment"></textarea>
                    </div>
                    <div class="d-flex">
                      <button class="btn btn-outline-info btn-sm">Save</button>
                      <button class="delete-button btn btn-outline-danger btn-sm ml-auto">
                         Delete
                      </button>
                    </div>
                  </form>
                  `;
                var greenIcon = L.icon({
                  iconSize: [30, 30],
                  iconUrl: 'http://maps.google.com/mapfiles/ms/icons/blue-dot.png',
                });

                // var marker = L.marker([23.91353722222222, 71.19426805555555], { icon: greenIcon }).bindPopup(popupContent)
                // // var marker = L.marker([23.91353722222222, 71.19426805555555], { icon: greenIcon }).bindPopup("<html><head></head><body><table><tr><td>url:</td><td><image src="' + element["url"] + '"</td></tr></body></html>")
                // selected_point.addLayer(marker).addTo(this.map);
                // marker.on('click', this.open_dialog())
                this.uploaded_raw_image.forEach(element => {

                  // let popupContent = '<form class="popup-form"><div class="row"><label class="mb-0" for="comment">Note: <b>use ctrl+ click link <b> <br>to view the image in new tab</label><label class="mb-0" for="comment">url:<span><a href="' + element["url"] + '">' + element["filename"] + '</a></span></label></div></form>'
                  let popupContent = '<html><head><style> .leaflet-popup-content-wrapper {width:680px}</style></head><body><table><tr><td><img src="' + element["url"] + '"/></td></tr><tr><td>' + element["filename"] + '</td></tr></body></html>'
                  var markers = L.marker([element['latitude'], element['longitude']], { icon: greenIcon }).bindPopup(popupContent)
                  // var marker = L.marker([23.91353722222222, 71.19426805555555], { icon: greenIcon }).bindPopup("<html><head></head><body><table><tr><td>url:</td><td><button click='open_dialog()'>asdasd</button></td></tr></body></html>")
                  this.marker_data.push(markers)
                  this.markers.addLayer(markers).addTo(this.map)

                });

              })
          })
          sessionStorage.setItem('rawImage', 'none');
        }
        // })


        // // console.log("---")
        // // console.log(this.mission_data)
      } else {
        sessionStorage.setItem('rawImage', 'rawImage');
        // this.map.removeLayer()
        // this.map.removeLayer(this.markers)
        for (var l in this.marker_data) {
          this.map.removeLayer(this.marker_data[l])
        }

      }



    }

  }

  onload_get_mission_flights() {
    let project_id = localStorage.getItem("project_id");
    let project_type = localStorage.getItem("project_type");
    let date = localStorage.getItem("date");

    const newtoken = localStorage.getItem("token");
    const headers = {
    'Content-Type': 'application/json',
    'Authorization': 'Bearer ' + newtoken,
    };

    var url = environment.api_name + 'api/project/get_missions_flights/' + project_id + '/' + date + '/' + project_type
    fetch(url, { headers })
      .then(response => response.json())
      .then(datavalue => {
        if (datavalue['data'] != "Data Not Available") {
          this.toastr.success('Mission and Flight data are ready');
        }
        this.get_missions_flights_data = datavalue['data']
        this.get_missions_flights_status = datavalue['status']
        // console.log(datavalue['data'])
        this._http_.set_mision_flight_detail(datavalue['data'])
      })
  }

  Popup_Card(value) {
    // alert("")
    // console.log(value)
    this.popup_card_visibility = true
    this.pop_up_header = value.key[0]
    this.pop_up_planned = value.sub_group['Total']
    this.pop_up_Actual = value.sub_group['Actual']
    // // console.log(this.pop_up_Actual)
    this.Actual_by_planned = Math.round((parseInt(this.pop_up_Actual) / parseInt(this.pop_up_planned)) * 100)
    // console.log((this.Actual_by_planned))
    // // console.log(typeof this.Actual_by_planned)
    this.chartOptions = {
      series: [this.Actual_by_planned],
      chart: {
        height: 120,
        type: "radialBar",
        toolbar: {
          show: false
        },
      },
      plotOptions: {
        radialBar: {
          offsetY: 0,
          startAngle: 0,
          endAngle: 360,
          hollow: {
            margin: 1,
            size: "70%",
            background: "transparent",
            image: undefined
          },
          dataLabels: {
            name: {
              show: false
            },
            value: {
              show: true
            }
          }
        }
      },
      colors: ["#e60023"],
      // labels: ["Pinterest", "Facebook", "LinkedIn", "Twitter","YouTube"],
      // legend: {
      //   show: true,
      //   floating: true,
      //   fontSize: "16px",
      //   position: "left",
      //   offsetX: 50,
      //   offsetY: 10,
      //   labels: {
      //     useSeriesColors: true
      //   },
      //   formatter: function(seriesName, opts) {
      //     return seriesName + ":  " + opts.w.globals.series[opts.seriesIndex];
      //   },
      //   itemMargin: {
      //     horizontal: 3
      //   }
      // }
    };

  }
  polygonMarkerCreating(el, latlngArray, hex, desc, kml_name) {


    var polygonPoints = []
    let j = 1
    let k = 0
    let l = 2
    let iterate = latlngArray.length / 3
    for (let i = 0; i < iterate; i++) {
      polygonPoints.push([latlngArray[i + j], latlngArray[i + k], latlngArray[i + l]])
      // // console.log(polygonPoints)
      j = j + 2;
      k = k + 2;
      l = l + 2
    }

    // // console.log(kml_name)
    if (kml_name == "Cables" || kml_name == 'Fencing') {

      this.poly = L.polyline(polygonPoints, { color: hex }).addTo(this.map);
      this.polies.push(this.poly)
      // // console.log(this.polies);
    }
    else {
      this.poly = L.polygon(polygonPoints, { color: hex }, { weight: 6 }).addTo(this.map);
      this.polies.push(this.poly)
    }
    // // console.log(this.polies)
    this.poly.on("click", (e) => {
      const parser = new DOMParser();
      // desc = desc.replaceAll("<B>","")
      // desc = desc.replaceAll("</B>","")
      // desc = desc.replaceAll("<BR>",",")
      // this.text_content = null
      // this.text_content = desc.split(",")
      // // console.log(this.text_content)
      var markup = parser.parseFromString(desc, 'text/html')

      var y = markup.getElementsByTagName("td")
      // // console.log(y)
      let i = 0
      let b = null
      let d = null
      this.descObj = {}
      b = ""
      this.table_no = ""
      for (var each in y) {
        // // console.log(each)

        if (i % 2 == 0) {
          b = y[each].textContent
          // // console.log(b)
        }
        else {

          if (b == "Table No") {
            d = b
            this.table_no = y[each].textContent
          }

          else {
            let c = y[each].textContent + " " + y[each].style.color
            this.descObj[b] = c
            // // console.log(this.descObj)
            // // console.log(b + y[each].textContent)
          }

        }
        i++
      }
      // this.popup_card_visibility = true
      // // console.log(markup)
    })
  }
  toggleChangeType(checked) {
    if (checked) {
      this.resetFormSubject.next(checked);
      this.checked = false
      this.onload('SCPM')
    } else {
      this.resetFormSubject.next(checked);

      this.checked = true
      this.onload('SCQM')
    }

  }
  satellite_view() {
    // alert("satellite_view")
    this.satelliteview = localStorage.getItem('satellite');
    if (this.satelliteview == "satellite") {

      this.satellite_layer = L.tileLayer('https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}', {
        attribution: 'Tiles &copy; Esri &mdash; Source: Esri, i-cubed, USDA, USGS, AEX, GeoEye, Getmapping, Aerogrid, IGN, IGP, UPR-EGP, and the GIS User Community',
        center: [this.center],
        minZoom: 1,
        maxZoom: 22,
      }).addTo(this.map);

      this.rgb_layer = L.tileLayer(this.ortho_RGB + '{z}/{x}/{y}.png', {
        attribution: '© <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
        center: [this.lat, this.long],
        minZoom: 1,
        maxZoom: 22,
        // maxNativeZoom: 18
      }).addTo(this.map);
      localStorage.setItem('satellite', 'terrain');
      localStorage.setItem('satellite', 'terrain')

    } else if (this.satelliteview == "terrain") {
      // Removing satellite layer
      this.map.removeLayer(this.satellite_layer);

      localStorage.setItem('satellite', "satellite");

    }
  }

}
