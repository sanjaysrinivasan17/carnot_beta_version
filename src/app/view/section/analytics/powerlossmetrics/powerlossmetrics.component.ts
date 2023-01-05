import { ViewChild } from '@angular/core';
import { Component, OnInit } from '@angular/core';

import {
  ApexNonAxisChartSeries,
  ApexPlotOptions,
  ApexChart,
  ApexLegend,
  ApexResponsive,
  ChartComponent,
  ApexTheme,
  ApexTitleSubtitle
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


@Component({
  selector: 'powerlossmetrics',
  templateUrl: './powerlossmetrics.component.html',
  styleUrls: ['../analytics.component.css']
})

export class PowerlossmetricsComponent implements OnInit {
  @ViewChild("chart1") chart1: ChartComponent;
  public chartOptions1: Partial<ChartOptions1>;

  @ViewChild("chart") chart: ChartComponent;
  public chartOptions: Partial<ChartOptions>;   
   bardata = []; 

   graph_data = {
    "summary": [
      { "hotspot": 32, "shortcircuit": 43, "opencircuit": 98, "pannelfaluer": 65, "pid": 21 }
    ],
    "Inverter": [
      { "INV1": 90, "INV2": 43, "INV5": 34, "INV6": 78, "inv4": 98, "inv5": 98, "inv52": 98, "INV61": 90, "INV662": 43, "INV65": 34 }
    ]
  }

  ngOnInit(): void {
    
    this.chartOptions = {
      series: Object.values(this.graph_data['Inverter'][0]),
      chart: {
        height: 350,
        type: "radialBar"
      },
      plotOptions: {
        radialBar: {
          offsetY: 0,
          startAngle: 0,
          endAngle: 270,
          hollow: {
            margin: 5,
            size: "20%",
            background: "transparent",
            image: undefined
          },
          dataLabels: {
            name: {
              show: true
            },
            value: {
              show: true
            }
          }
        }
      },
      colors: ["#339933", "#1be461", "#ef6c00", "#ffd54f"],
      labels: Object.keys(this.graph_data['Inverter'][0]),
      legend: {
        show: true,
        floating: true,
        fontSize: "16px",
        position: "left",
        offsetX: 50,
        offsetY: 10,
        labels: {
          useSeriesColors: true
        },
        formatter: function (seriesName, opts) {
          return seriesName + ":  " + opts.w.globals.series[opts.seriesIndex];
        },
        itemMargin: {
          horizontal: 3
        }
      },
      responsive: [
        {
          breakpoint: 480,
          options: {
            legend: {
              show: true
            }
          }
        }
      ]
    };
    
    this.chartOptions1 = {
      series: Object.values(this.graph_data['summary'][0]),
      chart: {
        width: "100%",
        height: 350,
        type: "pie"
      },
      colors: ["#339933", "#1be461", "#ef6c00", "#ffd54f"],
      labels: Object.keys(this.graph_data['summary'][0]),
      theme: {
        monochrome: {
          enabled: true
        }
      },
      title: {
        text: ""
      },
      responsive: [
        {
          breakpoint: 480,
          options: {
            chart: {
              width: 200
            },
            legend: {
              position: "bottom"
            }
          }
        }
      ]
    };

    

  }

}
