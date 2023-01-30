import { HttpClient } from '@angular/common/http';
import { Component, Input, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { environment } from '../../../../../../environments/environment';
import 'leaflet';
import 'leaflet-draw/dist/leaflet.draw-src.js';
import { HttpAssetService } from '../../../services-assetmap/http.assetservice';
import { AssetdialogPreviewComponent } from '../assetdialog-preview/assetdialog-preview.component';
import { AssetaoiDrawComponent } from '../assetaoi-draw/assetaoi-draw.component';


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
  selector: 'assetdraw',
  templateUrl: './assetdraw.component.html',
  styleUrls: ['./assetdraw.component.css']
})
export class AssetdrawComponent {

  @Input() public map;
  panelOpenState = false;
  public aoi_data: any;
  public no_data: boolean;
  datadescription: any;
  public main_data: any;
  center: any;
  lat: any;
  long: any;

  constructor(private _http: HttpAssetService, public dialog: MatDialog, private http: HttpClient) { }

  ngOnInit(): void {
    console.log(this.map);

    this.drawPlugin(this.map);
    this.get_aoi_data();
    this.no_data = true;

  }

  public get_aoi_data() {
    var project_name = localStorage.getItem("name")
    var date = localStorage.getItem("date")
    const newtoken = localStorage.getItem("token");

    const headers = { 'Authorization': 'token ' + newtoken }

    this.http.get(environment.api_name + 'draw/get_data/' + project_name + '/' + date, { headers }).subscribe(data => {
      // alert(project_name)
      // console.log('data', data);
      this.main_data = data;
      //     // console.log('data', data[project_name]);
      if (Object.keys(data[project_name]).length !== 0) {

        this.no_data = false;
        this.aoi_data = Object.keys((data[project_name][date])).reverse().map(item => {
          // // console.log(data[project_name][date][item]['label'])
          data[project_name][date][item].id = item

    //     this.no_data = false;
    //     this.aoi_data = Object.keys((data[project_name][date])).reverse().map(item => {
    //       // // console.log(data[project_name][date][item]['label'])
    //       data[project_name][date][item].id = item


    //       return data[project_name][date][item]
    //     });
    //     this.load_aoi_polygon();
    //   }
    //   else {
    //     this.aoi_data = '';
    //     this.no_data = true;
    //   }
    // });

  }

  public load_aoi_polygon() {

    this.map.removeLayer(polygon_draw_layer); // Resets polygon_draw_layer on call
    polygon = []; // Empties global polygon array on each call to load fresh data

    this.aoi_data.map(value => {

      // console.log( 'blue', value.id);
      // console.log('values are', value);
      value.show = true;

      var instance_coordinate = [];
      value['polygon'].map(item => {
        instance_coordinate.push(Object.values(item))
        // console.log(instance_coordinate);
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
        // circle: {
        //   shapeOptions: {
        //     clickable: false
        //   }
        // },
        rectangle: {
          showArea: false,
          shapeOptions: {
            clickable: false
          }
        },
        circle: false,
        marker: false,
        circlemarker: false

      },
      // edit: {
      //   featureGroup: editableLayers, //REQUIRED!!
      //   remove: false
      // }
    };
    // console.log(map)
    var drawControl = new L.Control.Draw(options);

    map.addControl(drawControl);

    map.on(L.Draw.Event.CREATED, function (e) {

      map.addLayer(editableLayers);
      var type = e.layerType;
      layer = e.layer;

      if (type != 'marker' && type != 'circle') {
        // // console.log( layer.getLatLngs());
        currentCoords = layer.getLatLngs()
        editableLayers.addLayer(layer);

        // console.log(currentCoords);
      }
      if (type === 'marker' && type != 'circle') {
        layer.bindPopup('A popup!');
      }
    });

    map.on('draw:drawstop', (e) => {
      // console.log("end");
      this.openDialog(e);
    });


  }

  openDialog(e) {
    // console.log('e', e);
    let dialogRef = this.dialog.open(AssetaoiDrawComponent, { width: '400px', data: { 'co': currentCoords, 'event': editableLayers, 'elayer': layer } });

    dialogRef.afterClosed().subscribe(result => {

      this.get_aoi_data();
      this.map.removeLayer(layer); // Removes Draw plugin's polygonv
    });
  }

  openPreview(itemid) {
    var project_name = localStorage.getItem("name")
    var date = localStorage.getItem("date")
    this.datadescription = this.main_data[project_name][date][itemid].desc
    this._http.setAreaofinterest({
      datadescriptionval: this.datadescription
    });

    let dialogRef = this.dialog.open(AssetdialogPreviewComponent, { width: '400px' });
    dialogRef.afterClosed().subscribe(result => {

    });
  }

  delete_aoi(key) {
    // https://www.takvaviya.in/draw/delete/${keys[key]}/
    const newtoken = localStorage.getItem("token");

    const headers = { 'Authorization': 'token ' + newtoken }
    fetch(environment.api_name + 'draw/delete/' + key + '/', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': 'token ' + newtoken
      },
    })
      .then(response => response.json())
      .then(result => {
        // console.log('Success:', result);
        this.get_aoi_data();
        this.map.removeLayer(polygon_draw_layer);
      })
      .catch(error => {
        console.error('Error:', error);
      });
  }

  hide_aoi(item) {

    // console.log(item);
    //this.map.removeLayer(polygon_draw_layer)
    this.map.removeLayer(id_container[item]);
    hidden_polygon_list.push(item);
    this.update_aoi(item, false);

  }


  show_aoi(item) {
    // console.log(item);
    this.map.addLayer(id_container[item]);
    this.update_aoi(item, true);
  }

  private update_aoi(id: string, active: boolean) {
    this.aoi_data.forEach((item: any, i: number) => {
      if (id === item.id) {
        this.aoi_data[i].show = active;
      }
    })

  }

}
