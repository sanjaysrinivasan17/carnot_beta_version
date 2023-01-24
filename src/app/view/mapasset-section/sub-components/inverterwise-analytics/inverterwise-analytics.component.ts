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
  selector: 'app-inverterwise-analytics',
  templateUrl: './inverterwise-analytics.component.html',
  styleUrls: ['./inverterwise-analytics.component.css']
})
export class InverterwiseAnalyticsComponent {

  @ViewChild("chart") chart: ChartComponent;
  public chartOptions: Partial<ChartOptions>;

  feature: any;
  subfeature: any;
  main_data: any;
  dateleft: any;
  dateright: any;
  inverter_keys: any;
  series: any = [];
  inverter_val: any;
  inverter_group_keys: any;
  feature_val: any;
  date_left_feature_values: any = [];
  feature_value_total: any = [];
  sub_feature_key: any;
  date_right_feature_values: any = [];
  mode: any;
  checked: boolean;
  percentage_progress: any = [];
  type: string;



  constructor(private _http: HttpAssetService) { }

  ngOnInit(): void {
    this._http.Asset_project().subscribe(data => {
      this.main_data = data['data']
      console.log(this.main_data)
      this.onload()

    })
  }

  onload() {
    this.dateleft = sessionStorage.getItem('dateleft')
    this.dateright = sessionStorage.getItem('dateright')
    this.type = sessionStorage.getItem('type')
    if(this.type == 'SCPM'){
      this.inverter_keys = Object.keys(this.main_data['projectdata'][this.dateright]['SCPM']['inverter']['Inverter'])

    
    }
    else if(this.type == 'SCQM'){
      this.inverter_keys = Object.keys(this.main_data['projectdata'][this.dateright]['SCQM']['inverter_deviation']['data'])
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
    // console.log(this.inverter_keys);


   

  }


  selectChangefeature(inverter: any) {
    this.inverter_val = inverter
    if(this.type == 'SCPM'){
      this.inverter_group_keys = Object.keys(this.main_data['projectdata'][this.dateleft]['SCPM']['inverter']['Inverter'][inverter])
      if(this.feature_val){
        this.selectChangesubfeature(this.feature_val)
      }
    }
    else if (this.type == 'SCQM'){
   
      this.date_left_feature_values = []
      this.date_right_feature_values = []
      this.feature_value_total = []
      this.sub_feature_key = Object.keys(this.main_data['projectdata'][this.dateleft]['SCQM']['inverter_deviation']['data'][inverter])
      this.sub_feature_key.forEach(element => {
        this.date_left_feature_values.push(this.main_data['projectdata'][this.dateleft]['SCQM']['inverter_deviation']['data'][inverter][element]['actual'])
        this.date_right_feature_values.push(this.main_data['projectdata'][this.dateright]['SCQM']['inverter_deviation']['data'][inverter][element]['actual'])
        this.feature_value_total.push(this.main_data['projectdata'][this.dateright]['SCQM']['inverter_deviation']['data'][inverter][element]['total'])
      });
      this.series = [{
        name: this.dateleft,
        data: this.date_left_feature_values
      },
      {
        name: this.dateright,
        data: this.date_right_feature_values
      }]

      for (let index = 0; index < this.inverter_keys.length; index++) {
        this.percentage_progress.push(((Math.abs(this.date_left_feature_values[index] - this.date_right_feature_values[index]) / this.feature_value_total[index]) * 100).toFixed(2))
      }
      this.checked = false
      this.on_toggle_change('false', 'Chart')
    }
  }

  selectChangesubfeature(feature: any) {
    // alert(feature)
    this.feature_val = feature
    this.date_left_feature_values = []
    this.date_right_feature_values = []
    this.feature_value_total = []
    this.sub_feature_key = Object.keys(this.main_data['projectdata'][this.dateleft]['SCPM']['inverter']['Inverter'][this.inverter_val][feature])
    if (this.type == 'SCPM'){
      this.sub_feature_key.forEach(element => {
        this.date_left_feature_values.push(this.main_data['projectdata'][this.dateleft]['SCPM']['inverter']['Inverter'][this.inverter_val][feature][element]['Actual'])
        this.date_right_feature_values.push(this.main_data['projectdata'][this.dateright]['SCPM']['inverter']['Inverter'][this.inverter_val][feature][element]['Actual'])
        this.feature_value_total.push(this.main_data['projectdata'][this.dateright]['SCPM']['inverter']['Inverter'][this.inverter_val][feature][element]['Total'])
      });
  
      // console.log(this.date_left_sub_group_values);
      // console.log(this.date_right_sub_group_values);
  
      this.series = [{
        name: this.dateleft,
        data: this.date_left_feature_values
      },
      {
        name: this.dateright,
        data: this.date_right_feature_values
      }]
    }
    

    // console.log(this.series);


    for (let index = 0; index < this.inverter_keys.length; index++) {
      this.percentage_progress.push(((Math.abs(this.date_left_feature_values[index] - this.date_right_feature_values[index]) / this.feature_value_total[index]) * 100).toFixed(2))
    }
    this.checked = false
    this.on_toggle_change('false', 'Chart')

  }
  toggleChangeType(checked: any) {

    if (checked) {
      this.checked = false
      this.on_toggle_change(checked, 'Chart')
    } else {
      this.checked = true
      this.on_toggle_change(checked, 'Table')

    }
  }

  on_toggle_change(checked: any, mode: any) {
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
          categories: this.sub_feature_key
        }
      };


    } else {

      var div = document.getElementById('Chart');
      div.style.display = 'none'
      var statusdiv = document.getElementById('Table');
      statusdiv.style.display = 'block'


    }
  }


}