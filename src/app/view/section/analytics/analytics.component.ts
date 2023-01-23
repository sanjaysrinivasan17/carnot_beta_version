import { Component, OnInit, ViewChild } from '@angular/core';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { Router } from '@angular/router';
import { Injectable } from '@angular/core';
import * as _ from 'lodash';
import { HttpService } from "../../map-section/services-map/http.service";
import { environment } from '../../../../environments/environment';
import { ChartComponent } from "ng-apexcharts";


import {
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

import { NgxUiLoaderService } from "ngx-ui-loader";
import { timeStamp } from 'console';
import { empty } from 'rxjs';


export type ChartOptions3 = {
  series: ApexAxisChartSeries;
  chart: ApexChart;
  dataLabels: ApexDataLabels;
  plotOptions: ApexPlotOptions;
  legend: ApexLegend;
  tooltip: ApexTooltip;
  xaxis: ApexXAxis;
  grid: ApexGrid;
};

export type ChartOptions4 = {
  series: ApexNonAxisChartSeries;
  chart: ApexChart;
  responsive: ApexResponsive[];
  labels: any;
  tooltip: ApexTooltip;
  fill: ApexFill;
  legend: ApexLegend;
  dataLabels: ApexDataLabels;
};
export type ChartOptions4s = {
  series: ApexNonAxisChartSeries;
  chart: ApexChart;
  responsive: ApexResponsive[];
  plotOptions: ApexPlotOptions;
  tooltip: ApexTooltip;
  colors: string[];
  labels: any;
  legend: ApexLegend;
  dataLabels: ApexDataLabels;
};


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
  legend: ApexLegend;
  tooltip: ApexTooltip;
  theme: ApexTheme;
  title: ApexTitleSubtitle;
  dataLabels: ApexDataLabels;
  colors: string[];
};

export type ChartOptions10 = {
  series: ApexNonAxisChartSeries;
  chart: ApexChart;
  responsive: ApexResponsive[];
  labels: any;
  legend: ApexLegend;
  tooltip: ApexTooltip;
  theme: ApexTheme;
  title: ApexTitleSubtitle;
  dataLabels: ApexDataLabels;
  colors: string[];
};

export type ChartOptions11 = {
  series: ApexNonAxisChartSeries;
  chart: ApexChart;
  responsive: ApexResponsive[];
  labels: any;
  legend: ApexLegend;
  tooltip: ApexTooltip;
  theme: ApexTheme;
  title: ApexTitleSubtitle;
  dataLabels: ApexDataLabels;
  colors: string[];
};

export type ChartOptions5 = {
  series: ApexAxisChartSeries;
  chart: ApexChart;
  dataLabels: ApexDataLabels;
  plotOptions: ApexPlotOptions;
  tooltip: ApexTooltip;
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
  series: ApexNonAxisChartSeries;
  chart: ApexChart;
  responsive: ApexResponsive[];
  labels: any;
  dataLabels: ApexDataLabels;
  tooltip: ApexTooltip;
  legend: ApexLegend;
  theme: ApexTheme;
  title: ApexTitleSubtitle;
  colors: string[];
};

export type ChartOptions12 = {
  series: ApexAxisChartSeries;
  chart: ApexChart;
  xaxis: ApexXAxis;
  yaxis: ApexYAxis | ApexYAxis[];
  title: ApexTitleSubtitle;
  legend: ApexLegend;
  labels: string[];
  stroke: any; // ApexStroke;
  dataLabels: ApexDataLabels;
  // ApexDataLabels;
  fill: ApexFill;
  colors: string[];
  tooltip: ApexTooltip;
};
// export type ChartOptions8 = {
//   series: ApexNonAxisChartSeries;
//   chart: ApexChart;
//   labels: string[];
//   plotOptions: ApexPlotOptions;
// };
export type chartOptions9 = {
  series: ApexAxisChartSeries;
  chart: ApexChart;
  dataLabels: ApexDataLabels;
  plotOptions: ApexPlotOptions;
  yaxis: ApexYAxis;
  xaxis: ApexXAxis;
  fill: ApexFill;
  tooltip: ApexTooltip;
  stroke: ApexStroke;
  legend: ApexLegend;
  colors: string[];
  grid: ApexGrid;

};

export type ChartOptions8 = {
  series: ApexAxisChartSeries;
  chart: ApexChart;
  xaxis: ApexXAxis;
  yaxis: ApexYAxis | ApexYAxis[];
  title: ApexTitleSubtitle;
  legend: ApexLegend;
  labels: string[];
  stroke: any; // ApexStroke;
  dataLabels: ApexDataLabels;
  // ApexDataLabels;
  fill: ApexFill;
  colors: string[];
  tooltip: ApexTooltip;
};


@Injectable({
  providedIn: 'root'
})
export class CommonService {
  constructor() { }

  getDropDownText(id, object) {
    const selObj = _.filter(object, function (o) {
      return (_.includes(id, o.id));
    });
    return selObj;
  }

}



@Component({
  selector: 'app-analytics',
  templateUrl: './analytics.component.html',
  styleUrls: ['./analytics.component.css']
})
export class AnalyticsComponent implements OnInit {


  @ViewChild("chart3") chart3: ChartComponent;
  public chartOptions3: Partial<ChartOptions3>;

  @ViewChild("chart4") chart4: ChartComponent;
  public chartOptions4: Partial<ChartOptions4>;

  @ViewChild("chart1") chart1: ChartComponent;
  public chartOptions1: Partial<ChartOptions1>;

  @ViewChild("chart") chart: ChartComponent;
  public chartOptions: Partial<ChartOptions>;

  @ViewChild("chart4") chart4s: ChartComponent;
  public chartOptions4s: Partial<ChartOptions4s>;

  @ViewChild("chart5") chart5: ChartComponent;
  public chartOptions5: Partial<ChartOptions5>;

  @ViewChild("chart6") chart6: ChartComponent;
  public chartOptions6: Partial<ChartOptions6>;

  @ViewChild("chart7") chart7: ChartComponent;
  public chartOptions7: Partial<ChartOptions7>;

  @ViewChild("chart8") chart8: ChartComponent;
  public chartOptions8: Partial<ChartOptions8>;

  @ViewChild("chart9") chart9: ChartComponent;
  public chartOptions9: Partial<chartOptions9>;

  @ViewChild("chart10") chart10: ChartComponent;
  public chartOptions10: Partial<ChartOptions10>;

  @ViewChild("chart11") chart11: ChartComponent;
  public chartOptions11: Partial<ChartOptions1>;

  @ViewChild("chart12") chart12: ChartComponent;
  public chartOptions12: Partial<ChartOptions12>;

  project_id_summary: any
  public date_summary: any
  Project_layer_summary: any
  Project_layer_summary_values: any
  power_loss_values: any;
  power_loss_values_energy: any;
  power_loss_values_revenue: any;

  data: any
  public project_layer_summary_data = [];
  public project_layer_summary_lable = [];
  samp = [];
  main_data: any;

  bardata = [];

  inv_main_data: any;
  datevalue: any;
  project_id_inv: any;
  date_inv: any;
  Project_layer_inv: any
  public Project_layer_inverter_data: any
  Project_layer_inverter_data_values: any
  project_layer_inv_data = [];
  project_layer_inv_lable = [];

  Hotspot_inv = [];
  ShortCircit_inv = [];
  Open_Circuit_inv = [];
  pannel_inv = [];
  Pid = [];

  Hotspot_inv_val = [];
  ShortCircit_inv_val = [];
  Open_Circuit_inv_val = [];
  pannel_inv_val = [];
  Pid_val = [];

  public total_count = [];
  total_count_inverter = [];

  resourcesLoaded: boolean = true;

  selector: any;
  date: any;

  summary_def_def: any;
  summary_def_cou: any;

  inverter_def_def: any;
  inverter_def_cou: any;

  ana_def_def: any;
  ana_def_cou: any;
  hotpot_summary: any;
  short_circuit_summary: any;
  Open_circuit_summary: any;
  Panel_Failure_summary: any;
  PID_summary: any;

  ChangedDate: any;
  SelectedDate: any;
  getting_date: any;


  public inver_wise_data = [];
  inver_wise_lable = [];

  public inver_wise_def_lable: any;
  inver_wise_def_hot: any;
  inver_wise_def_sc: any;
  inver_wise_def_os: any;
  inver_wise_def_pf: any;
  inver_wise_def_pid: any;
  datesumlength: any;
  public currentopenedtab = [];
  lin = '../../../../assets/images/defects/Hotspot.png'
  inver_lin = '../../../../assets/images/defects/itc_1.JPG'

  currenttabcount: any;
  firstvalue: any;
  ChangedDateAllProjects: any;
  newDatefromAllProjects: any;
  public date_summary_status_key: any;
  public date_summary_status_value: any;
  public Completed_date_array: any;
  public summary_data_values: any;
  new_center: any;
  public summary_color: any;
  dashboard_total_key: string[];
  dashboard_total_values: unknown[];
  total_defects: any;
  plant_size_scanned: any;
  total_power_loss: any;
  main_data1: any;
  health_history: any;
  health_history_data: any;
  health_history_keys: any;
  total_power_loss_dates: any;
  total_no_defects_dates: any;
  defects_dates: any;
  power_loss_keys: any;
  powerloss_keys: any;
  public plant_capacity_datewise: any;
  public total_power_loss_datewise: any;
  total_no_defects_datewise: any;
  Total_power_loss_percenntage: any;
  public current_year: any;
  Project_Name: string;
  ana_def_cou_perc_1: any;
  ana_def_cou_desc_1: any;
  ana_def_cou_desc: any;
  ana_desc: string[];
  public energy: any;
  public total_energy_loss: any;
  public tariff: any;
  public total_tariff: any;
  public health_history_key_data: any;
  public total_module_count: any;
  public module_count_defectwise_key: any;
  public module_count_defectwise_value: any;
  public DC_Capacity_in_KW: any;
  public Total_power_loss_in_ppm: any;
  public total_energy_loss_in_ppm: any;
  public total_energy_loss_in_KW_ppm: any;
  public total_energy_loss_calc_in_ppm: any;
  public energy_defectwise: any;
  public energy_defectwise_chart: any;
  public revenue_defectwise: any;
  public total_revenue_loss_in_ppm: any;
  public total_revenue_loss_in_KW_ppm: any;
  public total_revenue_loss_in_ppm_INR: any;

  public Chart_hide_show: any;
  public Chart_hide_show_revenue: any;




  constructor(private _http: HttpService, private ngxService: NgxUiLoaderService, private router: Router, private commonService: CommonService) {
    this.ngxService.start();

  }

  ngOnInit(): void {
this.Chart_hide_show = "hide";
this.Chart_hide_show_revenue = "hide";
    this.energy_defectwise = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]
    this.revenue_defectwise = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]
    this._http.getChangedCompletedDate().subscribe(info => {
      this.ChangedDateAllProjects = info;
      this.newDatefromAllProjects = this.ChangedDateAllProjects.dateval
      this._http.setNewMapIcon({
        dateval: "Analytics"
      });
      // alert( this.newDatefromAllProjects+"-- this.newDatefromAllProjects---")
      setTimeout(() => {
        this.ngxService.stop();
      }, 2100)
      this.firstvalue = "";
      this._http.getNewUserInfo().subscribe(info => {
        this.ChangedDate = info;
        this.SelectedDate = this.ChangedDate.dateval
        this.Completed_date_array = [];

        const newName = localStorage.getItem("name");
        this.Project_Name = localStorage.getItem("name");

      const token = localStorage.getItem("token");
      const headers = {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json',
      };

        fetch(`${environment.api_name}api/project/get_dashboard_data/`, {
          headers,
          credentials: 'omit',
        })
          .then(response => response.json())
          .then(data1 => {
            this.main_data1 = data1
            // // // console.log(data1)
            // // // console.log("---------------------------------------------")
            this.dashboard_total_key = Object.keys(data1['dashboard_total'])
            // alert(this.dashboard_total_key)
            this.dashboard_total_values = Object.values(data1['dashboard_total'])
            // plant_size_scanned,total_defects,total_power_loss
            this.plant_size_scanned = data1['plant_size_scanned']
            this.total_defects = data1['total_defects']
            this.total_power_loss = data1['total_power_loss']
          })

        // fetch(`${environment.api_name}project/retrieve_project_data/${newName}`, {
        //   headers ,
        //   credentials: 'omit',
        // })
        //   .then(response => response.json())
        //   .then(data => {
        //     this.main_data = data
        //     // // // console.log(this.main_data)
        //     // // // console.log("------------------------------------------------------------------------")
        //     // alert()
        //     this.project_id_summary = Object.keys(data)
        //     this.date_summary = Object.values(data[this.project_id_summary])[2]
        //     this.new_center = Object.values(data[this.project_id_summary])[6]
        //     //  alert(this.new_center)
        //     localStorage.setItem("center", this.new_center);
        //     this.date_summary_status_key = Object.keys(data[this.project_id_summary]["date_status"])
        //     this.date_summary_status_value = Object.values(data[this.project_id_summary]["date_status"])
        //     for (var k = 0; k < this.date_summary_status_key.length; k++) {
        //       if (this.date_summary_status_value[k] == "completed") {
        //         this.Completed_date_array.push(this.date_summary_status_key[k])
        //         // alert(this.Completed_date_array)
        //       }
        //     }

        //     this.datesumlength = this.Completed_date_array.length - 1
        //     this.getting_date = this.Completed_date_array[this.datesumlength]
        //     this.date = this.Completed_date_array[this.datesumlength]
        //     var date_local = localStorage.getItem('date')
        //     if (date_local == "undefined" || date_local == "" || date_local == null) {
        //       if (this.newDatefromAllProjects == "undefined" || this.newDatefromAllProjects == "" || this.newDatefromAllProjects == null) {
        //         if (this.SelectedDate == "undefined" || this.SelectedDate == "" || this.SelectedDate == null) {
        //           this.datevalue = this.getting_date
        //           // alert("---map section date ===="+this.datevalue)

        //         } else if (this.SelectedDate != "undefined" && this.SelectedDate != "" && this.SelectedDate != null) {
        //           this.date = this.ChangedDate.dateval
        //           this.datevalue = this.SelectedDate
        //           // alert("---defaukt date ===="+this.datevalue)
        //         }
        //       } else if (this.newDatefromAllProjects != "undefined" || this.newDatefromAllProjects != "" || this.newDatefromAllProjects != null) {
        //         this.datevalue = this.newDatefromAllProjects
        //         this.date = this.newDatefromAllProjects

        //       }
        //     } else {
        //       this.datevalue = date_local
        //       this.date = date_local
        //     }
        //     // alert(this.datevalue)
        //     this.project_layer_summary_data = [];
        //     this.project_layer_summary_lable = [];
        //     this.Hotspot_inv_val = [];
        //     this.ShortCircit_inv_val = [];
        //     this.Open_Circuit_inv_val = [];
        //     this.pannel_inv_val = [];
        //     this.Pid_val = [];
        //     this.total_count = [];
        //     // alert("for wait")
        //     // alert(this.Completed_date_array.length)

        //     if (this.Completed_date_array.length == 0) {
        //       // alert("empty")
        //       var style = "";
        //       var style2 = "";

        //       // this.firstvalue = "n";
        //       style = "none";
        //       style2 = "block";
        //       this.resourcesLoaded = false;

        //       this.Project_layer_summary_values = 0

        //       // // // console.log(this.firstvalue + "-----" + this.Project_layer_summary_values.length)
        //       var formElement = document.getElementById("powerlossNo");
        //       formElement.style.display = style;
        //       var formElement2 = document.getElementById("powerlossYes");
        //       formElement2.style.display = style2;
        //       // alert(style)


        //     }
        //     // // // console.log(Object.keys(this.main_data[this.project_id_summary][this.datevalue]['summary_data']))
        //     localStorage.setItem("date", this.datevalue);
        //     this.power_loss_keys = []
        //     this.Project_layer_summary = Object.keys(this.main_data[this.project_id_summary][this.datevalue]['summary_data'])
        //     this.Project_layer_summary_values = Object.values(this.main_data[this.project_id_summary][this.datevalue]['summary_data'])
        //     this.Project_layer_inverter_data = Object.keys(this.main_data[this.project_id_summary][this.datevalue]['inverter_data'])
        //     this.Project_layer_inverter_data_values = Object.values(this.main_data[this.project_id_summary][this.datevalue]['inverter_data'])
        //     this.health_history = Object.values(this.main_data[this.project_id_summary][this.datevalue]['health_history'])
        //     this.health_history_key_data = Object.keys(this.main_data[this.project_id_summary][this.datevalue]['health_history'])
        //     this.power_loss_keys = Object.keys(this.main_data[this.project_id_summary][this.datevalue]['power_loss'])
        //     this.power_loss_values = Object.values(this.main_data[this.project_id_summary][this.datevalue]['power_loss'])
        //     this.power_loss_values_energy = Object.values(this.main_data[this.project_id_summary][this.datevalue]['power_loss'])
        //     this.power_loss_values_revenue = Object.values(this.main_data[this.project_id_summary][this.datevalue]['power_loss'])
        //     this.plant_capacity_datewise = (this.main_data[this.project_id_summary]['plant_capacity'])
        //     this.total_power_loss_datewise = (this.main_data[this.project_id_summary][this.datevalue]['total_power_loss'])
        //     this.total_no_defects_datewise = (this.main_data[this.project_id_summary][this.datevalue]['total_no_defects'])
        //     this.total_module_count = (this.main_data[this.project_id_summary][this.datevalue]['total_modules_present'])
        //     // alert(this.total_module_count)
        //     // // // console.log(this.power_loss_keys)
        //     // alert(this.power_loss_values)
        //     // // // console.log("------------------------------------------------------------------------"+this.datevalue)
        //     // alert('-'+Object.keys(this.main_data[this.project_id_summary][this.datevalue]['power_loss'])+'-')

        //     this.current_year = this.datevalue
        //     this.health_history_data = []
        //     this.total_power_loss_dates = []
        //     this.total_no_defects_dates = []
        //     this.defects_dates = []
        //     var Total_power_loss = 0
        //     var power_loss_merics = 0
        //     this.Total_power_loss_percenntage = []
        //     var new_defects = null;
        //     this.module_count_defectwise_key = [];
        //     this.module_count_defectwise_value = [];
        //     for (var v = 0; v < this.health_history_key_data.length; v++) {
        //       var modulecount_defectwise = ((this.health_history[v] / this.total_module_count) * 1000000).toFixed(2)
        //       this.module_count_defectwise_value.push(modulecount_defectwise)
        //       // // console.log(this.module_count_defectwise_value + "--------" + this.health_history[v])
        //     }
        //     for (var p = 0; p < this.date_summary_status_key.length; p++) {
        //       const d = new Date(this.current_year);
        //       const array_date = new Date(this.date_summary_status_key[p]);
        //       let year = d.getFullYear();
        //       let year_array_date = array_date.getFullYear();
        //       if (year_array_date <= year) {
        //         // alert(year+"----------"+year_array_date)
        //         this.health_history = Object.values(this.main_data[this.project_id_summary][this.date_summary_status_key[p]]['health_history'])
        //         this.total_power_loss_dates.push(this.main_data[this.project_id_summary][this.date_summary_status_key[p]]['total_power_loss'])
        //         new_defects = this.main_data[this.project_id_summary][this.date_summary_status_key[p]]['total_no_defects']
        //         if (new_defects != 0) {
        //           this.total_no_defects_dates.push(new_defects)
        //           this.defects_dates.push([this.date_summary_status_key[p]])
        //         }
        //         this.health_history_keys = Object.keys(this.main_data[this.project_id_summary][this.datevalue]['health_history'])

        //         this.health_history_data.push({ "name": this.date_summary_status_key, "data": this.health_history })
        //       }


        //     }
        //     this.health_history_keys = Object.keys(this.main_data[this.project_id_summary][this.datevalue]['health_history'])

        //     this.summary_data_values = []
        //     this.summary_color = [];

        //     for (var i = 0; i < this.Project_layer_summary.length; i++) {

        //       this.summary_data_values.push(this.Project_layer_summary_values[i]['Count'])

        //       // // console.log("----------" + this.summary_data_values)
        //       this.project_layer_summary_data.push(this.Project_layer_summary_values[i]['Count'])
        //       this.project_layer_summary_lable.push(this.Project_layer_summary[i])
        //       this.summary_color.push(colourNameToHex(this.Project_layer_summary_values[i]["color"]))

        //       //   // // console.log("----data----"+this.Project_layer_summary_values[i]['Count'])
        //       //   // // console.log("----lable----"+this.Project_layer_summary[i])
        //     }
        //     // // // console.log("=====ytehdn======"+this.project_layer_summary_lable)
        //     this.ana_def_def = this.project_layer_summary_lable[0]
        //     this.ana_def_cou = this.project_layer_summary_data[0]
        //     // alert("----thisana_def_def--"+this.ana_def_def)

        //     for (var i = 0; i < this.Project_layer_inverter_data.length; i++) {
        //       // alert(this.Project_layer_inverter_data[i]+"-----"+this.Project_layer_inverter_data_values[i]['Hotspot']['count'])

        //       this.Hotspot_inv_val.push(this.Project_layer_inverter_data_values[i][this.Project_layer_summary[0]]['count'])
        //       this.ShortCircit_inv_val.push(this.Project_layer_inverter_data_values[i][this.Project_layer_summary[1]]['count'])
        //       this.Open_Circuit_inv_val.push(this.Project_layer_inverter_data_values[i][this.Project_layer_summary[2]]['count'])
        //       this.pannel_inv_val.push(this.Project_layer_inverter_data_values[i][this.Project_layer_summary[3]]['count'])
        //       this.Pid_val.push(this.Project_layer_inverter_data_values[i][this.Project_layer_summary[4]]['count'])
        //       this.inver_wise_lable.push(this.Project_layer_inverter_data[i])
        //       // // // console.log(this.datevalue+"====="+[i]+"====="+this.Project_layer_inverter_data_values[i]['Hotspot']['count']+"---"+this.Project_layer_inverter_data_values[0]['Short Circuit']['count']+"===="+this.Project_layer_inverter_data_values[i]['Open Circuit']['count']+"-----"+this.Project_layer_inverter_data_values[i]['Panel Failure']['count']+"====="+this.Project_layer_inverter_data_values[i]['PID']['count']) colourNameToHex(
        //       this.inver_wise_def_lable = this.inver_wise_lable[0]
        //       this.inver_wise_def_hot = this.Project_layer_inverter_data_values[0][this.Project_layer_summary[0]]['count']
        //       this.inver_wise_def_sc = this.Project_layer_inverter_data_values[0][this.Project_layer_summary[1]]['count']
        //       this.inver_wise_def_os = this.Project_layer_inverter_data_values[0][this.Project_layer_summary[2]]['count']
        //       this.inver_wise_def_pf = this.Project_layer_inverter_data_values[0][this.Project_layer_summary[3]]['count']
        //       this.inver_wise_def_pid = this.Project_layer_inverter_data_values[0][this.Project_layer_summary[4]]['count']


        //     }

        //     power_loss_merics = this.total_power_loss_datewise;
        //     // alert(this.total_power_loss_datewise)
        //     for (var n = 0; n < this.Project_layer_inverter_data.length; n++) {

        //       this.total_count.push(+this.Hotspot_inv_val[n] + +this.ShortCircit_inv_val[n] + +this.Open_Circuit_inv_val[n] + +this.pannel_inv_val[n] + +this.Pid_val[n])
        //     }
        //     for (var z = 0; z < this.power_loss_keys.length; z++) {
        //       // alert(this.power_loss_values[z])
        //       Total_power_loss = Total_power_loss + this.power_loss_values[z]
        //     }
        //     // alert(Total_power_loss)
        //     var powerloss_data = [];
        //     var powerloss_key = [];
        //     for (var z = 0; z < this.power_loss_keys.length; z++) {
        //       // alert(this.power_loss_values[z])
        //       var percentage_calc = (this.power_loss_values[z] / Total_power_loss)
        //       var n_percentage_calc = parseFloat((Math.round(this.total_power_loss_datewise * percentage_calc * 100) / 100).toFixed(2));

        //       this.Total_power_loss_percenntage.push(n_percentage_calc)
        //       // alert(this.power_loss_values[z])
        //       powerloss_key.push(this.power_loss_keys[z])
        //       powerloss_data.push(this.power_loss_values[z])
        //     }
        //     const graph_data = {
        //       "summary": [
        //         { "hotspot": this.summary_data_values[0], "shortcircuit": this.summary_data_values[1], "opencircuit": this.summary_data_values[2], "pannelfaluer": this.summary_data_values[3], "pid": this.summary_data_values[4] }
        //       ],
        //       "Inverter": [
        //         { "INV1": this.total_count[0], "INV2": this.total_count[1], "INV3": this.total_count[2], "INV4": this.total_count[3], "INV5": this.total_count[4], "INV6": this.total_count[5], "INV7": this.total_count[6], "INV8": this.total_count[7], "INV9": this.total_count[8] }
        //       ],
        //       "Inverter_label": [
        //         {
        //           "label1": this.Project_layer_inverter_data[0], "label2": this.Project_layer_inverter_data[1], "label3": this.Project_layer_inverter_data[2], "label4": this.Project_layer_inverter_data[3], "label5": this.Project_layer_inverter_data[4], "label6": this.Project_layer_inverter_data[5], "label7": this.Project_layer_inverter_data[6], "label8": this.Project_layer_inverter_data[7], "label9": this.Project_layer_inverter_data[8]
        //         }
        //       ],
        //       "power_loss_keys": [{ "keys0": this.power_loss_keys[0], "keys1": this.power_loss_keys[1], "keys2": this.power_loss_keys[2], "keys3": this.power_loss_keys[3], "keys4": this.power_loss_keys[4], "keys5": this.power_loss_keys[5], "keys6": this.power_loss_keys[6], "keys7": this.power_loss_keys[7] }],
        //       "power_loss_values": [{ "values0": this.power_loss_values[0], "values1": this.power_loss_values[1], "values2": this.power_loss_values[2], "values3": this.power_loss_values[3], "values4": this.power_loss_values[4], "values5": this.power_loss_values[5], "values6": this.power_loss_values[6], "values7": this.power_loss_values[7] }]
        //     }
        //     // // console.log(graph_data)
        //     function colourNameToHex(colour) {
        //       var colours = {
        //         "aliceblue": "#f0f8ff", "antiquewhite": "#faebd7", "aqua": "#00ffff", "aquamarine": "#7fffd4", "azure": "#f0ffff",
        //         "beige": "#f5f5dc", "bisque": "#ffe4c4", "black": "#000000", "blanchedalmond": "#ffebcd", "blue": "#0000ff", "blueviolet": "#8a2be2", "brown": "#a52a2a", "burlywood": "#deb887",
        //         "cadetblue": "#5f9ea0", "chartreuse": "#7fff00", "chocolate": "#d2691e", "coral": "#ff7f50", "cornflowerblue": "#6495ed", "cornsilk": "#fff8dc", "crimson": "#dc143c", "cyan": "#00ffff",
        //         "darkblue": "#00008b", "darkcyan": "#008b8b", "darkgoldenrod": "#b8860b", "darkgray": "#a9a9a9", "darkgreen": "#006400", "darkkhaki": "#bdb76b", "darkmagenta": "#8b008b", "darkolivegreen": "#556b2f",
        //         "darkorange": "#ff8c00", "darkorchid": "#9932cc", "darkred": "#8b0000", "darksalmon": "#e9967a", "darkseagreen": "#8fbc8f", "darkslateblue": "#483d8b", "darkslategray": "#2f4f4f", "darkturquoise": "#00ced1",
        //         "darkviolet": "#9400d3", "deeppink": "#ff1493", "deepskyblue": "#00bfff", "dimgray": "#696969", "dodgerblue": "#1e90ff",
        //         "firebrick": "#b22222", "floralwhite": "#fffaf0", "forestgreen": "#228b22", "fuchsia": "#ff00ff",
        //         "gainsboro": "#dcdcdc", "ghostwhite": "#f8f8ff", "gold": "#ffd700", "goldenrod": "#daa520", "gray": "#808080", "green": "#008000", "greenyellow": "#adff2f",
        //         "honeydew": "#f0fff0", "hotpink": "#ff69b4",
        //         "indianred ": "#cd5c5c", "indigo": "#4b0082", "ivory": "#fffff0", "khaki": "#f0e68c",
        //         "lavender": "#e6e6fa", "lavenderblush": "#fff0f5", "lawngreen": "#7cfc00", "lemonchiffon": "#fffacd", "lightblue": "#add8e6", "lightcoral": "#f08080", "lightcyan": "#e0ffff", "lightgoldenrodyellow": "#fafad2",
        //         "lightgrey": "#d3d3d3", "lightgreen": "#90ee90", "lightpink": "#ffb6c1", "lightsalmon": "#ffa07a", "lightseagreen": "#20b2aa", "lightskyblue": "#87cefa", "lightslategray": "#778899", "lightsteelblue": "#b0c4de",
        //         "lightyellow": "#ffffe0", "lime": "#00ff00", "limegreen": "#32cd32", "linen": "#faf0e6",
        //         "magenta": "#ff00ff", "maroon": "#800000", "mediumaquamarine": "#66cdaa", "mediumblue": "#0000cd", "mediumorchid": "#ba55d3", "mediumpurple": "#9370d8", "mediumseagreen": "#3cb371", "mediumslateblue": "#7b68ee",
        //         "mediumspringgreen": "#00fa9a", "mediumturquoise": "#48d1cc", "mediumvioletred": "#c71585", "midnightblue": "#191970", "mintcream": "#f5fffa", "mistyrose": "#ffe4e1", "moccasin": "#ffe4b5",
        //         "navajowhite": "#ffdead", "navy": "#000080",
        //         "oldlace": "#fdf5e6", "olive": "#808000", "olivedrab": "#6b8e23", "orange": "#ffa500", "orangered": "#ff4500", "orchid": "#da70d6",
        //         "palegoldenrod": "#eee8aa", "palegreen": "#98fb98", "paleturquoise": "#afeeee", "palevioletred": "#d87093", "papayawhip": "#ffefd5", "peachpuff": "#ffdab9", "peru": "#cd853f", "pink": "#ffc0cb", "plum": "#dda0dd", "powderblue": "#b0e0e6", "purple": "#800080",
        //         "rebeccapurple": "#663399", "red": "#ff0000", "rosybrown": "#bc8f8f", "royalblue": "#4169e1",
        //         "saddlebrown": "#8b4513", "salmon": "#fa8072", "sandybrown": "#f4a460", "seagreen": "#2e8b57", "seashell": "#fff5ee", "sienna": "#a0522d", "silver": "#c0c0c0", "skyblue": "#87ceeb", "slateblue": "#6a5acd", "slategray": "#708090", "snow": "#fffafa", "springgreen": "#00ff7f", "steelblue": "#4682b4",
        //         "tan": "#d2b48c", "teal": "#008080", "thistle": "#d8bfd8", "tomato": "#ff6347", "turquoise": "#40e0d0",
        //         "violet": "#ee82ee",
        //         "wheat": "#f5deb3", "white": "#ffffff", "whitesmoke": "#f5f5f5",
        //         "yellow": "#ffff00", "yellowgreen": "#9acd32"
        //       };

        //       if (typeof colours[colour.toLowerCase()] != 'undefined')
        //         return colours[colour.toLowerCase()]
        //       //  this.summary_color.push(color_value);

        //       return false;
        //     }


        //     // const graph_data = {
        //     //       "summary": [
        //     //         { "hotspot": 32, "shortcircuit": 43, "opencircuit": 98, "pannelfaluer": 65, "pid": 21 }
        //     //       ],
        //     //       "Inverter": [
        //     //         { "INV1": 90, "INV2": 43, "INV5": 34, "INV6": 78, "inv4": 98, "inv5": 98, "inv52": 98, "INV61": 90, "INV662": 43, "INV65": 34 }
        //     //       ]
        //     //     }

        //     this.summary_def_def = this.power_loss_keys[0]
        //     this.summary_def_cou = (this.power_loss_values[0] / 1000).toFixed(1)
        //     this.inverter_def_def = Object.values(graph_data['Inverter_label'][0])[0]
        //     this.inverter_def_cou = Object.values(graph_data['Inverter'][0])[0]


        //     // // // console.log(this.inverter_def_def + "-----" + this.inverter_def_cou)
        //     this.resourcesLoaded = false;
        //     // Object.keys(this.main_data[this.project_id_summary][this.datevalue]['inverter_data'])
        //     // // // console.log(Object.values(this.Project_layer_summary))
        //     // // // console.log("----------------------------------------------------------------------------------")
        //     this.chartOptions1 = {
        //       series: this.power_loss_values,
        //       chart: {
        //         width: "100%",
        //         height: 330,
        //         type: "pie",
        //         events: {
        //           dataPointSelection: function (event, chartContext, config) {
        //             const lin = ['../../../../assets/images/defects/Hotspot.png', '../../../../assets/images/defects/Short_Circuit.png', '../../../../assets/images/defects/Open_circuit.png', '../../../../assets/images/defects/Panel_Failure.png', '../../../../assets/images/defects/Bypass_Diode_Failure.png', '../../../../assets/images/defects/Dirt_Vegetation.png', '../../../../assets/images/defects/Open_String_Table.png', '../../../../assets/images/defects/Multicell_Hotspot.png', '../../../../assets/images/defects/PID.png']

        //             this.selector = config['dataPointIndex'];
        //             document.getElementById('summary_def').innerHTML = `<p>` + powerloss_key[this.selector]; + `<p>`
        //             document.getElementById('summary_cou').innerHTML = `<p>` + (powerloss_data[this.selector] / 1000).toFixed(1); + `<p>`
        //             // // // console.log(lin[0])
        //             document.getElementById('summary_im').innerHTML = ` <img src='` + lin[this.selector] + `' width="100%">`
        //           }
        //         },




        //       },


        //       colors: ["#339933", "#1be461", "#ef6c00", "#ffd54f", "#ffa64f", "#17a2b8", "#6f42c1", "#a78bda", "#117888", "#17a2b8", "#28a745"],
        //       labels: this.power_loss_keys,
        //       theme: {
        //         monochrome: {
        //           enabled: false
        //         }
        //       },
        //       tooltip: {
        //         enabled: true,
        //         enabledOnSeries: undefined,
        //         shared: true,
        //         followCursor: false,
        //         intersect: false,
        //         inverseOrder: false,
        //         custom: undefined,
        //         fillSeriesColor: false,

        //         style: {
        //           fontSize: '12px',
        //           fontFamily: "'Montserrat', Helvetica, sans-serif"
        //         },
        //         onDatasetHover: {
        //           highlightDataSeries: false,
        //         },
        //         y: {
        //           formatter: function (val) {
        //             return (val / 1000).toFixed(1) + " kW";
        //           }
        //         },
        //       },
        //       title: {
        //         text: ""
        //       },
        //       dataLabels: {
        //         enabled: true,
        //         enabledOnSeries: undefined,
        //         // formatter: function (val) {
        //         //   // return val.toFixed(1) + " kW";
        //         //   return (parseFloat(((val * power_loss_merics) / 100).toFixed(1))) + " kW";
        //         // },
        //         textAnchor: 'middle',
        //         distributed: false,
        //         offsetX: 0,
        //         offsetY: 0,
        //         style: {
        //           fontSize: '14px',
        //           fontFamily: "'Montserrat', Helvetica, sans-serif",
        //           fontWeight: 'bold',
        //           colors: undefined
        //         },
        //         background: {
        //           enabled: true,
        //           foreColor: '#000',
        //           padding: 4,
        //           borderRadius: 2,
        //           borderWidth: 1,
        //           borderColor: '#fff',
        //           opacity: 0.9,
        //           dropShadow: {
        //             enabled: false,
        //             top: 1,
        //             left: 1,
        //             blur: 1,
        //             color: '#000',
        //             opacity: 0.45
        //           }
        //         },
        //         dropShadow: {
        //           enabled: false,
        //           top: 1,
        //           left: 1,
        //           blur: 1,
        //           color: '#000',
        //           opacity: 0.45
        //         }
        //         // offset: 0,
        //         // minAngleToShowLabel: 10
        //       },
        //       legend: {
        //         show: true,
        //         showForSingleSeries: false,
        //         showForNullSeries: true,
        //         fontFamily: "'Montserrat', Helvetica, sans-serif",
        //         showForZeroSeries: true,
        //         position: 'bottom'
        //       },
        //       responsive: [
        //         {
        //           breakpoint: 480,
        //           options: {
        //             chart: {
        //               width: 250,
        //               height: 200
        //             },
        //             plotOptions: {
        //               pie: {
        //                 startAngle: 0,
        //                 endAngle: 360,
        //                 expandOnClick: true,
        //                 offsetX: 50,
        //                 offsetY: 50,
        //                 customScale: 1,
        //                 dataLabels: {
        //                   offset: 100,
        //                   minAngleToShowLabel: 10
        //                 }
        //               },
        //             },
        //             legend: {
        //               position: 'bottom'
        //             }
        //           }
        //         }

        //       ]
        //     };
        //     this.chartOptions4s = {
        //       series: this.Total_power_loss_percenntage,
        //       chart: {
        //         type: "donut",
        //         height: 350,
        //       },

        //       colors: ["#339933", "#1be461", "#ef6c00", "#ffd54f", "#ffa64f", "#17a2b8", "#6f42c1", "#a78bda", "#117888", "#17a2b8", "#28a745"],
        //       labels: this.power_loss_keys,
        //       legend: {
        //         show: true,
        //         showForSingleSeries: false,
        //         showForNullSeries: true,
        //         showForZeroSeries: true,
        //         fontFamily: "'Montserrat', Helvetica, sans-serif",
        //         position: 'bottom'
        //       },


        //       dataLabels: {
        //         enabled: true,
        //         enabledOnSeries: undefined,
        //         formatter: function (val:any) {
        //           const newLocal = val * power_loss_merics;
        //           // return val.toFixed(1) + " kW";
        //           return (parseFloat(((newLocal) / 100).toFixed(1))) + " kW";
        //         },
        //         textAnchor: 'end',
        //         distributed: false,
        //         offsetX: 100,
        //         offsetY: 100,
        //         style: {
        //           fontSize: '12px',
        //           fontFamily: "'Montserrat', Helvetica, sans-serif",
        //           fontWeight: 'bold',
        //           colors: undefined
        //         },
        //         background: {
        //           enabled: true,
        //           foreColor: '#000',
        //           padding: 4,
        //           borderRadius: 2,
        //           borderWidth: 1,
        //           borderColor: '#fff',
        //           opacity: 0.9,
        //           dropShadow: {
        //             enabled: false,
        //             top: 1,
        //             left: 1,
        //             blur: 1,
        //             color: '#000',
        //             opacity: 0.45
        //           }
        //         },
        //         dropShadow: {
        //           enabled: false,
        //           top: 1,
        //           left: 1,
        //           blur: 1,
        //           color: '#000',
        //           opacity: 0.45
        //         }
        //         // offset: 0,
        //         // minAngleToShowLabel: 10
        //       },
        //       tooltip: {
        //         enabled: true,
        //         enabledOnSeries: undefined,
        //         shared: true,
        //         followCursor: false,
        //         intersect: false,
        //         inverseOrder: false,
        //         custom: undefined,
        //         fillSeriesColor: false,
        //         style: {
        //           fontSize: '12px',
        //           fontFamily: "'Montserrat', Helvetica, sans-serif",

        //         },

        //         theme: 'dark',
        //         onDatasetHover: {
        //           highlightDataSeries: true,
        //         },
        //         y: {
        //           formatter: function (val) {
        //             return val.toFixed(1) + " kW";
        //           }
        //         },
        //       },
        //       plotOptions: {
        //         pie: {
        //           startAngle: 0,
        //           endAngle: 360,
        //           expandOnClick: false
        //         }
        //       },
        //       responsive: [
        //         {
        //           breakpoint: 700,
        //           options: {
        //             chart: {
        //               width: 250,
        //               height: 330
        //             },
        //             legend: {
        //               position: "bottom",
        //               horizontalAlign: 'left',
        //               itemMargin: {
        //                 horizontal: 1,
        //                 vertical: 3
        //               },

        //             }
        //           }
        //         }
        //       ]
        //     };


        //   })
      })
    })

  }

  tabClick(tab) {
    // alert(this.firstvalue)


    if (this.datevalue && tab == 'Power Loss Metrics') {
      var sel = tab
    } else {
      var sel = tab['tab']['textLabel']
      this.currentopenedtab.push(sel)
      this.currenttabcount = this.currentopenedtab.length
    }
    // alert(sel)
    if (this.currentopenedtab.length == 0) {
      sel = sel
    } else {
      sel = this.currentopenedtab[this.currenttabcount - 1]
    }
    if (sel === 'Power Loss Metrics') {
      this.resourcesLoaded = true;

      this.pow()
    }

    if (sel === 'Anomaly Classification') {
      this.resourcesLoaded = true;
      this.ana_desc = ["Power dissipation occuring in a small area results in cell overheating", "One or more substring Open circuit failure with hotspot. At one or more substrings, easily mistaken for cell breakage or cell defects, Potential induced degradation (PID) or mismatch", "Loss of connection within module junction box or cell connecter", "Frames of the modules are homogeneously heated. The negative grounding to be checked at inverter level. The module frames would have high leakage current", "The full panel surface is homogeneously heated up compared to other panels. It may happen due to PID effects."];
      this.ana(this.project_layer_summary_data, this.project_layer_summary_lable, this.ana_desc)

    }
    if (sel === 'Inverter-Wise Analysis') {
      this.resourcesLoaded = true;
      // // // console.log(this.inver_wise_data, "=========", this.inver_wise_lable)

      this.inver(this.Project_layer_inverter_data_values, this.inver_wise_lable, this.Project_layer_summary)
    }
    if (sel === 'Health History') {
      this.resourcesLoaded = true;

      this.helth()
    }
    if (sel === 'Losses') {
      this.resourcesLoaded = true;

      this.losses()
    }
    if (sel === 'Parts per million') {
      this.resourcesLoaded = true;
      // this.health_history = Object.values(this.main_data[this.project_id_summary][this.datevalue]['health_history'])
      // this.health_history_key_data = Object.keys(this.main_data[this.project_id_summary][this.datevalue]['health_history'])
      // this.total_module_count = (this.main_data[this.project_id_summary][this.datevalue]['total_modules_present'])
      this.partspermil()
    }
  }
  losses() {
    this.power_loss_values_energy = Object.values(this.main_data[this.project_id_summary][this.datevalue]['power_loss'])
    // // console.log(this.power_loss_values_energy)
    this.firstvalue = "n"
    // alert(this.energy_defectwise)
    this.resourcesLoaded = false;
    var style = "";
    var style2 = "";

    if (this.Completed_date_array.length != 0) {

      if (this.power_loss_values_energy.length != 0) {
        // this.firstvalue = "";
        style = "none";
        style2 = "block";

      } else if (this.power_loss_values_energy.length == 0) {
        // this.firstvalue = "n";
        style = "block";
        style2 = "none";

      }
      // alert("length")
      // // // console.log(this.firstvalue + "-----" + this.Project_layer_summary_values.length)
      var formElement = document.getElementById("powerlossNo");
      formElement.style.display = style;
      var formElement2 = document.getElementById("powerlossYes");
      formElement2.style.display = style2;
      this.resourcesLoaded = false;

    }
    // energy_defectwise
    // alert(this.plant_capacity_datewise)

    // alert(this.energy_defectwise)
    this.DC_Capacity_in_KW = this.plant_capacity_datewise * 1000
    this.Total_power_loss_in_ppm = ((this.total_power_loss_datewise / this.DC_Capacity_in_KW) * 1000000).toFixed(2)



    // alert(this.Total_power_loss_in_ppm)
  }
  partspermil() {

    this.power_loss_values_revenue = Object.values(this.main_data[this.project_id_summary][this.datevalue]['power_loss'])
    // // console.log(this.power_loss_values_revenue)

    var health_history_keys = [];
    var health_history_keys2 = [];


    this.module_count_defectwise_value = [];
    for (var v = 0; v < this.health_history_key_data.length; v++) {
      var modulecount_defectwise = ((this.health_history[v] / this.total_module_count) * 1000000).toFixed(2)
      this.module_count_defectwise_value.push(parseInt(modulecount_defectwise))

      // // // console.log(this.module_count_defectwise_value + "--------" + health_history)
    }
    health_history_keys.push({ "name": "label", "data": this.health_history_key_data })
    health_history_keys2.push({ "name": "For Defects", "data": this.module_count_defectwise_value })
    // // console.log("------------------")
    // // console.log(health_history_keys)
    // // console.log(health_history_keys2)

    // this.firstvalue = "n"
    // var style = "";
    // var style2 = "";
    // if (this.Completed_date_array.length != 0) {

    //   if (this.power_loss_values_revenue.length != 0) {
    //     // this.firstvalue = "";
    //     style = "none";
    //     style2 = "block";

    //   } else if (this.power_loss_values_revenue.length == 0) {
    //     // this.firstvalue = "n";
    //     style = "block";
    //     style2 = "none";

    //   }
    //   // alert("length"+this.module_count_defectwise_value)
    //   // // // console.log(this.firstvalue + "-----" + this.Project_layer_summary_values.length)
    //   var formElement = document.getElementById("powerlossNo");
    //   formElement.style.display = style;
    //   var formElement2 = document.getElementById("powerlossYes");
    //   formElement2.style.display = style2;
    //   this.resourcesLoaded = false;
    // }

      this.chartOptions12 = {
        // series: [0.00,2348.01,26.09,234.80,0.00,97.83,19.57,13.04,0.00],
        series: health_history_keys2,

        chart: {
          height: 350,
          type: 'line',
          dropShadow: {
            enabled: true,
            color: '#000',
            top: 18,
            left: 7,
            blur: 10,
            opacity: 0.2
          },
        },
        colors: ['#0a5f0f', '#500f54', '#F44336', '#E91E63', '#9C27B0', '#77B6EA', '#7700EA'],
        stroke: {
          width: 4
        },

        legend: {
          show: true,
          showForSingleSeries: false,
          showForNullSeries: true,
          showForZeroSeries: true,
          fontFamily: "'Montserrat', Helvetica, sans-serif",
          position: 'right'
        },
        tooltip: {
          enabled: true,
          enabledOnSeries: undefined,
          shared: true,
          followCursor: false,
          intersect: false,
          inverseOrder: false,
          custom: undefined,
          fillSeriesColor: false,
          style: {
            fontSize: '12px',
            fontFamily: "'Montserrat', Helvetica, sans-serif",

          },
          theme: 'dark',
          onDatasetHover: {
            highlightDataSeries: true,
          },
        },
        dataLabels: {
          enabled: true,
          offsetX: 0,
          style: {
            fontSize: '14px',
            fontFamily: "'Montserrat', Helvetica, sans-serif",

            fontWeight: 'bold',
            colors: undefined
          },
          background: {
            enabled: true,
            foreColor: '#fff',
            padding: 4,
            borderRadius: 2,
            borderWidth: 1,
            borderColor: '#fff',
            opacity: 0.9,
            dropShadow: {
              enabled: false,
              top: 1,
              left: 1,
              blur: 1,
              color: '#000',
              opacity: 0
            }
          },
        },
        labels: this.health_history_key_data,
        xaxis: {
          tickPlacement: 'between',
          labels: {
            show: true,
            rotate: -45,
            rotateAlways: false,
            hideOverlappingLabels: true,
            showDuplicates: false,
            trim: true,
            minHeight: undefined,
            maxHeight: 120,
            style: {
              colors: [],
              fontSize: '12px',
              fontFamily: "'Montserrat', Helvetica, sans-serif",
              fontWeight: 300,
            },
            offsetX: 10,
            offsetY: 0,

          },
          axisTicks: {
            show: false,
            borderType: 'solid',
            color: '#78909C',
            height: 6,
            offsetX: 0,
            offsetY: 0
          },
        },
        // yaxis: [
        //   {
        //     // title: {
        //     //   text: "Website Blog"
        //     // }
        //   },
        //   {
        //     opposite: false,
        //     // title: {
        //     //   text: "Social Media"
        //     // }
        //   }
        // ]
      };

    // alert(this.Total_power_loss_in_ppm)
  }
  pow() {
    // alert(this.datevalue+"----"+this.ana_def_cou)

    this.firstvalue = "n"

    this.project_layer_summary_data = [];
    this.project_layer_summary_lable = [];
    this.Hotspot_inv_val = [];
    this.ShortCircit_inv_val = [];
    this.Open_Circuit_inv_val = [];
    this.pannel_inv_val = [];
    this.Pid_val = [];
    this.total_count = [];
    if (this.Completed_date_array.length == 0) {
      // alert("empty")
      var style = "";
      var style2 = "";

      // this.firstvalue = "n";
      style2 = "none";
      style = "block";
      this.resourcesLoaded = false;

      this.Project_layer_summary_values = 0

      // // // console.log(this.firstvalue + "-----" + this.Project_layer_summary_values.length)
      var formElement = document.getElementById("powerlossNo");
      formElement.style.display = style;
      var formElement2 = document.getElementById("powerlossYes");
      formElement2.style.display = style2;
      // alert(style)
      return


    }
    // // // console.log(this.main_data)
    // alert()
    this.power_loss_keys = []
    this.Total_power_loss_percenntage = []
    this.Project_layer_summary = Object.keys(this.main_data[this.project_id_summary][this.datevalue]['summary_data'])
    this.Project_layer_summary_values = Object.values(this.main_data[this.project_id_summary][this.datevalue]['summary_data'])
    this.Project_layer_inverter_data = Object.keys(this.main_data[this.project_id_summary][this.datevalue]['inverter_data'])
    this.Project_layer_inverter_data_values = Object.values(this.main_data[this.project_id_summary][this.datevalue]['inverter_data'])
    this.health_history = Object.values(this.main_data[this.project_id_summary][this.datevalue]['health_history'])
    this.health_history_key_data = Object.keys(this.main_data[this.project_id_summary][this.datevalue]['health_history'])
    this.power_loss_keys = Object.keys(this.main_data[this.project_id_summary][this.datevalue]['power_loss'])
    this.power_loss_values = Object.values(this.main_data[this.project_id_summary][this.datevalue]['power_loss'])
    this.power_loss_values_energy = Object.values(this.main_data[this.project_id_summary][this.datevalue]['power_loss'])
    this.power_loss_values_revenue = Object.values(this.main_data[this.project_id_summary][this.datevalue]['power_loss'])
    this.plant_capacity_datewise = (this.main_data[this.project_id_summary]['plant_capacity'])
    this.total_power_loss_datewise = (this.main_data[this.project_id_summary][this.datevalue]['total_power_loss'])
    this.total_no_defects_datewise = (this.main_data[this.project_id_summary][this.datevalue]['total_no_defects'])
    this.total_module_count = (this.main_data[this.project_id_summary][this.datevalue]['total_modules_present'])
    var style = "";
    var style2 = "";
    // alert(this.Project_layer_summary)
    if (this.Completed_date_array.length != 0) {

      if (this.power_loss_values.length != 0) {
        // this.firstvalue = "";
        style = "none";
        style2 = "block";

      } else if (this.power_loss_values.length == 0) {
        // this.firstvalue = "n";
        style = "block";
        style2 = "none";

      }
      // alert("length")
      // // // console.log(this.firstvalue + "-----" + this.Project_layer_summary_values.length)
      var formElement = document.getElementById("powerlossNo");
      formElement.style.display = style;
      var formElement2 = document.getElementById("powerlossYes");
      formElement2.style.display = style2;
    }


    // // // console.log(this.Project_layer_inverter_data)
    this.summary_data_values = []
    for (var i = 0; i < this.Project_layer_summary.length; i++) {

      // // // console.log(this.Project_layer_summary[i])
      // // // console.log(this.Project_layer_summary_values[i])
      // // // console.log(this.Project_layer_summary_values[i]['Count'])
      // alert(this.Project_layer_summary[i])
      this.summary_data_values.push(this.Project_layer_summary_values[i]['Count'])

      this.project_layer_summary_data.push(this.Project_layer_summary_values[i]['Count'])
      this.project_layer_summary_lable.push(this.Project_layer_summary[i])
      //   // // console.log("----data----"+this.Project_layer_summary_values[i]['Count'])
      //   // // console.log("----lable----"+this.Project_layer_summary[i])
    }
    // // // console.log("=====ytehdn======"+this.project_layer_summary_lable)
    this.ana_def_def = this.project_layer_summary_lable[0]
    this.ana_def_cou = this.project_layer_summary_data[0]
    // alert("----thisana_def_def--"+this.ana_def_def)
    // alert("----ana_def_cou--"+this.ana_def_cou)

    for (var i = 0; i < this.Project_layer_inverter_data.length; i++) {
      // alert(this.Project_layer_inverter_data[i]+"-----"+this.Project_layer_inverter_data_values[i]['Hotspot']['count'])



      this.Hotspot_inv_val.push(this.Project_layer_inverter_data_values[i][this.Project_layer_summary[0]]['count'])
      this.ShortCircit_inv_val.push(this.Project_layer_inverter_data_values[i][this.Project_layer_summary[1]]['count'])
      this.Open_Circuit_inv_val.push(this.Project_layer_inverter_data_values[i][this.Project_layer_summary[2]]['count'])
      this.pannel_inv_val.push(this.Project_layer_inverter_data_values[i][this.Project_layer_summary[3]]['count'])
      this.Pid_val.push(this.Project_layer_inverter_data_values[i][this.Project_layer_summary[4]]['count'])
      this.inver_wise_lable.push(this.Project_layer_inverter_data[i])
      // // // console.log(this.datevalue+"====="+[i]+"====="+this.Project_layer_inverter_data_values[i]['Hotspot']['count']+"---"+this.Project_layer_inverter_data_values[0]['Short Circuit']['count']+"===="+this.Project_layer_inverter_data_values[i]['Open Circuit']['count']+"-----"+this.Project_layer_inverter_data_values[i]['Panel Failure']['count']+"====="+this.Project_layer_inverter_data_values[i]['PID']['count'])
      this.inver_wise_def_lable = this.inver_wise_lable[0]
      this.inver_wise_def_hot = this.Project_layer_inverter_data_values[0][this.Project_layer_summary[0]]['count']
      this.inver_wise_def_sc = this.Project_layer_inverter_data_values[0][this.Project_layer_summary[1]]['count']
      this.inver_wise_def_os = this.Project_layer_inverter_data_values[0][this.Project_layer_summary[2]]['count']
      this.inver_wise_def_pf = this.Project_layer_inverter_data_values[0][this.Project_layer_summary[3]]['count']
      this.inver_wise_def_pid = this.Project_layer_inverter_data_values[0][this.Project_layer_summary[4]]['count']


    }
    this.module_count_defectwise_key = [];
    this.module_count_defectwise_value = [];
    for (var v = 0; v < this.health_history_key_data.length; v++) {
      var modulecount_defectwise = ((this.health_history[v] / this.total_module_count) * 1000000).toFixed(2)
      this.module_count_defectwise_value.push(modulecount_defectwise)
      // // console.log(this.module_count_defectwise_value + "--------" + this.health_history[v])
    }
    for (var n = 0; n < this.Project_layer_inverter_data.length; n++) {

      this.total_count.push(+this.Hotspot_inv_val[n] + +this.ShortCircit_inv_val[n] + +this.Open_Circuit_inv_val[n] + +this.pannel_inv_val[n] + +this.Pid_val[n])
    }
    var Total_power_loss = 0
    var power_loss_merics = 0
    power_loss_merics = this.total_power_loss_datewise;

    for (var z = 0; z < this.power_loss_keys.length; z++) {
      // alert(this.power_loss_values[z])
      Total_power_loss = Total_power_loss + this.power_loss_values[z]
    }
    var powerloss_data = [];
    var powerloss_key = [];
    for (var z = 0; z < this.power_loss_keys.length; z++) {
      // alert(this.power_loss_values[z])
      var percentage_calc = (this.power_loss_values[z] / Total_power_loss)
      var n_percentage_calc = parseFloat((Math.round(this.total_power_loss_datewise * percentage_calc * 100) / 100).toFixed(2));

      this.Total_power_loss_percenntage.push(n_percentage_calc)
      // alert(this.power_loss_values[z])
      powerloss_key.push(this.power_loss_keys[z])
      powerloss_data.push(this.power_loss_values[z])
    }
    const graph_data = {
      "summary": [
        { "hotspot": this.summary_data_values[0], "shortcircuit": this.summary_data_values[1], "opencircuit": this.summary_data_values[2], "pannelfaluer": this.summary_data_values[3], "pid": this.summary_data_values[4] }
      ],
      "Inverter": [
        { "INV1": this.total_count[0], "INV2": this.total_count[1], "INV3": this.total_count[2], "INV4": this.total_count[3], "INV5": this.total_count[4], "INV6": this.total_count[5], "INV7": this.total_count[6], "INV8": this.total_count[7], "INV9": this.total_count[8] }
      ],
      "Inverter_label": [
        {
          "label1": this.Project_layer_inverter_data[0], "label2": this.Project_layer_inverter_data[1], "label3": this.Project_layer_inverter_data[2], "label4": this.Project_layer_inverter_data[3], "label5": this.Project_layer_inverter_data[4], "label6": this.Project_layer_inverter_data[5], "label7": this.Project_layer_inverter_data[6], "label8": this.Project_layer_inverter_data[7], "label9": this.Project_layer_inverter_data[8]
        }
      ],
      "power_loss_keys": [{ "keys0": this.power_loss_keys[0], "keys1": this.power_loss_keys[1], "keys2": this.power_loss_keys[2], "keys3": this.power_loss_keys[3], "keys4": this.power_loss_keys[4], "keys5": this.power_loss_keys[5], "keys6": this.power_loss_keys[6], "keys7": this.power_loss_keys[7] }],
      "power_loss_values": [{ "values0": this.power_loss_values[0], "values1": this.power_loss_values[1], "values2": this.power_loss_values[2], "values3": this.power_loss_values[3], "values4": this.power_loss_values[4], "values5": this.power_loss_values[5], "values6": this.power_loss_values[6], "values7": this.power_loss_values[7] }]
    }


    this.summary_def_def = this.power_loss_keys[0]
    this.summary_def_cou = (this.power_loss_values[0] / 1000).toFixed(1)
    this.inverter_def_def = Object.values(graph_data['Inverter_label'][0])[0]
    this.inverter_def_cou = Object.values(graph_data['Inverter'][0])[0]



    this.resourcesLoaded = false;


    this.chartOptions = {
      series: this.total_count,
      chart: {
        height: 250,
        type: "radialBar",
        events: {
          dataPointSelection: function (event, chartContext, config) {
            const inver_lin = '../../../../assets/images/defects/itc_1.JPG'
            this.selector = config['dataPointIndex'];
            document.getElementById('inverter_def').innerHTML = `<p>` + Object.values(graph_data['Inverter_label'][0])[this.selector] + `<p>`
            document.getElementById('inverter_cou').innerHTML = `<p>` + Object.values(graph_data['Inverter'][0])[this.selector] + `<p>`
            document.getElementById('inverter_im').innerHTML = ` <img src='` + inver_lin + `' width="100%">`

          }
        }
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
      labels: this.Project_layer_inverter_data,
      legend: {
        show: true,
        floating: true,
        fontSize: "16px",
        position: "left",
        offsetX: 50,
        fontFamily: "'Montserrat', Helvetica, sans-serif",
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

    // // console.log(this.power_loss_values)
    this.chartOptions1 = {
      series: this.power_loss_values,
      chart: {
        width: "100%",
        height: 330,
        type: "pie",
        events: {
          dataPointSelection: function (event, chartContext, config) {
            const lin = ['../../../../assets/images/defects/Hotspot.png', '../../../../assets/images/defects/Short_Circuit.png', '../../../../assets/images/defects/Open_circuit.png', '../../../../assets/images/defects/Panel_Failure.png', '../../../../assets/images/defects/Bypass_Diode_Failure.png', '../../../../assets/images/defects/Dirt_Vegetation.png', '../../../../assets/images/defects/Open_String_Table.png', '../../../../assets/images/defects/Multicell_Hotspot.png', '../../../../assets/images/defects/PID.png']

            this.selector = config['dataPointIndex'];
            document.getElementById('summary_def').innerHTML = `<p>` + powerloss_key[this.selector] + `<p>`
            document.getElementById('summary_cou').innerHTML = `<p>` + (powerloss_data[this.selector] / 1000).toFixed(1) + `<p>`
            // // // console.log(lin[0])
            document.getElementById('summary_im').innerHTML = ` <img src='` + lin[this.selector] + `' width="100%">`
          }
        },




      },


      colors: ["#339933", "#1be461", "#ef6c00", "#ffd54f", "#ffa64f", "#17a2b8", "#6f42c1", "#a78bda", "#117888", "#17a2b8", "#28a745"],
      labels: this.power_loss_keys,
      theme: {
        monochrome: {
          enabled: false
        }
      },
      tooltip: {
        enabled: true,
        enabledOnSeries: undefined,
        shared: true,
        followCursor: false,
        intersect: false,
        inverseOrder: false,
        custom: undefined,
        fillSeriesColor: false,

        style: {
          fontSize: '12px',
          fontFamily: "'Montserrat', Helvetica, sans-serif",

        },
        onDatasetHover: {
          highlightDataSeries: false,
        },
        y: {
          formatter: function (val) {
            return (val / 1000).toFixed(1) + " kW";
          }
        },
      },
      title: {
        text: ""
      },
      dataLabels: {
        enabled: true,
        enabledOnSeries: undefined,

        textAnchor: 'middle',
        distributed: false,
        offsetX: 0,
        offsetY: 0,
        style: {
          fontSize: '14px',
          fontFamily: "'Montserrat', Helvetica, sans-serif",

          fontWeight: 'bold',
          colors: undefined
        },
        background: {
          enabled: true,
          foreColor: '#000',
          padding: 4,
          borderRadius: 2,
          borderWidth: 1,
          borderColor: '#fff',
          opacity: 0.9,
          dropShadow: {
            enabled: false,
            top: 1,
            left: 1,
            blur: 1,
            color: '#000',
            opacity: 0.45
          }
        },
        dropShadow: {
          enabled: false,
          top: 1,
          left: 1,
          blur: 1,
          color: '#000',
          opacity: 0.45
        }
        // offset: 0,
        // minAngleToShowLabel: 10
      },
      legend: {
        show: true,
        showForSingleSeries: false,
        showForNullSeries: true,
        showForZeroSeries: true,
        fontFamily: "'Montserrat', Helvetica, sans-serif",
        position: 'bottom'
      },
      responsive: [
        {
          breakpoint: 480,
          options: {
            chart: {
              width: 250,
              height: 200
            },
            plotOptions: {
              pie: {
                startAngle: 0,
                endAngle: 360,
                expandOnClick: true,
                offsetX: 50,
                offsetY: 50,
                customScale: 1,
                dataLabels: {
                  offset: 100,
                  minAngleToShowLabel: 10
                }
              },
            },
            legend: {
              position: 'bottom'
            }
          }
        }

      ]
    };

    this.chartOptions4s = {
      series: this.Total_power_loss_percenntage,
      chart: {
        type: "donut",
        height: 350,
      },

      colors: ["#339933", "#1be461", "#ef6c00", "#ffd54f", "#ffa64f", "#17a2b8", "#6f42c1", "#a78bda", "#117888", "#17a2b8", "#28a745"],
      labels: this.power_loss_keys,
      legend: {
        show: true,
        showForSingleSeries: false,
        showForNullSeries: true,
        showForZeroSeries: true,
        fontFamily: "'Montserrat', Helvetica, sans-serif",
        position: 'bottom'
      },
      tooltip: {
        enabled: true,
        enabledOnSeries: undefined,
        shared: true,
        followCursor: false,
        intersect: false,
        inverseOrder: false,
        custom: undefined,
        fillSeriesColor: false,
        style: {
          fontSize: '12px',
          fontFamily: "'Montserrat', Helvetica, sans-serif",

        },

        theme: 'dark',
        onDatasetHover: {
          highlightDataSeries: true,
        },
        y: {
          formatter: function (val) {
            return val.toFixed(1) + " kW";
          }
        },
      },

      dataLabels: {
        enabled: true,
        enabledOnSeries: undefined,
        formatter: function (val:any) {
          return (parseFloat(((val * power_loss_merics) / 100).toFixed(1))) + " kW";
        },
        textAnchor: 'end',
        distributed: false,
        offsetX: 100,
        offsetY: 100,
        style: {
          fontSize: '12px',
          fontFamily: "'Montserrat', Helvetica, sans-serif",

          fontWeight: 'bold',
          colors: undefined
        },
        background: {
          enabled: true,
          foreColor: '#000',
          padding: 4,
          borderRadius: 2,
          borderWidth: 1,
          borderColor: '#fff',
          opacity: 0.9,
          dropShadow: {
            enabled: false,
            top: 1,
            left: 1,
            blur: 1,
            color: '#000',
            opacity: 0.45
          }
        },
        dropShadow: {
          enabled: false,
          top: 1,
          left: 1,
          blur: 1,
          color: '#000',
          opacity: 0.45
        }
        // offset: 0,
        // minAngleToShowLabel: 10
      },
      plotOptions: {
        pie: {
          startAngle: 0,
          endAngle: 360,
          expandOnClick: false
        }
      },
      responsive: [
        {
          breakpoint: 700,
          options: {
            chart: {
              width: 250,
              height: 330
            },

            legend: {
              position: "bottom",
              horizontalAlign: 'left',
              itemMargin: {
                horizontal: 1,
                vertical: 3
              },

            }
          }
        }
      ]
    };

  }

  helth() {
    var style = "";
    var style2 = "";
    this.firstvalue = "n"
    if (this.Completed_date_array.length != 0) {

      if (this.health_history.length != 0) {
        // this.firstvalue = "";
        style = "none";
        style2 = "block";

      } else if (this.health_history.length == 0) {
        // this.firstvalue = "n";
        style = "block";
        style2 = "none";

      }
      // alert("length")
      // // // console.log(this.firstvalue + "-----" + this.Project_layer_summary_values.length)
      var formElement = document.getElementById("powerlossNo");
      formElement.style.display = style;
      var formElement2 = document.getElementById("powerlossYes");
      formElement2.style.display = style2;
    }
    this.resourcesLoaded = false;
    var health_history_keys = [];
    var health_history_keys2 = [];
    var type = "";
    for (var z = 0; z < this.health_history_data.length; z++) {
      if (z == 0) {
        type = "line"
      } else {
        type = "line"
      }
      if (this.health_history_data[z]["data"].length != 0) {
        health_history_keys.push({ "name": this.health_history_data[z]["name"][z], "data": this.health_history_data[z]["data"] })
        health_history_keys2.push({ "name": this.health_history_data[z]["name"][z], "data": this.health_history_data[z]["data"], "type": type })
      }
    }
    // // console.log(health_history_keys2)
    // var data_charts = [this.health_history_data]
    // // console.log(health_history_keys)
    // alert(this.total_no_defects_dates)
    this.chartOptions7 = {
      series: this.total_no_defects_dates,
      chart: {
        width: "100%",
        height: 250,
        type: "pie"

      },
      colors: ['#0a5f0f', '#500f54', '#F44336', '#E91E63', '#9C27B0', '#77B6EA', '#7700EA'],
      labels: this.defects_dates,
      theme: {
        monochrome: {
          enabled: true
        }
      },
      legend: {
        show: true,
        showForSingleSeries: false,
        showForNullSeries: true,
        showForZeroSeries: true,
        fontFamily: "'Montserrat', Helvetica, sans-serif",
        position: 'right'
      },
      tooltip: {
        enabled: true,
        enabledOnSeries: undefined,
        shared: true,
        followCursor: false,
        intersect: false,
        inverseOrder: false,
        custom: undefined,
        fillSeriesColor: false,
        style: {
          fontSize: '12px',
          fontFamily: "'Montserrat', Helvetica, sans-serif",

        },
        theme: 'dark',
        onDatasetHover: {
          highlightDataSeries: true,
        },
      },
      dataLabels: {
        enabled: true,
        offsetX: 100,
        style: {
          fontSize: '14px',
          fontFamily: "'Montserrat', Helvetica, sans-serif",

          fontWeight: 'bold',
          colors: undefined
        },
        background: {
          enabled: true,
          foreColor: '#fff',
          padding: 4,
          borderRadius: 2,
          borderWidth: 1,
          borderColor: '#fff',
          opacity: 0.9,
          dropShadow: {
            enabled: false,
            top: 1,
            left: 1,
            blur: 1,
            color: '#000',
            opacity: 0
          }
        },
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
    this.chartOptions8 = {
      series: health_history_keys2,
      chart: {
        height: 350,
        type: 'line',
        dropShadow: {
          enabled: true,
          color: '#000',
          top: 18,
          left: 7,
          blur: 10,
          opacity: 0.2
        },
      },
      colors: ['#0a5f0f', '#500f54', '#F44336', '#E91E63', '#9C27B0', '#77B6EA', '#7700EA'],
      stroke: {
        width: 4
      },
      // title: {
      //   text: "Traffic Sources"
      // },
      legend: {
        show: true,
        showForSingleSeries: false,
        showForNullSeries: true,
        showForZeroSeries: true,
        fontFamily: "'Montserrat', Helvetica, sans-serif",
        position: 'right'
      },
      tooltip: {
        enabled: true,
        enabledOnSeries: undefined,
        shared: true,
        followCursor: false,
        intersect: false,
        inverseOrder: false,
        custom: undefined,
        fillSeriesColor: false,
        style: {
          fontSize: '12px',
          fontFamily: "'Montserrat', Helvetica, sans-serif",

        },
        theme: 'dark',
        onDatasetHover: {
          highlightDataSeries: true,
        },
      },
      dataLabels: {
        enabled: true,
        offsetX: 0,
        style: {
          fontSize: '14px',
          fontFamily: "'Montserrat', Helvetica, sans-serif",

          fontWeight: 'bold',
          colors: undefined
        },
        background: {
          enabled: true,
          foreColor: '#fff',
          padding: 4,
          borderRadius: 2,
          borderWidth: 1,
          borderColor: '#fff',
          opacity: 0.9,
          dropShadow: {
            enabled: false,
            top: 1,
            left: 1,
            blur: 1,
            color: '#000',
            opacity: 0
          }
        },
      },
      labels: this.health_history_keys,
      xaxis: {
        tickPlacement: 'between',
        labels: {
          show: true,
          rotate: -45,
          rotateAlways: false,
          hideOverlappingLabels: true,
          showDuplicates: false,
          trim: true,
          minHeight: undefined,
          maxHeight: 120,
          style: {
            colors: [],
            fontSize: '12px',
            fontFamily: "'Montserrat', Helvetica, sans-serif",
            fontWeight: 300,
          },
          offsetX: 10,
          offsetY: 0,

        },
        axisTicks: {
          show: false,
          borderType: 'solid',
          color: '#78909C',
          height: 6,
          offsetX: 0,
          offsetY: 0
        },
      },
      // yaxis: [
      //   {
      //     // title: {
      //     //   text: "Website Blog"
      //     // }
      //   },
      //   {
      //     opposite: false,
      //     // title: {
      //     //   text: "Social Media"
      //     // }
      //   }
      // ]
    };
  }
  inver(da, lable, Project_layer_summary) {
    // alert(da+"--label=="+lable)
    // // this.firstvalue = "n"
    // // // console.log(da,"-----"+lable)
    this.firstvalue = "n"
    var style = "";
    var style2 = "";
    if (this.Project_layer_inverter_data_values.length != 0) {
      // this.firstvalue = "";
      style = "none";
      style2 = "block";

    } else if (this.Project_layer_inverter_data_values.length == 0) {
      // this.firstvalue = "n";
      style = "block";
      style2 = "none";

    }
    // // // console.log(this.firstvalue + "-----" + this.Project_layer_summary_values.length)
    var formElement = document.getElementById("powerlossNo");
    formElement.style.display = style;
    var formElement2 = document.getElementById("powerlossYes");
    formElement2.style.display = style2;

    this.chartOptions6 = {
      series: [
        {
          name: this.Project_layer_summary[0],
          data: this.Hotspot_inv_val
        },
        {
          name: this.Project_layer_summary[1],
          data: this.ShortCircit_inv_val
        },
        {
          name: this.Project_layer_summary[2],
          data: this.Open_Circuit_inv_val
        },
        {
          name: this.Project_layer_summary[3],
          data: this.pannel_inv_val
        },
        {
          name: this.Project_layer_summary[4],
          data: this.Pid_val
        }
      ],
      chart: {
        type: "bar",
        height: 450,
        stacked: true,
        events: {
          dataPointSelection: function (event, chartContext, config) {
            this.selector = config['dataPointIndex'];
            document.getElementById('inver_wise_itc_1').innerHTML = `<P><b>` + lable[this.selector] + `</b></p>`
            document.getElementById('inver_wise_hotspot_1').innerHTML = `<P>` + da[this.selector][Project_layer_summary[0]]['count'] + `</p>`
            document.getElementById('inver_wise_sc_1').innerHTML = `<P>` + da[this.selector][Project_layer_summary[1]]['count'] + `</p>`
            document.getElementById('inver_wise_op_1').innerHTML = `<P>` + da[this.selector][Project_layer_summary[2]]['count'] + `</p>`
            document.getElementById('inver_wise_pf_1').innerHTML = `<P>` + da[this.selector][Project_layer_summary[3]]['count'] + `</p>`
            document.getElementById('inver_wise_pid_1').innerHTML = `<P>` + da[this.selector][Project_layer_summary[4]]['count'] + `</p>`
          }
        }
      },
      tooltip: {
        enabled: true,
        enabledOnSeries: undefined,
        shared: true,
        followCursor: false,
        intersect: false,
        inverseOrder: false,
        custom: undefined,
        fillSeriesColor: false,
        style: {
          fontSize: '12px',
          fontFamily: "'Montserrat', Helvetica, sans-serif",

        },
        theme: 'dark',
        onDatasetHover: {
          highlightDataSeries: true,
        },
        y: {
          formatter: function (val) {
            return val + "";
          }
        }
      },
      dataLabels: {
        enabled: true,
        offsetX: 0,
        style: {
          fontSize: '14px',
          fontFamily: "'Montserrat', Helvetica, sans-serif",

          fontWeight: 'bold',
          colors: undefined
        },
        background: {
          enabled: true,
          foreColor: '#000',
          padding: 4,
          borderRadius: 2,
          borderWidth: 1,
          borderColor: '#fff',
          opacity: 0.9,
          dropShadow: {
            enabled: false,
            top: 1,
            left: 1,
            blur: 1,
            color: '#000',
            opacity: 0
          }
        },
      },
      plotOptions: {
        bar: {
          horizontal: true
        }
      },
      stroke: {
        width: 1,
        colors: ["#fff"]
      },
      title: {
        text: ""
      },
      xaxis: {
        categories: this.Project_layer_inverter_data,
        labels: {
          formatter: function (val) {
            return val + "";
          }
        }
      },
      yaxis: {
        title: {
          text: undefined
        }
      },

      fill: {
        opacity: 1
      },
      legend: {
        position: "top",
        horizontalAlign: "left",
        fontFamily: "'Montserrat', Helvetica, sans-serif",
        offsetX: 40
      },
      grid: {
        show: true,

        xaxis: {
          lines: {
            show: false
          }
        },
        yaxis: {
          lines: {
            show: false
          }
        },
        row: {
          colors: undefined,
          opacity: 0.0
        },
        column: {
          colors: undefined,
          opacity: 0.0
        },

      },
    };

    // // // console.log("=====total_count====" + this.total_count)


    this.chartOptions5 = {
      series: [
        {
          name: "Defect count",
          data: this.total_count
        },


      ],
      chart: {
        type: "bar",
        height: 450,
        stacked: false,
        stackType: "100%",
        events: {
          dataPointSelection: function (event, chartContext, config) {

            this.selector = config['dataPointIndex'];

            document.getElementById('inver_wise_itc').innerHTML = `<P><b>` + lable[this.selector] + `</b></p>`
            document.getElementById('inver_wise_hotspot').innerHTML = `<P>` + da[this.selector][Project_layer_summary[0]]['count'] + `</p>`
            document.getElementById('inver_wise_sc').innerHTML = `<P>` + da[this.selector][Project_layer_summary[1]]['count'] + `</p>`
            document.getElementById('inver_wise_op').innerHTML = `<P>` + da[this.selector][Project_layer_summary[2]]['count'] + `</p>`
            document.getElementById('inver_wise_pf').innerHTML = `<P>` + da[this.selector][Project_layer_summary[3]]['count'] + `</p>`
            document.getElementById('inver_wise_pid').innerHTML = `<P>` + da[this.selector][Project_layer_summary[4]]['count'] + `</p>`

          }
        }
      },
      responsive: [
        {
          breakpoint: 480,
          options: {
            legend: {
              position: "bottom",
              offsetX: -10,
              offsetY: 0
            }
          }
        }
      ],
      tooltip: {
        enabled: true,
        enabledOnSeries: undefined,
        shared: true,
        followCursor: false,
        intersect: false,
        inverseOrder: false,
        custom: undefined,
        fillSeriesColor: false,
        style: {
          fontSize: '12px',
          fontFamily: "'Montserrat', Helvetica, sans-serif",

        },
        theme: 'dark',
        onDatasetHover: {
          highlightDataSeries: true,
        },
      },
      dataLabels: {
        enabled: true,
        offsetX: 0,
        style: {
          fontSize: '14px',
          fontFamily: "'Montserrat', Helvetica, sans-serif",

          fontWeight: 'bold',
          colors: undefined
        },
        background: {
          enabled: true,
          foreColor: '#000',
          padding: 4,
          borderRadius: 2,
          borderWidth: 1,
          borderColor: '#fff',
          opacity: 0.9,
          dropShadow: {
            enabled: false,
            top: 1,
            left: 1,
            blur: 1,
            color: '#000',
            opacity: 0
          }
        },
      },
      xaxis: {
        categories: this.Project_layer_inverter_data
      },
      fill: {
        opacity: 1
      },
      legend: {
        position: "right",
        offsetX: 0,
        fontFamily: "'Montserrat', Helvetica, sans-serif",
        offsetY: 50
      },
      grid: {
        show: true,

        xaxis: {
          lines: {
            show: false
          }
        },
        yaxis: {
          lines: {
            show: false
          }
        },
        row: {
          colors: undefined,
          opacity: 0.0
        },
        column: {
          colors: undefined,
          opacity: 0.0
        },

      },
    };
    this.resourcesLoaded = false;

  }
  ana(dat, lab, desc) {
    //  alert(dat)
    //  alert(lab)
    // alert(this.firstvalue)
    this.firstvalue = "n"
    var style = "";
    var style2 = "";
    if (this.project_layer_summary_data.length != 0) {
      // this.firstvalue = "";
      style = "none";
      style2 = "block";

    } else if (this.project_layer_summary_data.length == 0) {
      // this.firstvalue = "n";
      style = "block";
      style2 = "none";

    }
    // // console.log(this.firstvalue + "-----" + this.Project_layer_summary_values.length)
    var formElement = document.getElementById("powerlossNo");
    formElement.style.display = style;
    var formElement2 = document.getElementById("powerlossYes");
    formElement2.style.display = style2;

    var perc_for_anam = 0;
    this.ana_def_cou_desc = []


    for (var z = 0; z < this.project_layer_summary_lable.length; z++) {
      // alert(desc[z])
      perc_for_anam = dat[z] + perc_for_anam
      this.ana_def_cou_desc.push([desc[z]])
    }
    // alert(this.ana_def_cou_desc)
    this.ana_def_cou_perc_1 = ((dat[0] / perc_for_anam) * 100).toFixed(1)
    this.ana_def_cou_desc_1 = this.ana_def_cou_desc[0]
    if (this.project_layer_summary_data.length > 0) {
      //  alert("inside ana with value")
      this.resourcesLoaded = false;

      this.chartOptions3 = {
        series: [
          {
            name: "Defect count",
            data: dat
          }
        ],
        chart: {
          type: "bar",
          height: 250,
          events: {
            dataPointSelection: function (event, chartContext, config) {
              const lin = ['../../../../assets/images/defects/Hotspot.png', '../../../../assets/images/defects/Short_Circuit.png', '../../../../assets/images/defects/Open_circuit.png', '../../../../assets/images/defects/Panel_Failure.png', '../../../../assets/images/defects/PID.png']
              this.selector = config['dataPointIndex'];
              document.getElementById('ana_summary_def').innerHTML = `<P>` + lab[this.selector] + `</p>`;
              document.getElementById('ana_summary_cou').innerHTML = `<P>` + dat[this.selector] + `</p>`;
              document.getElementById('ana_summary_im').innerHTML = ` <img src='` + lin[this.selector] + `' width="100%" style="border-top-left-radius: 10px; border-top-right-radius: 10px;">`

            }
          }

        },
        plotOptions: {
          bar: {
            horizontal: true
          }
        },
        legend: {
          show: true,
          showForSingleSeries: false,
          showForNullSeries: true,
          showForZeroSeries: true,
          fontFamily: "'Montserrat', Helvetica, sans-serif",
          position: 'right'
        },
        tooltip: {
          enabled: true,
          enabledOnSeries: undefined,
          shared: true,
          followCursor: false,
          intersect: false,
          inverseOrder: false,
          custom: undefined,
          fillSeriesColor: false,
          style: {
            fontSize: '12px',
            fontFamily: "'Montserrat', Helvetica, sans-serif",

          },
          theme: 'dark',
          onDatasetHover: {
            highlightDataSeries: true,
          },
        },
        dataLabels: {
          enabled: true,
          offsetX: 100,
          style: {
            fontSize: '14px',
            fontFamily: "'Montserrat', Helvetica, sans-serif",

            fontWeight: 'bold',
            colors: undefined
          },
          background: {
            enabled: true,
            foreColor: '#000',
            padding: 4,
            borderRadius: 2,
            borderWidth: 1,
            borderColor: '#fff',
            opacity: 0.9,
            dropShadow: {
              enabled: false,
              top: 1,
              left: 1,
              blur: 1,
              color: '#000',
              opacity: 0
            }
          },
        },
        xaxis: {
          categories: lab
        },

        grid: {
          show: true,

          xaxis: {
            lines: {
              show: false
            }
          },
          yaxis: {
            lines: {
              show: false
            }
          },
          row: {
            colors: undefined,
            opacity: 0.0
          },
          column: {
            colors: undefined,
            opacity: 0.0
          },

        },

      };


      this.chartOptions4 = {
        series: dat,
        chart: {
          type: "donut",
          events: {
            dataPointSelection: function (event, chartContext, config) {
              const lin = ['../../../../assets/images/defects/Hotspot.png', '../../../../assets/images/defects/Short_Circuit.png', '../../../../assets/images/defects/Open_circuit.png', '../../../../assets/images/defects/Panel_Failure.png', '../../../../assets/images/defects/PID.png']
              this.selector = config['dataPointIndex'];
              document.getElementById('ana_summary_def_1').innerHTML = `<P>` + lab[this.selector] + `</p>`;
              document.getElementById('ana_summary_cou_1').innerHTML = `<P>` + dat[this.selector] + `</p>`;
              document.getElementById('ana_summary_cou_perc_1').innerHTML = `<P>` + ((dat[this.selector] / perc_for_anam) * 100).toFixed(1) + ` %</p>`;
              document.getElementById('ana_summary_cou_desc_1').innerHTML = `<P>` + desc[this.selector] + `</p>`;
              document.getElementById('ana_summary_im_1').innerHTML = ` <img src='` + lin[this.selector] + `' width="100%" style="border-top-left-radius: 10px; border-top-right-radius: 10px;">`

            }

          }
        },

        labels: lab,
        fill: {
          type: "gradient"
        },
        legend: {
          show: true,
          showForSingleSeries: false,
          showForNullSeries: true,
          showForZeroSeries: true,
          fontFamily: "'Montserrat', Helvetica, sans-serif",
          position: 'right'
        },
        dataLabels: {
          enabled: true,
          enabledOnSeries: undefined,

          textAnchor: 'middle',
          distributed: false,
          offsetX: 0,
          offsetY: 0,
          style: {
            fontSize: '14px',
            fontFamily: "'Montserrat', Helvetica, sans-serif",

            fontWeight: 'bold',
            colors: undefined
          },
          background: {
            enabled: true,
            foreColor: '#000',
            padding: 4,
            borderRadius: 2,
            borderWidth: 1,
            borderColor: '#fff',
            opacity: 0.9,
            dropShadow: {
              enabled: false,
              top: 1,
              left: 1,
              blur: 1,
              color: '#000',
              opacity: 0.45
            }
          },
          dropShadow: {
            enabled: false,
            top: 1,
            left: 1,
            blur: 1,
            color: '#000',
            opacity: 0.45
          }
          // offset: 0,
          // minAngleToShowLabel: 10
        },
        tooltip: {
          enabled: true,
          enabledOnSeries: undefined,
          shared: true,
          followCursor: false,
          intersect: false,
          inverseOrder: false,
          custom: undefined,
          fillSeriesColor: false,

          style: {
            fontSize: '12px',
            fontFamily: "'Montserrat', Helvetica, sans-serif",

          },
          onDatasetHover: {
            highlightDataSeries: false,
          },
        },
        responsive: [
          {
            breakpoint: 700,
            options: {
              chart: {
                width: 125,
                height: 75
              },
              plotOptions: {
                donut: {
                  size: '65%',
                  background: 'transparent',
                  labels: {
                    show: true,
                    name: {
                      show: true,
                      fontSize: '22px',
                      fontFamily: 'Helvetica, Arial, sans-serif',
                      fontWeight: 600,
                      color: undefined,
                      offsetY: -10,
                      formatter: function (val) {
                        return val
                      }
                    },
                    value: {
                      show: true,
                      fontSize: '16px',
                      fontFamily: 'Helvetica, Arial, sans-serif',
                      fontWeight: 400,
                      color: undefined,
                      offsetY: 16,
                      formatter: function (val) {
                        return val
                      }
                    },
                    total: {
                      show: true,
                      showAlways: true,
                      label: 'Total',
                      fontSize: '22px',
                      fontFamily: 'Helvetica, Arial, sans-serif',
                      fontWeight: 600,
                      color: '#373d3f',
                      formatter: function (w) {
                        return w.globals.seriesTotals.reduce((a, b) => {
                          return a + b
                        }, 0)
                      }
                    }
                  }
                },
              },

              legend: {
                // formatter: function (val, opts) {
                //   return val + " - " + opts.w.globals.series[opts.seriesIndex];
                // },
                show: true,
                showForSingleSeries: false,
                showForNullSeries: true,
                showForZeroSeries: true,
                position: "right",
                horizontalAlign: 'center',
                floating: false,
                fontSize: '20px',
                fontFamily: "'Montserrat', Helvetica, sans-serif",

                fontWeight: 400,
                formatter: function (val, opts) {
                  return val + " - " + opts.w.globals.series[opts.seriesIndex];
                },
                inverseOrder: false,
                width: undefined,
                height: undefined,
                tooltipHoverFormatter: undefined,
                customLegendItems: [],
                offsetX: 15,
                offsetY: 15,
                labels: {
                  colors: '#ffffff',
                  useSeriesColors: false
                },
                markers: {
                  width: 12,
                  height: 12,
                  strokeWidth: 0,
                  strokeColor: '#fff',
                  fillColors: undefined,
                  radius: 12,
                  customHTML: undefined,
                  onClick: undefined,
                  offsetX: 20,
                  offsetY: 20
                },
                itemMargin: {
                  horizontal: 25,
                  vertical: 100
                },
                onItemClick: {
                  toggleDataSeries: true
                },
                onItemHover: {
                  highlightDataSeries: true
                },
              },
            }
          }
        ]
      };

    } else if (this.project_layer_summary_data.length == 0) {
      this.resourcesLoaded = false;

    }



  }
  energyloss_calc(energy) { // appending the updated value to the variable
// alert("-"+energy+"-")

    this.energy_defectwise = []
    this.energy_defectwise_chart = []
    var energy_calc = null
    // alert(energy)
    // if (energy != "") {
    //   var formElement = document.getElementById("Energy");
    //   formElement.style.display = "block";
    // } else {
    //   var formElement = document.getElementById("Energy");
    //   formElement.style.display = "none";
    // }
    this.energy = energy
    // alert(this.plant_capacity_datewise)
    this.DC_Capacity_in_KW = this.plant_capacity_datewise * 1000
    this.Total_power_loss_in_ppm = ((this.total_power_loss_datewise / this.DC_Capacity_in_KW) * 1000000).toFixed(2)
    this.total_energy_loss = (this.energy * this.total_power_loss_datewise).toFixed(2)
    this.total_energy_loss_in_ppm = this.energy * this.DC_Capacity_in_KW
    this.total_energy_loss_in_KW_ppm = this.energy * this.total_power_loss_datewise
    this.total_energy_loss_calc_in_ppm = ((this.total_energy_loss_in_KW_ppm / this.total_energy_loss_in_ppm) * 1000000).toFixed(2)
    // // // console.log("-------------"+this.total_power_loss_datewise)
    for (var k = 0; k < this.power_loss_keys.length; k++) {
      energy_calc = (this.power_loss_values[k] / 1000).toFixed(1)
      var power = (this.energy * energy_calc).toFixed(0)
      this.energy_defectwise.push(parseInt(power))
    }



    // alert(this.DC_Capacity_in_KW)

    this.chartOptions10 = {
      series: this.energy_defectwise,
      chart: {
        width: "100%",
        height: 330,
        type: "pie",
      },


      colors: ["#339933", "#1be461", "#ef6c00", "#ffd54f", "#ffa64f", "#17a2b8", "#6f42c1", "#a78bda", "#117888", "#17a2b8", "#28a745"],
      labels: this.power_loss_keys,
      theme: {
        monochrome: {
          enabled: false
        }
      },
      tooltip: {
        enabled: true,
        enabledOnSeries: undefined,
        shared: true,
        followCursor: false,
        intersect: false,
        inverseOrder: false,
        custom: undefined,
        fillSeriesColor: false,

        style: {
          fontSize: '12px',
          fontFamily: "'Montserrat', Helvetica, sans-serif",

        },
        onDatasetHover: {
          highlightDataSeries: false,
        },
        y: {
          formatter: function (val) {
            return (val) + " kWh/kWp/year";
          }
        },
      },
      title: {
        text: ""
      },
      dataLabels: {
        enabled: true,
        enabledOnSeries: undefined,

        textAnchor: 'middle',
        distributed: false,
        offsetX: 0,
        offsetY: 0,
        style: {
          fontSize: '14px',
          fontFamily: "'Montserrat', Helvetica, sans-serif",

          fontWeight: 'bold',
          colors: undefined
        },
        background: {
          enabled: true,
          foreColor: '#000',
          padding: 4,
          borderRadius: 2,
          borderWidth: 1,
          borderColor: '#fff',
          opacity: 0.9,
          dropShadow: {
            enabled: false,
            top: 1,
            left: 1,
            blur: 1,
            color: '#000',
            opacity: 0.45
          }
        },
        dropShadow: {
          enabled: false,
          top: 1,
          left: 1,
          blur: 1,
          color: '#000',
          opacity: 0.45
        }
        // offset: 0,
        // minAngleToShowLabel: 10
      },
      legend: {
        show: true,
        showForSingleSeries: false,
        showForNullSeries: true,
        showForZeroSeries: true,
        fontFamily: "'Montserrat', Helvetica, sans-serif",
        position: 'right'
      },
      responsive: [
        {
          breakpoint: 480,
          options: {
            chart: {
              width: 250,
              height: 200
            },
            plotOptions: {
              pie: {
                startAngle: 0,
                endAngle: 360,
                expandOnClick: true,
                offsetX: 50,
                offsetY: 50,
                customScale: 1,
                dataLabels: {
                  offset: 100,
                  minAngleToShowLabel: 10
                }
              },
            },
            legend: {
              position: 'bottom'
            }
          }
        }

      ]
    };

    if(energy == null || energy == ""){
      this.Chart_hide_show = "hide"
    }else{
      this.Chart_hide_show = "show"
    }

  }
  tariff_cal(revenue) { // appending the updated value to the variable
    // alert(revenue)

    var ppm_inr = null
    this.revenue_defectwise = []
    // if (revenue != "") {
    //   var formElement = document.getElementById("Revenue");
    //   formElement.style.display = "block";
    // } else {
    //   var formElement = document.getElementById("Revenue");
    //   formElement.style.display = "none";
    // }
    this.tariff = revenue;
    this.total_tariff = (this.total_energy_loss * this.tariff).toFixed(2)
    for (var y = 0; y < this.power_loss_keys.length; y++) {
      // // // console.log(this.tariff+"-------------" + this.energy_defectwise[y])
      var rev = (this.energy_defectwise[y] * this.tariff).toFixed(2)
      this.revenue_defectwise.push(parseInt(rev))
    }
      this.chartOptions11 = {
        series: this.revenue_defectwise,
        chart: {
          width: "100%",
          height: 330,
          type: "pie",

        },


        colors: ["#339933", "#1be461", "#ef6c00", "#ffd54f", "#ffa64f", "#17a2b8", "#6f42c1", "#a78bda", "#117888", "#17a2b8", "#28a745"],
        labels: this.power_loss_keys,
        theme: {
          monochrome: {
            enabled: false
          }
        },
        tooltip: {
          enabled: true,
          enabledOnSeries: undefined,
          shared: true,
          followCursor: false,
          intersect: false,
          inverseOrder: false,
          custom: undefined,
          fillSeriesColor: false,

          style: {
            fontSize: '12px',
            fontFamily: "'Montserrat', Helvetica, sans-serif",

          },
          onDatasetHover: {
            highlightDataSeries: false,
          },
          y: {
            formatter: function (val) {
              return (val) + " kWh/kWp/year";
            }
          },
        },
        title: {
          text: ""
        },
        dataLabels: {
          enabled: true,
          enabledOnSeries: undefined,

          textAnchor: 'middle',
          distributed: false,
          offsetX: 0,
          offsetY: 0,
          style: {
            fontSize: '14px',
            fontFamily: "'Montserrat', Helvetica, sans-serif",

            fontWeight: 'bold',
            colors: undefined
          },
          background: {
            enabled: true,
            foreColor: '#000',
            padding: 4,
            borderRadius: 2,
            borderWidth: 1,
            borderColor: '#fff',
            opacity: 0.9,
            dropShadow: {
              enabled: false,
              top: 1,
              left: 1,
              blur: 1,
              color: '#000',
              opacity: 0.45
            }
          },
          dropShadow: {
            enabled: false,
            top: 1,
            left: 1,
            blur: 1,
            color: '#000',
            opacity: 0.45
          }
          // offset: 0,
          // minAngleToShowLabel: 10
        },
        legend: {
          show: true,
          showForSingleSeries: false,
          showForNullSeries: true,
          showForZeroSeries: true,
          fontFamily: "'Montserrat', Helvetica, sans-serif",
          position: 'right'
        },
        responsive: [
          {
            breakpoint: 480,
            options: {
              chart: {
                width: 250,
                height: 200
              },
              plotOptions: {
                pie: {
                  startAngle: 0,
                  endAngle: 360,
                  expandOnClick: true,
                  offsetX: 50,
                  offsetY: 50,
                  customScale: 1,
                  dataLabels: {
                    offset: 100,
                    minAngleToShowLabel: 10
                  }
                },
              },
              legend: {
                position: 'bottom'
              }
            }
          }

        ]
      };

    // }

    this.total_revenue_loss_in_ppm = this.tariff * this.total_energy_loss_in_ppm
    this.total_revenue_loss_in_ppm = this.total_revenue_loss_in_ppm.toFixed(2)
    this.total_revenue_loss_in_KW_ppm = (this.tariff * this.total_energy_loss_in_KW_ppm).toFixed(3)
    ppm_inr = (this.total_revenue_loss_in_KW_ppm / this.total_revenue_loss_in_ppm)
    // // console.log(ppm_inr)
    this.total_revenue_loss_in_ppm_INR = (ppm_inr * 1000000).toFixed(2)

    if(revenue == null || revenue == ""){
      this.Chart_hide_show_revenue = "hide"
    }else{
      this.Chart_hide_show_revenue = "show"
    }
    // // // console.log(this.revenue_defectwise)
  }
  public gotomap() {

    this.router.navigate(['map'])
  }
  mySelect = '0';
  selectedValue: any;

  // data = [
  //   {
  //     id: 1,
  //     date: '01/04/2021'
  //   },
  //   {
  //     id: 2,
  //     date: '02/04/2021'
  //   },
  //   {
  //     id: 3,
  //     date: '03/04/2021'
  //   },
  //   {
  //     id: 4,
  //     date: '04/04/2021'
  //   },
  //   {
  //     id: 5,
  //     date: '05/04/2021'
  //   }
  // ];
  outerdata(date: any) {
    // alert("----outerdata  for side bar ----"+date)
    localStorage.setItem("date", date);
    this._http.setNewdateanalyticsInfo({
      dateval: date
    });
  }
  selectChange(date) {

    localStorage.setItem("date", date)
    this.date = date
    this.current_year = date
    // alert("----select change----"+date)
    this.datevalue = date;

    this.project_layer_summary_data = [];
    this.project_layer_summary_lable = [];
    this.inver_wise_data = [];
    this.inver_wise_lable = [];
    this.Hotspot_inv_val = [];
    this.ShortCircit_inv_val = [];
    this.Open_Circuit_inv_val = [];
    this.pannel_inv_val = [];
    this.Pid_val = [];
    this.total_count = [];
    this.inver_wise_def_hot = "";
    this.inver_wise_def_sc = "";
    this.inver_wise_def_os = "";
    this.inver_wise_def_pf = "";
    this.inver_wise_def_pid = "";
    this.Project_layer_summary_values = "";
    this.power_loss_keys = []
    this.Total_power_loss_percenntage = []
    var new_defects = null;
    this.defects_dates = [];
    this.total_no_defects_dates = [];
    this.health_history_data = [];

    this.Project_layer_summary = Object.keys(this.main_data[this.project_id_summary][date]['summary_data'])
    this.Project_layer_summary_values = Object.values(this.main_data[this.project_id_summary][date]['summary_data'])
    this.Project_layer_inverter_data_values = Object.values(this.main_data[this.project_id_summary][date]['inverter_data'])
    this.Project_layer_inverter_data = Object.keys(this.main_data[this.project_id_summary][date]['inverter_data'])
    this.health_history = Object.values(this.main_data[this.project_id_summary][date]['health_history'])
    this.health_history_key_data = Object.keys(this.main_data[this.project_id_summary][date]['health_history'])
    this.power_loss_keys = Object.keys(this.main_data[this.project_id_summary][date]['power_loss'])
    this.power_loss_values = Object.values(this.main_data[this.project_id_summary][date]['power_loss'])
    this.power_loss_values_energy = Object.values(this.main_data[this.project_id_summary][date]['power_loss'])
    this.power_loss_values_revenue = Object.values(this.main_data[this.project_id_summary][date]['power_loss'])
    this.plant_capacity_datewise = (this.main_data[this.project_id_summary]['plant_capacity'])
    this.total_power_loss_datewise = (this.main_data[this.project_id_summary][date]['total_power_loss'])
    this.total_no_defects_datewise = (this.main_data[this.project_id_summary][date]['total_no_defects'])
    this.total_module_count = (this.main_data[this.project_id_summary][date]['total_modules_present'])


    this.module_count_defectwise_key = [];
    this.module_count_defectwise_value = [];
    for (var v = 0; v < this.health_history_key_data.length; v++) {
      var modulecount_defectwise = ((this.health_history[v] / this.total_module_count) * 1000000).toFixed(2)
      this.module_count_defectwise_value.push(modulecount_defectwise)
      // // console.log(this.module_count_defectwise_value + "--------" + this.health_history[v])
    }
    for (var p = 0; p < this.date_summary_status_key.length; p++) {
      const d = new Date(this.current_year);
      const array_date = new Date(this.date_summary_status_key[p]);
      let year = d.getFullYear();
      let year_array_date = array_date.getFullYear();
      if (year_array_date <= year) {
        // alert(year + "-------------" + this.date_summary_status_key[p])
        this.health_history = Object.values(this.main_data[this.project_id_summary][this.date_summary_status_key[p]]['health_history'])
        // this.total_power_loss_dates.push(this.main_data[this.project_id_summary][this.date_summary_status_key[p]]['total_power_loss'])
        new_defects = this.main_data[this.project_id_summary][this.date_summary_status_key[p]]['total_no_defects']
        if (new_defects != 0) {
          this.total_no_defects_dates.push(new_defects)
          this.defects_dates.push([this.date_summary_status_key[p]])
        }
        this.health_history_keys = Object.keys(this.main_data[this.project_id_summary][this.datevalue]['health_history'])

        this.health_history_data.push({ "name": this.date_summary_status_key, "data": this.health_history })

      }
    }
    this.firstvalue = "n";
    // alert(this.Project_layer_inverter_data)
    var style = "";
    var style2 = "";
    if (this.Project_layer_summary_values.length != 0 || this.Project_layer_summary_values.length != undefined || this.Project_layer_summary_values.length != "undefined") {
      // this.firstvalue = "";
      style = "none";
      style2 = "block";

    } else if (this.Project_layer_summary_values.length == 0 || this.Project_layer_summary_values.length == undefined || this.Project_layer_summary_values.length == "undefined") {
      // this.firstvalue = "n";
      style = "block";
      style2 = "none";

    }
    // // // console.log(this.firstvalue + "-----" + this.Project_layer_summary_values.length)
    var formElement = document.getElementById("powerlossNo");
    formElement.style.display = style;
    var formElement2 = document.getElementById("powerlossYes");
    formElement2.style.display = style2;

    this.inver_wise_data = Object.keys(this.main_data[this.project_id_summary][date]['inverter_data'])
    for (var i = 0; i < this.Project_layer_summary.length; i++) {
      // if (this.Project_layer_summary[i] == "Hotspot") {
      this.summary_data_values.push(this.Project_layer_summary_values[i]['Count'])
      // }
      // else if (this.Project_layer_summary[i] == "Short Circuit") {
      //   this.short_circuit_summary = this.Project_layer_summary_values[i]['Count']
      // }
      // else if (this.Project_layer_summary[i] == "Open Circuit") {
      //   this.Open_circuit_summary = this.Project_layer_summary_values[i]['Count']
      // }
      // else if (this.Project_layer_summary[i] == "Panel Failure") {
      //   this.Panel_Failure_summary = this.Project_layer_summary_values[i]['Count']
      // }
      // else if (this.Project_layer_summary[i] == "PID") {
      //   this.PID_summary = this.Project_layer_summary_values[i]['Count']
      // }

      this.project_layer_summary_data.push(this.Project_layer_summary_values[i]['Count'])
      this.project_layer_summary_lable.push(this.Project_layer_summary[i])
      //   // // console.log("----data----"+this.Project_layer_summary_values[i]['Count'])
      //   // // console.log("----lable----"+this.Project_layer_summary[i])
    }


    this.ana_def_def = this.project_layer_summary_lable[0]
    this.ana_def_cou = this.project_layer_summary_data[0]
    // alert(this.ana_def_def)
    // alert(this.Project_layer_inverter_data_values.length)
    // for (var ja = 0; ja < this.Project_layer_inverter_data.length; ja++) {
    //   alert("sanjay")
    // }
    // for (var ja = 0; ja < this.Project_layer_inverter_data.length; ja++) {
    for (var ja = 0; ja < this.Project_layer_inverter_data_values.length; ja++) {
      // alert("sankay"+this.Project_layer_inverter_data_values[ja]['Hotspot']['count'])
      // // alert(this.Project_layer_inverter_data[i]+"-----"+this.Project_layer_inverter_data_values[i]['Hotspot']['count'])


      if (this.Project_layer_inverter_data_values != "") {

        this.Hotspot_inv_val.push(this.Project_layer_inverter_data_values[ja][this.Project_layer_summary[0]]['count'])
        this.ShortCircit_inv_val.push(this.Project_layer_inverter_data_values[ja][this.Project_layer_summary[1]]['count'])
        this.Open_Circuit_inv_val.push(this.Project_layer_inverter_data_values[ja][this.Project_layer_summary[2]]['count'])
        this.pannel_inv_val.push(this.Project_layer_inverter_data_values[ja][this.Project_layer_summary[3]]['count'])
        this.Pid_val.push(this.Project_layer_inverter_data_values[ja][this.Project_layer_summary[4]]['count'])
        this.inver_wise_lable.push(this.Project_layer_inverter_data[ja])
        // // // console.log(this.datevalue+"====="+[i]+"====="+this.Project_layer_inverter_data_values[i]['Hotspot']['count']+"---"+this.Project_layer_inverter_data_values[0]['Short Circuit']['count']+"===="+this.Project_layer_inverter_data_values[i]['Open Circuit']['count']+"-----"+this.Project_layer_inverter_data_values[i]['Panel Failure']['count']+"====="+this.Project_layer_inverter_data_values[i]['PID']['count'])
        this.inver_wise_def_lable = this.inver_wise_lable[0]
        this.inver_wise_def_hot = this.Project_layer_inverter_data_values[0][this.Project_layer_summary[0]]['count']
        this.inver_wise_def_sc = this.Project_layer_inverter_data_values[0][this.Project_layer_summary[1]]['count']
        this.inver_wise_def_os = this.Project_layer_inverter_data_values[0][this.Project_layer_summary[2]]['count']
        this.inver_wise_def_pf = this.Project_layer_inverter_data_values[0][this.Project_layer_summary[3]]['count']
        this.inver_wise_def_pid = this.Project_layer_inverter_data_values[0][this.Project_layer_summary[4]]['count']
      }

    }
    // alert(this.Project_layer_inverter_data)

    for (var n = 0; n < this.Project_layer_inverter_data.length; n++) {

      this.total_count.push(+this.Hotspot_inv_val[n] + +this.ShortCircit_inv_val[n] + +this.Open_Circuit_inv_val[n] + +this.pannel_inv_val[n] + +this.Pid_val[n])
    }
    var Total_power_loss = 0
    var power_loss_merics = 0
    power_loss_merics = this.total_power_loss_datewise;

    for (var z = 0; z < this.power_loss_keys.length; z++) {
      // alert(this.power_loss_values[z])
      Total_power_loss = Total_power_loss + this.power_loss_values[z]
    }
    var powerloss_data = [];
    var powerloss_key = [];
    for (var z = 0; z < this.power_loss_keys.length; z++) {
      // alert(this.power_loss_values[z])
      var percentage_calc = (this.power_loss_values[z] / Total_power_loss)
      var n_percentage_calc = parseFloat((Math.round(this.total_power_loss_datewise * percentage_calc * 100) / 100).toFixed(2));

      this.Total_power_loss_percenntage.push(n_percentage_calc)
      // alert(this.power_loss_values[z])
      powerloss_key.push(this.power_loss_keys[z])
      powerloss_data.push(this.power_loss_values[z])
    }
    const graph_data = {
      "summary": [
        { "hotspot": this.summary_data_values[0], "shortcircuit": this.summary_data_values[1], "opencircuit": this.summary_data_values[2], "pannelfaluer": this.summary_data_values[3], "pid": this.summary_data_values[4] }
      ],
      "Inverter": [
        { "INV1": this.total_count[0], "INV2": this.total_count[1], "INV3": this.total_count[2], "INV4": this.total_count[3], "INV5": this.total_count[4], "INV6": this.total_count[5], "INV7": this.total_count[6], "INV8": this.total_count[7], "INV9": this.total_count[8] }
      ],
      "Inverter_label": [
        {
          "label1": this.Project_layer_inverter_data[0], "label2": this.Project_layer_inverter_data[1], "label3": this.Project_layer_inverter_data[2], "label4": this.Project_layer_inverter_data[3], "label5": this.Project_layer_inverter_data[4], "label6": this.Project_layer_inverter_data[5], "label7": this.Project_layer_inverter_data[6], "label8": this.Project_layer_inverter_data[7], "label9": this.Project_layer_inverter_data[8]
        }
      ],
      "power_loss_keys": [{ "keys0": this.power_loss_keys[0], "keys1": this.power_loss_keys[1], "keys2": this.power_loss_keys[2], "keys3": this.power_loss_keys[3], "keys4": this.power_loss_keys[4], "keys5": this.power_loss_keys[5], "keys6": this.power_loss_keys[6], "keys7": this.power_loss_keys[7] }],
      "power_loss_values": [{ "values0": this.power_loss_values[0], "values1": this.power_loss_values[1], "values2": this.power_loss_values[2], "values3": this.power_loss_values[3], "values4": this.power_loss_values[4], "values5": this.power_loss_values[5], "values6": this.power_loss_values[6], "values7": this.power_loss_values[7] }]
    }


    // alert(Object.values(graph_data['Inverter']))

    this.summary_def_def = this.power_loss_keys[0]
    this.summary_def_cou = (this.power_loss_values[0] / 1000).toFixed(1)
    this.inverter_def_def = Object.values(graph_data['Inverter_label'][0])[0]
    this.inverter_def_cou = Object.values(graph_data['Inverter'][0])[0]
    // alert(Object.values(graph_data['Inverter'][0])[0])



    this.tabClick("Power Loss Metrics")
    // this.selectedValue = this.commonService.getDropDownText(this.mySelect, this.data)[0].date;
  }



}
