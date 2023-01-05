import { Component, OnInit, ViewChild } from '@angular/core';

import {
  ApexNonAxisChartSeries,
  ApexPlotOptions,
  ApexChart,
  ApexLegend,
  ApexResponsive,
  ChartComponent,
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




export type ChartOptions5 = {
  series: ApexAxisChartSeries;
  chart: ApexChart;
  dataLabels: ApexDataLabels;
  plotOptions: ApexPlotOptions;
  responsive: ApexResponsive[];
  xaxis: ApexXAxis;
  legend: ApexLegend;
  fill: ApexFill;
  grid: ApexGrid;
};

export type ChartOptions6 = {
  series: ApexAxisChartSeries;
  chart: ApexChart;
  dataLabels: ApexDataLabels;
  plotOptions: ApexPlotOptions;
  xaxis: ApexXAxis;
  yaxis: ApexYAxis;
  stroke: ApexStroke;
  title: ApexTitleSubtitle;
  tooltip: ApexTooltip;
  fill: ApexFill;
  legend: ApexLegend;
  grid: ApexGrid;
};



@Component({
  selector: 'inverterwiseanalysis',
  templateUrl: './inverterwiseanalysis.component.html',
  styleUrls: ['../analytics.component.css']
})

export class InverterwiseanalysisComponent implements OnInit {


  @ViewChild("chart5") chart5: ChartComponent;
  public chartOptions5: Partial<ChartOptions5>;

  @ViewChild("chart6") chart6: ChartComponent;
  public chartOptions6: Partial<ChartOptions6>;

   
   bardata = []; 
   inv_main_data: any;
  project_id_inv: any;
  date_inv: any;
  Project_layer_inv: any
  project_layer_inv_data = [];
  project_layer_inv_lable = [];

  Hotspot_inv = [];
  ShortCircit_inv = [];
  Open_Circuit_inv = [];
  pannel_inv = [];
  Pid = [];

  total_count=[];

  ngOnInit(): void {
    
//     fetch("https://www.takvaviya.in/thermal/thermal/project/retrieve_data/hero_ichawar")
//     .then(response => response.json())
//     .then(data => {
//       this.inv_main_data = data;

//       // this.inverter_wise()
//       this.project_id_inv = Object.keys(this.inv_main_data)
//       this.date_inv = Object.values(this.inv_main_data[this.project_id_inv])[2]
//       this.Project_layer_inv = Object.keys(this.inv_main_data[this.project_id_inv][this.date_inv]['layers'])

//       for (var i = 0; i < this.Project_layer_inv.length; i++) {
//         this.Hotspot_inv.push(Object.values(this.inv_main_data[this.project_id_inv][this.date_inv]['layers'])[i]['Hotspot']['count'])
//         this.ShortCircit_inv.push(Object.values(this.inv_main_data[this.project_id_inv][this.date_inv]['layers'])[i]['Short Circuit']['count'])
//         this.Open_Circuit_inv.push(Object.values(this.inv_main_data[this.project_id_inv][this.date_inv]['layers'])[i]['Open Circuit']['count'])
//         this.pannel_inv.push(Object.values(this.inv_main_data[this.project_id_inv][this.date_inv]['layers'])[i]['Panel Failure']['count'])
//         this.Pid.push(Object.values(this.inv_main_data[this.project_id_inv][this.date_inv]['layers'])[i]['PID']['count'])

//         Object.keys(this.inv_main_data[this.project_id_inv][this.date_inv]['layers'])[i]
//         Object.values(this.inv_main_data[this.project_id_inv][this.date_inv]['layers'])[i]
//       }

//       for (var n = 0; n < this.Project_layer_inv.length; n++) {

//         this.total_count.push(+this.Hotspot_inv[n]+ +this.ShortCircit_inv[n]+ +this.Open_Circuit_inv[n]+ +this.pannel_inv[n]+ +this.Pid[n])
//       }
// console.log(this.total_count)
//       // console.log(this.Hotspot_inv)
//       // console.log(this.ShortCircit_inv)
//       // console.log(this.Open_Circuit_inv)
//       // console.log(this.pannel_inv)
//       // console.log(this.Pid)



//       this.chartOptions6 = {
//         series: [
//           {
//             name: "Hotspot",
//             data: this.Hotspot_inv
//           },
//           {
//             name: "Short Circuit",
//             data: this.ShortCircit_inv
//           },
//           {
//             name: "Open Circuit",
//             data: this.Open_Circuit_inv
//           },
//           {
//             name: "Panel Failure",
//             data: this.pannel_inv
//           },
//           {
//             name: "PID",
//             data: this.Pid
//           }
//         ],
//         chart: {
//           type: "bar",
//           height: 350,
//           stacked: true,

//         },
//         plotOptions: {
//           bar: {
//             horizontal: true
//           }
//         },
//         stroke: {
//           width: 1,
//           colors: ["#fff"]
//         },
//         title: {
//           text: ""
//         },
//         xaxis: {
//           categories: this.Project_layer_inv,
//           labels: {
//             formatter: function (val) {
//               return val + "";
//             }
//           }
//         },
//         yaxis: {
//           title: {
//             text: undefined
//           }
//         },
//         tooltip: {
//           y: {
//             formatter: function (val) {
//               return val + "K";
//             }
//           }
//         },
//         fill: {
//           opacity: 1
//         },
//         legend: {
//           position: "top",
//           horizontalAlign: "left",
//           offsetX: 40
//         },
//         grid: {
//           show: true,

//           xaxis: {
//             lines: {
//               show: false
//             }
//           },
//           yaxis: {
//             lines: {
//               show: false
//             }
//           },
//           row: {
//             colors: undefined,
//             opacity: 0.0
//           },
//           column: {
//             colors: undefined,
//             opacity: 0.0
//           },

//         },
//       };





//       this.chartOptions5 = {
//         series: [
//           {
//             name: "value-1",
//             data: this.total_count
//           },


//         ],
//         chart: {
//           type: "bar",
//           height: 350,
//           stacked: false,
//           stackType: "100%"
//         },
//         responsive: [
//           {
//             breakpoint: 480,
//             options: {
//               legend: {
//                 position: "bottom",
//                 offsetX: -10,
//                 offsetY: 0
//               }
//             }
//           }
//         ],
//         xaxis: {
//           categories: this.Project_layer_inv
//         },
//         fill: {
//           opacity: 1
//         },
//         legend: {
//           position: "right",
//           offsetX: 0,
//           offsetY: 50
//         },
//         grid: {
//           show: true,

//           xaxis: {
//             lines: {
//               show: false
//             }
//           },
//           yaxis: {
//             lines: {
//               show: false
//             }
//           },
//           row: {
//             colors: undefined,
//             opacity: 0.0
//           },
//           column: {
//             colors: undefined,
//             opacity: 0.0
//           },

//         },
//       };

//     })
  }

}