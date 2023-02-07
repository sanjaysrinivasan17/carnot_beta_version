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
  selector: 'app-inverter-analytics',
  templateUrl: './inverter-analytics.component.html',
  styleUrls: ['./inverter-analytics.component.css']
})
export class InverterAnalyticsComponent implements OnInit {

  @ViewChild("chart") chart: ChartComponent;
  public chartOptions: Partial<ChartOptions>;

  feature: any;
  subfeature: any;
  checked: boolean;
  main_data: any;
  dateleft: any;
  dateright: any;
  inverter_group_keys: any;
  inverter_subgroup_keys: any;
  inverter_keys: any;
  feature_val: any;
  subfeature_val: any;
  date_left_sub_group_values: any = [];
  date_right_sub_group_values: any = [];
  mode: any;
  series: any = [];
  percentage_progress: any = [];
  feature_value_total: any = [];
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
    // alert(this.type)
    if (this.type == 'SCPM') {
      this.inverter_keys = Object.keys(this.main_data['projectdata'][this.dateright]['SCPM']['inverter']['Inverter'])
      this.inverter_keys.forEach(element => {
        this.inverter_group_keys = Object.keys(this.main_data['projectdata'][this.dateleft]['SCPM']['inverter']['Inverter'][element])
      });

      console.log(this.inverter_group_keys);
alert()
      this.feature = this.inverter_group_keys[0]
      this.subfeature = Object.keys(this.main_data['projectdata'][this.dateleft]['SCPM']['inverter']['Inverter'][this.inverter_keys[0]][this.inverter_group_keys[0]])

      this.series = [{
        name: this.dateleft,
        data: [0, 0, 0, 0, 0, 0, 0]
      },
      {
        name: this.dateright,
        data: [0, 0, 0, 0, 0, 0, 0]
      }]

    }
    else if (this.type == 'SCQM') {

      console.log(this.main_data['projectdata'][this.dateright]['SCQM']['inverter_deviation']['data'])

      this.inverter_keys = Object.keys(this.main_data['projectdata'][this.dateright]['SCQM']['inverter_deviation']['data'])
      this.inverter_keys.forEach(element => {
        this.inverter_group_keys = Object.keys(this.main_data['projectdata'][this.dateleft]['SCQM']['inverter_deviation']['data'][element])
      });
      this.selectChangesubfeature("subfeature")
    }

    this.on_toggle_change('false', 'Chart')
  }


  selectChangefeature(feature: any) {
    // alert(feature)
    this.feature_val = feature
    if (this.type == 'SCPM') {
      this.inverter_subgroup_keys = Object.keys(this.main_data['projectdata'][this.dateleft]['SCPM']['inverter']['Inverter'][this.inverter_keys[0]][feature])

      if (this.subfeature_val) {
        this.selectChangesubfeature(this.subfeature_val)
      }
    } else if (this.type == 'SCQM') {
      this.date_left_sub_group_values = []
      this.date_right_sub_group_values = []
      this.feature_value_total = []
      this.inverter_keys.forEach(element => {        
        this.date_left_sub_group_values.push(this.main_data['projectdata'][this.dateleft]['SCQM']['inverter_deviation']['data'][element][feature]['actual'])
        this.date_right_sub_group_values.push(this.main_data['projectdata'][this.dateright]['SCQM']['inverter_deviation']['data'][element][feature]['actual'])
        this.feature_value_total.push(this.main_data['projectdata'][this.dateright]['SCQM']['inverter_deviation']['data'][element][feature]['total'])
      });


      // console.log(this.date_left_sub_group_values);
      // console.log(this.date_right_sub_group_values);

      this.series = [{
        name: this.dateleft,
        data: this.date_left_sub_group_values
      },
      {
        name: this.dateright,
        data: this.date_right_sub_group_values
      }]

      for (let index = 0; index < this.inverter_keys.length; index++) {
        this.percentage_progress.push(((Math.abs(this.date_left_sub_group_values[index] - this.date_right_sub_group_values[index]) / this.feature_value_total[index]) * 100).toFixed(2))
      }
      this.on_toggle_change('false', 'Chart')
    }
  }

  selectChangesubfeature(subfeature: any) {
    this.subfeature_val = subfeature
    this.date_left_sub_group_values = []
    this.date_right_sub_group_values = []
    this.feature_value_total = []
    if (this.type == 'SCPM') {
      this.inverter_keys.forEach(element => {
        this.date_left_sub_group_values.push(this.main_data['projectdata'][this.dateleft]['SCPM']['inverter']['Inverter'][element][this.feature_val][this.subfeature_val]['Actual'])
        this.date_right_sub_group_values.push(this.main_data['projectdata'][this.dateright]['SCPM']['inverter']['Inverter'][element][this.feature_val][this.subfeature_val]['Actual'])
        this.feature_value_total.push(this.main_data['projectdata'][this.dateright]['SCPM']['inverter']['Inverter'][element][this.feature_val][this.subfeature_val]['Total'])
      });


      // console.log(this.date_left_sub_group_values);
      // console.log(this.date_right_sub_group_values);

      this.series = [{
        name: this.dateleft,
        data: this.date_left_sub_group_values
      },
      {
        name: this.dateright,
        data: this.date_right_sub_group_values
      }]
    }

    // console.log(this.series);


    for (let index = 0; index < this.inverter_keys.length; index++) {
      this.percentage_progress.push(((Math.abs(this.date_left_sub_group_values[index] - this.date_right_sub_group_values[index]) / this.feature_value_total[index]) * 100).toFixed(2))
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
          categories: this.inverter_keys
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