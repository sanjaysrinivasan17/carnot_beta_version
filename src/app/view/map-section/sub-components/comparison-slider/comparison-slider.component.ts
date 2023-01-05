import { Component, OnInit } from '@angular/core';

import 'leaflet';
import 'leaflet-kml';
declare const L: any;


@Component({
  selector: 'app-comparison-slider',
  templateUrl: './comparison-slider.component.html',
  styleUrls: ['./comparison-slider.component.css']
})
export class ComparisonSliderComponent implements OnInit {


  public map:any;

  constructor() { }

  ngOnInit(): void {

    this.map = L.map('compare_map').setView(["23.04214116137265", "76.93120479583742"], 22);



    // default MAP layer

    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
    }).addTo(this.map);

    // default RGB layer 
     L.tileLayer('http://106.51.3.224:6660/HERO_Ichawar/FULLORTHO/{z}/{x}/{y}.png', {
      attribution: '© <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
      maxZoom: 20,
      maxNativeZoom: 20
    }).addTo(this.map);


  }

}
