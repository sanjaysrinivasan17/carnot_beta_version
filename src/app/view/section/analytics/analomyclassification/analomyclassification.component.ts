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



export type ChartOptions3 = {
  series: ApexAxisChartSeries;
  chart: ApexChart;
  dataLabels: ApexDataLabels;
  plotOptions: ApexPlotOptions;
  xaxis: ApexXAxis;
  grid: ApexGrid;
  colors: any;
};

export type ChartOptions4 = {
  series: ApexNonAxisChartSeries;
  chart: ApexChart;
  responsive: ApexResponsive[];
  labels: any;
};


@Component({
  selector: 'analomyclassification',
  templateUrl: './analomyclassification.component.html',
  styleUrls: ['../analytics.component.css']
})

export class AnalomyclassificationComponent implements OnInit {

  @ViewChild("chart3") chart3: ChartComponent;
  public chartOptions3: Partial<ChartOptions3>;

  @ViewChild("chart4") chart4: ChartComponent;
  public chartOptions4: Partial<ChartOptions4>;
   
  project_id_summary: any
  date_summary: any
  Project_layer_summary: any
  project_layer_summary_data = [];
  project_layer_summary_lable = [];
  samp = [];
  main_data: any;
  ngOnInit(): void {
    
//     fetch("https://www.takvaviya.in/thermal/thermal/project/data/hero_ichawar/2019-10-06")
//     .then(response => response.json())
//     .then(data => {
//       this.main_data = data
//       this.project_id_summary = Object.keys(data)
//       this.date_summary = Object.values(data[this.project_id_summary])[2]
//       this.Project_layer_summary = Object.keys(data[this.project_id_summary][this.date_summary]['layers'])
//       for (var i in this.main_data[this.project_id_summary][this.date_summary]['layers']) {
//         this.project_layer_summary_data.push(this.main_data[this.project_id_summary][this.date_summary]['layers'][i]['Count'])
//         this.project_layer_summary_lable.push(i)
//       }


// // alert("ssss")
//       this.chartOptions3 = {
//         series: [
//           {
//             name: "basic",
//             data: this.project_layer_summary_data,
//           }
//         ],
//         chart: {
//           type: "bar",
//           height: 350
//         },
//         plotOptions: {
//           bar: {
//             horizontal: true
//           }
//         },
//         dataLabels: {
//           enabled: false
//         },
//         xaxis: {
//           categories: this.project_layer_summary_lable
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


//       this.chartOptions4 = {
//         series: this.project_layer_summary_data,
//         chart: {
//           type: "donut",

//         },
//         labels: this.project_layer_summary_lable,
//         responsive: [
//           {
//             breakpoint: 700,
//             options: {
//               chart: {
//                 width: 200,
//                 height: 150
//               },
             
//               legend: {
//                 position: "bottom",
//                 horizontalAlign: 'left',
//                 itemMargin: {
//                   horizontal: 1,
//                   vertical: 3
//                 },

//               }
//             }
//           }
//         ]
//       };
//     })
  }

}
