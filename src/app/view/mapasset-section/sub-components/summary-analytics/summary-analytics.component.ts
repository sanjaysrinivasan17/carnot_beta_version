import { Component, OnInit, ViewChild } from '@angular/core';
import { HttpAssetService } from '../../services-assetmap/http.assetservice';
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

export type ChartOptions = {
  series: ApexAxisChartSeries;
  chart: ApexChart;
  dataLabels: ApexDataLabels;
  plotOptions: ApexPlotOptions;
  xaxis: ApexXAxis;
  stroke: ApexStroke;
};


@Component({
  selector: 'summary-analytics',
  templateUrl: './summary-analytics.component.html',
  styleUrls: ['./summary-analytics.component.css']
})
export class SummaryAnalyticsComponent implements OnInit {

  @ViewChild("chart") chart: ChartComponent;
  public chartOptions: Partial<ChartOptions>;


  main_data: any;
  dateright: any;
  dateleft: any;
  summaryleft_keys: any;
  summaryleft_subgroup_keys: any;
  summaryright_keys: any;
  checked: boolean;
  mode: any;
  summary_keys: any;
  feature: any;
  Feature_key_left: any;
  Feature_key_right: any;
  feature_value_left: any = [];
  feature_value_right: any = [];
  series: any = [];
  percentage_progress: any = [];
  feature_value_total: any = [];


  constructor(private _http: HttpAssetService) { }

  ngOnInit(): void {
    this._http.Asset_project().subscribe(data => {
      this.main_data = data['data']
      // // console.log(this.main_data)
      this.onload()

    })
  }
  onload() {
    this.dateleft = sessionStorage.getItem('dateleft')
    this.dateright = sessionStorage.getItem('dateright')
    this.summaryleft_keys = Object.keys(this.main_data['projectdata'][this.dateleft]['SCPM']['summary']['summary'])
    this.summaryright_keys = Object.keys(this.main_data['projectdata'][this.dateright]['SCPM']['summary']['summary'])
    if (this.summaryleft_keys.length >= this.summaryright_keys.length) {
      this.summary_keys = this.summaryleft_keys
    } else {
      this.summary_keys = this.summaryright_keys
    }

    this.series = [{
      name: this.dateleft,
      data: [0, 0, 0, 0, 0, 0, 0]
    },
    {
      name: this.dateright,
      data: [0, 0, 0, 0, 0, 0, 0]
    }]

    this.on_toggle_change('false', 'Chart')
  }

  toggleChangeType(checked) {
    if (checked) {
      this.checked = false
      this.on_toggle_change(checked, 'Chart')
    } else {
      this.checked = true
      this.on_toggle_change(checked, 'Table')

    }
  }

  on_toggle_change(checked, mode) {
    this.mode = mode
    if (mode == 'Chart') {

      var div = document.getElementById('Chart');
      div.style.display = 'block'
      var statusdiv = document.getElementById('Table');
      statusdiv.style.display = 'none'

      this.chartOptions = {
        series: this.series,
        chart: {
          type: "bar",
          height: 430,
          width: 700
        },
        plotOptions: {
          bar: {
            horizontal: false,
            dataLabels: {
              position: "top"
            }
          }
        },
        dataLabels: {
          enabled: true,
          offsetX: -6,
          style: {
            fontSize: "12px",
            colors: ["#fff"]
          }
        },
        stroke: {
          show: false,
          width: 1,
          colors: ["#fff"]
        },
        xaxis: {
          categories: this.Feature_key_left
        }
      };


    } else {

      var div = document.getElementById('Chart');
      div.style.display = 'none'
      var statusdiv = document.getElementById('Table');
      statusdiv.style.display = 'block'


    }
  }

  selectChangefeature(feature) {
    this.Feature_key_left = [];
    this.Feature_key_right = [];
    this.feature_value_left = [];
    this.feature_value_right = [];
    this.percentage_progress = [];
    this.Feature_key_left = Object.keys(this.main_data['projectdata'][this.dateleft]['SCPM']['summary']['summary'][feature])
    this.Feature_key_right = Object.keys(this.main_data['projectdata'][this.dateright]['SCPM']['summary']['summary'][feature])
    
    
    this.Feature_key_left.forEach(element => {
      this.feature_value_left.push(this.main_data['projectdata'][this.dateleft]['SCPM']['summary']['summary'][feature][element]['Actual'])
      this.feature_value_total.push(this.main_data['projectdata'][this.dateleft]['SCPM']['summary']['summary'][feature][element]['Total'])
    });
    this.Feature_key_right.forEach(element => {
      this.feature_value_right.push(this.main_data['projectdata'][this.dateright]['SCPM']['summary']['summary'][feature][element]['Actual'])
    });

    this.series = [{
      name: this.dateleft,
      data: this.feature_value_left
    },
    {
      name: this.dateright,
      data: this.feature_value_right
    }]

    for (let index = 0; index < this.Feature_key_left.length; index++) {
      this.percentage_progress.push(((Math.abs(this.feature_value_left[index] - this.feature_value_right[index]) / this.feature_value_total[index]) * 100).toFixed(2))
    }

    this.on_toggle_change(this.checked, this.mode)
  }
}
