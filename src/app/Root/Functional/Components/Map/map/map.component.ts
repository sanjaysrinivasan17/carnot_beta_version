import { Component, OnInit, Inject,ViewChild } from '@angular/core';
import { DOCUMENT } from "@angular/common";
import { HttpService } from './http.service';
import {
  ApexNonAxisChartSeries,
  ApexResponsive,
  ApexChart,
  ChartComponent,
  ApexStroke
} from "ng-apexcharts";

export type ChartOptions = {
  series: ApexNonAxisChartSeries;
  chart: ApexChart;
  responsive: ApexResponsive[];
  labels: any;
  stroke: ApexStroke;
  colors: any;


};

@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.css']
})
export class MapComponent implements OnInit {

  @ViewChild("chart") chart: ChartComponent;
  public chartOptions: Partial<ChartOptions>;
  public currentMenu: string;
  public previousID: string;
  // variables
  p: number = 1;

  project_id: any;
  date: any;
  Project_layer: any;

  project_id_summary: any;
  date_summary: any;
  Project_layer_summary: any;

  inverter_content:string;
  i: any;
  sub_group_label: any;
  chart_data = [];
  chart_label = [];
  defects = [];
  defects_summary = [];
  n: any;
  kml = [];
  summary_data = [];
  summ: any;
  invData = [];
  check = [];
  inv_all: any;
  demo = [];
  inv_tb = [];

  idd:any;

  sub_defect = [];
  sub_label = [];
  but = ['explore', 'merge_type', 'nat', 'grid_off', 'cast'];
  col = ['yellow', 'blue', 'red', 'greeno'];

  public menuIcons = [
    {
      name: 'Hotspot',
      img: './assets/images/hotspot.svg',
      color: '#089E60',
      rippleColor: '#007bff45'
    },
    {
      name: 'Short Circuit',
      img: './assets/images/short circuit.svg',
      color: '#1396CC',
      rippleColor: '#007bff45'
    },
    {
      name: 'Open Circuit',
      img: './assets/images/open circuit.svg',
      color: '#FFC107',
      rippleColor: '#007bff45'
    },
    {
      name: 'Panel Failure',
      img: './assets/images/panel failure.svg',
      color: '#D56DFC',
      rippleColor: '#007bff45'
    },
    {
      name: 'PID',
      img: './assets/images/pid.svg',
      color: '#DC2828',
      rippleColor: '#007bff45'
    }
  ];

  public currentIndex: number = 0;


  constructor(private _http: HttpService) { }

  ngOnInit(): void {
    
  }

  activateMenu(id: string) {
    this.idd = id
    if (this.previousID) {
      let prevId = document.getElementById(this.previousID);
      prevId.style.width = '0px';
    }

    let e = document.getElementById(id);
    e.style.width = '5px';
    this.previousID = id;
  }

  public openSidbar(id: string, menuId: string) {

    let sideBar = document.getElementById(id);

    sideBar.style.display = 'block';
    sideBar.style.width = '480px';

    window.addEventListener("resize", function (event) {
      if (document.body.clientWidth > 600) {
        sideBar.style.width = '480px';
      } else {
        sideBar.style.width = '300px';
      }
    });
    
    switch(menuId) {
      case 'summary':
        this.summary_data = [];
        this.currentMenu = 'summary';
        this.summary_data_render();
        break;
      case 'inventor':
        this.invData = [];
        this.currentMenu = 'inventor';
        this.inverter_data_render();
        break;
    }
  }

  closeSidebar(id: string) {
    let sideBar = document.getElementById(id);
    sideBar.style.display = 'none';
    sideBar.style.width = '0px';
  }

  activate_tab(name: string, i: number) {
    this.currentIndex = i;
  }

  // summary data

  summary_data_render() {
    this._http.summary_data().subscribe(data => {

      this.summ = data

      this.project_id_summary = Object.keys(data)
      this.date_summary = Object.values(data[this.project_id_summary])[2]
      this.Project_layer_summary = Object.keys(data[this.project_id_summary][this.date_summary]['layers'])

      for (var k in data[this.project_id_summary][this.date_summary]['layers']) {
        this.summary_data.push({
          "name": k,
          "kml": data[this.project_id_summary][this.date_summary]['layers'][k]["kml"],
          "color": data[this.project_id_summary][this.date_summary]['layers'][k]["color"],
          "count": data[this.project_id_summary][this.date_summary]['layers'][k]["Count"]
        });

      }
      this.loadSumm_data('Hotspot', data[this.project_id_summary][this.date_summary]['layers']['Hotspot']['kml']);


    })

  }



  loadSumm_data(elm, x) {


    if (elm === 'Hotspot') {
      this.sub_defect.length = 0
      this.sub_label.length = 0
    }
    if (elm === 'Panel Failure') {
      this.sub_defect.length = 0
      this.sub_label.length = 0
    }
    this.defects_summary = [];
    this.sub_defect=[]
    this.sub_label=[]

    for (var key in this.summ[this.project_id_summary][this.date_summary]['layers'][elm]['sub_group']) {
      this.defects_summary.push({
        "name": key,
        "count": this.summ[this.project_id_summary][this.date_summary]['layers'][elm]['sub_group'][key]["Count"],
        "kml": this.summ[this.project_id_summary][this.date_summary]['layers'][elm]['sub_group'][key]["kml"],
        "color": this.summ[this.project_id_summary][this.date_summary]['layers'][elm]['sub_group'][key]["color"]
      });
      this.sub_label.push(key)
      this.sub_defect.push(this.summ[this.project_id_summary][this.date_summary]['layers'][elm]['sub_group'][key]["Count"])

    }
    if(this.sub_defect.length === 0 ){
      this.sub_defect=[0,0,0,0,0]
      this.sub_label =['No data','No data','No data','No data','No data']
    }
    


    //chart
    this.chartOptions = {
      series: this.sub_defect, //value
      chart: {
        width: 320,
        type: "donut",

      },

      // colors: ['#264D59',  '#4397AD',  '#F9E07F',  '#F9AD6A'],
      colors: ['#F9AD6A', '#F9E07F', '#4397AD', '#264D59'],



      stroke: {
        show: false,
      },

      labels: this.sub_label, //labels

      responsive: [
        {
          breakpoint: 480,
          options: {
            chart: {
              foreColor: '#fff',
              width: 200
            },
            legend: {

              position: "bottom",

            }
          }
        }
      ]
    };



  }
// end summary


inverter_data_render() {

  this._http.inverter_data().subscribe(data1 => {
    this.inv_all = data1
    this.project_id = Object.keys(data1)
    this.date = Object.values(data1[this.project_id])[2]
    this.Project_layer = Object.keys(data1[this.project_id][this.date]['layers'])


    for (var key in data1[this.project_id][this.date]['layers']) {
      this.check.push({ "title": key })
    }
    this.load_invDiv(1);
  });

}

load_invDiv(elm) {
  var l = this.check[elm - 1]['title'];
  this.invData = [];
  for (var k in this.inv_all[this.project_id][this.date]['layers'][l]) {
    this.invData.push({
      "inv_name": l,
      "name": k,
      "count": this.inv_all[this.project_id][this.date]['layers'][l][k]["count"],
      "kml": this.inv_all[this.project_id][this.date]['layers'][l][k]["kml"],
      "color": this.inv_all[this.project_id][this.date]['layers'][l][k]["color"]
    });
  }
  this.inv_table(l, 'Hotspot')
}

inv_table(ele, elm) {
  this.inv_tb = [];
  for (var key in this.inv_all[this.project_id][this.date]['layers'][ele][elm]['sub_group']) {
    this.inv_tb.push({
      "name": key,
      "count": this.inv_all[this.project_id][this.date]['layers'][ele][elm]['sub_group'][key]["count"],
      "kml": this.inv_all[this.project_id][this.date]['layers'][ele][elm]['sub_group'][key]["kml"],
      "color": this.inv_all[this.project_id][this.date]['layers'][ele][elm]['sub_group'][key]["color"]
    });
  }
}


public onTabChange(event: any) {
  console.log('eve', event);
  switch(event.index) {
    case 0:
      break;
  }
}

}