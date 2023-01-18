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

export type ChartOptions = {
  series: ApexNonAxisChartSeries;
  chart: ApexChart;
  labels: string[];
  colors: string[];
  legend: ApexLegend;
  plotOptions: ApexPlotOptions;
  responsive: ApexResponsive | ApexResponsive[];
};

export type ChartOptions1 = {
  series: ApexNonAxisChartSeries;
  chart: ApexChart;
  responsive: ApexResponsive[];
  labels: any;
  theme: ApexTheme;
  title: ApexTitleSubtitle;
  colors: string[];
};

export type ChartOptions2 = {
  series: ApexAxisChartSeries;
  chart: ApexChart;
  dataLabels: ApexDataLabels;
  plotOptions: ApexPlotOptions;
  yaxis: ApexYAxis;
  xaxis: ApexXAxis;
  fill: ApexFill;
  title: ApexTitleSubtitle;
  grid: ApexGrid;
};

export type ChartOptions3 = {
  series: ApexAxisChartSeries;
  chart: ApexChart;
  dataLabels: ApexDataLabels;
  plotOptions: ApexPlotOptions;
  xaxis: ApexXAxis;
  grid: ApexGrid;
};

export type ChartOptions4 = {
  series: ApexNonAxisChartSeries;
  chart: ApexChart;
  responsive: ApexResponsive[];
  labels: any;
};


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

export type ChartOptions7 = {
  series: ApexAxisChartSeries;
  chart: ApexChart;
  xaxis: ApexXAxis;
  grid: ApexGrid;
  stroke: ApexStroke;
  tooltip: ApexTooltip;
  dataLabels: ApexDataLabels;
};

export type ChartOptions8 = {
  series: ApexNonAxisChartSeries;
  chart: ApexChart;
  labels: string[];
  plotOptions: ApexPlotOptions;
};


@Component({
  selector: 'healthhistory',
  templateUrl: './healthhistory.component.html',
  styleUrls: ['../analytics.component.css']
})


export class HealthhistoryComponent implements OnInit {
 
   @ViewChild("chart7") chart7: ChartComponent;
  public chartOptions7: Partial<ChartOptions7>;

  @ViewChild("chart8") chart8: ChartComponent;
  public chartOptions8: Partial<ChartOptions8>;


   
   bardata = []; 

  ngOnInit(): void {
    
   

//     fetch("https://www.takvaviya.in/thermal/thermal/project/data/hero_ichawar?")
//     .then(response => response.json())
//     .then(data => {this.bardata.push(data["6"]["2019-10-06"]["layers"]["Hotspot"].Count);
//    })
// // console.log(this.bardata);


//     this.chartOptions7 = {
//       series: [
//         {
//           name: "Total Defects",
//           data: [31, 40, 28, 51, 42, 109, 100]
//         },
//         {
//           name: "Number Defects Modules",
//           data: [11, 32, 45, 32, 34, 52, 41]
//         }
//       ],
//       chart: {
//         height: 350,
//         type: "area",
//         toolbar: {
//           show: false,
//           offsetX: 0,
//           offsetY: 0,
//           tools: {
//             download: true,
//             selection: true,
//             zoom: true,
//             zoomin: true,
//             zoomout: true,
//             pan: true,
//             customIcons: []
//           },
//           autoSelected: 'zoom'
//         },
//         dropShadow: {
//           enabled: true,
//           top: 3,
//           left: 0,
//           blur: 3,
//           opacity: 0.4,
//           color:"#008FFB"
//         }
//       },
//       dataLabels: {
//         enabled: false
//       },
//       stroke: {
//         curve: "smooth"
//       },
//       xaxis: {
//         type: "datetime",
//         categories: [
//           "2018-09-19T00:00:00.000Z",
//           "2018-09-19T01:30:00.000Z",
//           "2018-09-19T02:30:00.000Z",
//           "2018-09-19T03:30:00.000Z",
//           "2018-09-19T04:30:00.000Z",
//           "2018-09-19T05:30:00.000Z",
//           "2018-09-19T06:30:00.000Z"
//         ]
//       },
//       tooltip: {
//         x: {
//           format: "dd/MM/yy HH:mm"
//         }
//       },
//       grid: {
//         show: true,

//         xaxis: {
//             lines: {
//                 show: false
//             }
//         },
//         yaxis: {
//             lines: {
//                 show: false
//             }
//         },
//         row: {
//             colors: undefined,
//             opacity: 0.0
//         },
//         column: {
//             colors: undefined,
//             opacity: 0.0
//         },

//     },
//     };

//     this.chartOptions8 = {
//       series: [70],
//       chart: {
//         height: 350,
//         type: "radialBar"
//       },
//       plotOptions: {
//         radialBar: {
//           hollow: {
//             size: "70%"
//           }
//         }
//       },
//       labels: ["Progress"]
//     };
  }

}
