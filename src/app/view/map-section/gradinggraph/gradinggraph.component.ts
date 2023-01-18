import { Component, OnInit, ViewChild, Output, EventEmitter } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { HttpService } from '../services-map/http.service';
import { SidebarComponent } from '../sidebar/sidebar.component'
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
  xaxis: ApexXAxis;
  yaxis: ApexYAxis;
  title: ApexTitleSubtitle;
  legend: ApexLegend;
  labels: string[];
  stroke: any; // ApexStroke;
  dataLabels: ApexDataLabels;
  // ApexDataLabels;
  grid: ApexGrid;

  fill: ApexFill;
  colors: string[];
  tooltip: ApexTooltip;
};


@Component({
  selector: 'gradinggraph',
  templateUrl: './gradinggraph.component.html',
  styleUrls: ['./gradinggraph.component.css']
})
export class GradinggraphComponent implements OnInit {
  
  removing_kml: any = 'remove';
  @Output() removing_kml_event: EventEmitter<any> = new EventEmitter<any>();

  @ViewChild("chart") chart: ChartComponent;
  public chartOptions: Partial<ChartOptions>;userArray_value: any;

  userArray_Distance: any;
  grading_visibility: any;
  table_number: any;
  csv_path: any;
  summ: Object;
  project_id_summary: any;
  minimum_value: number;
  maximum_value: number;
  slope: any;

  constructor(private _http: HttpService, private http: HttpClient) { }

  ngOnInit(): void {
    this._http.getgradingtable().subscribe(info => {
      var data = info;
      var gradingval_tableno = data.gradingval
      // alert(gradingval_tableno)
      this._http.summary_data().subscribe(data => {

        this.summ = data
        this.project_id_summary = Object.keys(data)
        var date_local = localStorage.getItem('date')

        this.csv_path = this.summ[this.project_id_summary][date_local]['csv_path']
        // alert(this.csv_path)
        this.load_popup_content(gradingval_tableno, this.csv_path)
      })
    })

  }
  load_popup_content(table_no, csv_path) {
    this.userArray_value = []
    this.userArray_Distance = []
    this.table_number = table_no
    // // console.log(this.table_number);
    this.grading_visibility = "visible"
    // alert(csv_path + table_no + ".csv")

    this.http.get(csv_path + table_no + ".csv", { responseType: 'text' })
      .subscribe(
        data => {
          let csvToRowArray = data.split("\n");
          // for (let index = 1; index < 10 - 1; index++) {
          for (let index = 1; index < csvToRowArray.length - 1; index++) {
            let row = csvToRowArray[index].split(",");
            // this.userArray_Distance.push(parseFloat(parseFloat(row[0]).toFixed(5)));
            // this.userArray_value.push(parseFloat(row[3].split("\r")[0]))
            // this.userArray_value.push({"X":row[0],"Z":row[3].split("\r")[0]})
            // this.userArray_value.push([parseFloat(parseFloat(row[0]).toFixed(5)),parseFloat(row[3].split("\r")[0])])
            this.userArray_value.push(parseFloat(parseFloat(row[3].split("\r")[0]).toFixed(3)))
            this.userArray_Distance.push(parseFloat(parseFloat(row[0]).toFixed(3)))

          }
          // // console.log(this.userArray_Distance);
          // // console.log(this.userArray_value);
          this.minimum_value = Math.min(...this.userArray_value);
          this.maximum_value = Math.max(...this.userArray_value);
          var maximum_value = Math.max(...this.userArray_Distance);
          this.slope = ((((this.maximum_value - this.minimum_value) / maximum_value) * 100).toFixed(2))
          this.load_grading_chart(this.userArray_Distance, this.userArray_value)

        },
        error => {
          // console.log(error);
        }
      );
  }
  load_grading_chart(userArray_Distance, userArray_value) {
    this.chartOptions = {
      chart: {
        height: 230,
        width: 1000,
        type: "line",
        dropShadow: {
          enabled: true,
          color: '#000',
          top: 18,
          left: 7,
          blur: 10,
          opacity: 0.2
        },
        toolbar: {
          show: false
        }
      },
      colors: ['#0a5f0f', '#500f54', '#F44336', '#E91E63', '#9C27B0', '#77B6EA', '#7700EA'],
      stroke: {
        width: 5
      },
      grid: {
        show: true
      },
      legend: {
        show: true,
        showForSingleSeries: false,
        showForNullSeries: true,
        showForZeroSeries: true,
        fontFamily: "'Montserrat', Helvetica, sans-serif",
        position: 'right'
      },
      series: [{
        data: userArray_value,
        name: 'Elevation (m)'
        // data:[[userArray_Distance, userArray_value]]
      }],
      xaxis: {
        type: 'numeric',
        categories: userArray_Distance,
        title: {
          text: 'Distance (m)',

        },
        tooltip: {
          enabled: false,

        }
      },
      yaxis: {
        title: {
          text: 'Elevation (m)'
        },
      },
      tooltip: {
        theme: 'dark',
        custom: function ({ series, seriesIndex, dataPointIndex, w }) {

          var data = w.globals.initialSeries[seriesIndex].data[dataPointIndex];

          return '<ul style="padding:10px">' +
            '<li><b>Distance </b>: ' + userArray_Distance[dataPointIndex] + ' m  </li>' +
            '<li><b>Elevation </b>: ' + userArray_value[dataPointIndex] + ' m </li>' +
            '</ul>';
        }
      }
    };
  }

closeSidebar(id: string) {
    // alert(document.getElementById(id))
    // // console.log("closing_sidebar")
    let sideBar = document.getElementById(id);
    sideBar.style.display = 'none';
    sideBar.style.width = '0px';
    this.removing_kml_event.emit(this.removing_kml);
    SidebarComponent.Grading_data_render()
}
}
