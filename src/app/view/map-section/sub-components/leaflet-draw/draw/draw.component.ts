import { HttpClient } from '@angular/common/http';
import { Component, Input, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { HttpService } from '../../../services-map/http.service';
import { environment } from '../../../../../../environments/environment';
import 'leaflet';
import 'leaflet-draw/dist/leaflet.draw-src.js';
import { Router } from '@angular/router';
import { AoiDialogComponent } from '../aoi-dialog/aoi-dialog.component';
import { DialogPreviewComponent } from '../dialog-preview/dialog-preview.component';
import { HttpErrorResponse } from '@angular/common/http';
import { ToastrService } from 'ngx-toastr';
declare const L: any;

var editableLayers = new L.FeatureGroup(); // featureGroup for draw Plugin
var dstate = false; // TODO check usage
var currentCoords;
var layer; // layer for draw Plugin
var polygon_draw_layer = new L.LayerGroup(); // layerGroup for drawing leaflet polygons from db
var polygon = []; // global array of polygon layer
var hidden_polygon_list = []
var id_container = {}


@Component({
  selector: 'app-draw',
  templateUrl: './draw.component.html',
  styleUrls: ['./draw.component.css']
})

export class DrawComponent implements OnInit {

  @Input() public map;
  panelOpenState = false;
  public aoi_data: any;
  public no_data: boolean;
  datadescription: any;
  public main_data: any;

  constructor(private toastr: ToastrService, private router: Router, private _http: HttpService,public dialog: MatDialog, private http: HttpClient) { }

  ngOnInit(): void {

    this.drawPlugin(this.map);
    this.get_aoi_data();
    this.no_data = true;

  }

  public get_aoi_data() {
    var project_name = localStorage.getItem('proj_name')
    var date = localStorage.getItem("date")

    const token = localStorage.getItem("token");
    const headers = {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json',
    };

//     this.http.get(environment.api_name+'draw/get_data/'+project_name+'/'+date, { headers }).subscribe(data => {
//     this.main_data = data;
//       if (Object.keys(data[project_name]).length !== 0) {

//         this.no_data = false;
//         this.aoi_data = Object.keys((data[project_name][date])).reverse().map(item => {
//           data[project_name][date][item].id = item


//     return data[project_name][date][item]
//         });
//         this.load_aoi_polygon();
//       }
//       else {
//         this.aoi_data = '';
//         this.no_data = true;
//       }
//     });

  }

  public load_aoi_polygon() {

    this.map.removeLayer(polygon_draw_layer); // Resets polygon_draw_layer on call
    polygon = []; // Empties global polygon array on each call to load fresh data

    this.aoi_data.map(value => {
      value.show = true;

      var instance_coordinate = [];
      value['polygon'].map(item => {
        instance_coordinate.push(Object.values(item))
      })

      var latlngs = instance_coordinate;
      id_container[value.id] = L.polygon(latlngs, { color: 'blue' }).bindTooltip(value.label, {
        permanent: false // If true, the tooltip will follow the mouse instead of being fixed at the feature center.
      });
      polygon.push(id_container[value.id]);
      polygon_draw_layer = L.layerGroup(polygon).addTo(this.map);
    });

    if (hidden_polygon_list.length !== 0) {
      hidden_polygon_list.map(value => {

        this.map.removeLayer(id_container[value])
      })
    }
  }

  private drawPlugin(map: any) {

    // const drawnItems = L.featureGroup().addTo(map);

    var options = {
      position: 'topright',
      draw: {
        polyline: {
          shapeOptions: {
            color: '#f357a1',
            weight: 10
          }
        },
        polygon: {
          allowIntersection: false, // Restricts shapes to simple polygons
          drawError: {
            color: '#e1e100', // Color the shape will turn when intersects
            message: '<strong>Oh snap!<strong> you can\'t draw that!' // Message that will show when intersect
          },
          shapeOptions: {
            color: '#bada55'
          }
        },
        circle: {
          shapeOptions: {
            clickable: false
          }
        },
        rectangle: {
          showArea: false,
          shapeOptions: {
            clickable: false
          }
        },

      },
      // edit: {
      //   featureGroup: editableLayers, //REQUIRED!!
      //   remove: false
      // }
    };
    var drawControl = new L.Control.Draw(options);
    map.addControl(drawControl);

    map.on(L.Draw.Event.CREATED, function (e) {

      map.addLayer(editableLayers);
      var type = e.layerType;
      layer = e.layer;

      if (type != 'marker' && type != 'circle') {
        currentCoords = layer.getLatLngs()
        editableLayers.addLayer(layer);
      }
      if (type === 'marker' && type != 'circle') {
        layer.bindPopup('A popup!');
      }
    });

    map.on('draw:drawstop', (e) => {
      this.openDialog(e);
    });


  }

  openDialog(e) {
    let dialogRef = this.dialog.open(AoiDialogComponent, { width: '400px', data: { 'co': currentCoords, 'event': editableLayers, 'elayer': layer } });

    dialogRef.afterClosed().subscribe(result => {

      this.get_aoi_data();
      this.map.removeLayer(layer); // Removes Draw plugin's polygonv
    });
  }

  openPreview(itemid) {
    var project_name = localStorage.getItem('proj_name')
    var date = localStorage.getItem("date")
    this.datadescription = this.main_data[project_name][date][itemid].desc
    this._http.setAreaofinterest({
      datadescriptionval : this.datadescription
   });

    let dialogRef = this.dialog.open(DialogPreviewComponent, { width: '400px' });
    dialogRef.afterClosed().subscribe(result => {

    });
  }

  delete_aoi(key) {
    // https://www.takvaviya.in/draw/delete/${keys[key]}/

    const token = localStorage.getItem("token");
    const headers = {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json',
    };

    fetch(`${environment.api_name}draw/delete/${key}/`, {
      method: 'POST',
      headers,
      credentials: 'omit',
    })
      .then(response => response.json())
      .then(result => {
        this.get_aoi_data();
        this.map.removeLayer(polygon_draw_layer);
      },
      (err: HttpErrorResponse) => {
        if (err.status == 401) {
          this.toastr.error("Login time expired. Please login again.")
          this.gotologin()
        }
      })
      .catch(error => {
        console.error('Error:', error);
      });
  }

  hide_aoi(item) {

    //this.map.removeLayer(polygon_draw_layer)
    this.map.removeLayer(id_container[item]);
    hidden_polygon_list.push(item);
    this.update_aoi(item, false);

  }
  gotologin(){
    this.router.navigate(['auth/login'])
   }

  show_aoi(item) {
    this.map.addLayer(id_container[item]);
    this.update_aoi(item, true);
  }

  private update_aoi(id : string, active : boolean){
    this.aoi_data.forEach((item : any,i : number) => {
      if(id === item.id){
        this.aoi_data[i].show = active;
      }
    })

  }

}


