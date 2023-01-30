import { Component, OnInit, ViewChild } from '@angular/core';
import { environment } from '../../../../../environments/environment';
import {
  ApexAxisChartSeries,
  ApexChart,
  ChartComponent,
  ApexDataLabels,
  ApexXAxis,
  ApexPlotOptions,
  ApexStroke,
  ApexTitleSubtitle,
  ApexGrid,
  ApexFill,
  ApexMarkers,
  ApexLegend,
  ApexYAxis,
  ApexNonAxisChartSeries,
  ApexResponsive,
  ApexTooltip,


} from "ng-apexcharts";
import 'leaflet';
import 'leaflet-kml';
declare var require: any
// require('leaflet-side-by-side');
declare const L: any;

var selected_point = new L.LayerGroup();

import { ChartOptions5 } from '../../analytics/analytics.component';
import { NgxUiLoaderService } from "ngx-ui-loader";

export type ChartOptions = {

  series: ApexAxisChartSeries;
  chart: ApexChart;
  grid: ApexGrid;
  tooltip: ApexTooltip;
  legend: ApexLegend;
  dataLabels: ApexDataLabels;
  plotOptions: ApexPlotOptions;
  xaxis: ApexXAxis;
  stroke: ApexStroke;
};
export type ChartOptions1 = {
  series: ApexNonAxisChartSeries;
  tooltip: ApexTooltip;
  chart: ApexChart;
  responsive: ApexResponsive[];
  legend: ApexLegend;
  labels: any;
  dataLabels: ApexDataLabels;
  colors: string[];
};

export type ChartOptions3 = {
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
  selector: 'dashboard-details',
  templateUrl: './dashboard-details.component.html',
  styleUrls: ['./dashboard-details.component.css']
})
export class DashboardDetailsComponent implements OnInit {


  @ViewChild("chart") chart: ChartComponent;
  public chartOptions: Partial<ChartOptions>;

  @ViewChild("chart1") chart1: ChartComponent;
  public chartOptions1: Partial<ChartOptions1>;


  @ViewChild("chart3") chart6: ChartComponent;
  public chartOptions3: Partial<ChartOptions3>;

  main_data: any;
  project_id_summary: any;
  dashboard_total_key: any;
  dashboard_total_values: any;
  total_power_loss: any;
  total_defects: any;
  plant_size_scanned: any;
  main_data_get_all: any;
  project_id_summary_alldata: any;
  str: any;
  lat: any;
  long: any;
  center: any;
  j: any;
  new_center: any;
  user_id: any;



  constructor(private ngxService: NgxUiLoaderService) { }
  slideIndex: number = 1;

  slides: any;
  i: any;
  tittle: any;
  project_name: any;
  date: any;
  public map;
  items: any;
  dates: any;
  public count_defects: any;
  public Total_count: any;
  public Total_key: any;
  public Total_project: any;
  public Hostpot: any = [];
  public SC: any = [];
  public OC: any = [];
  public UPF_PF: any = [];
  public PID: any = [];
  categorywise_project: any = [];


  ngOnChanges(): void {
    this.map = L.map('mapid', {
      attributionControl: false
    }).setView(["20.5937", "78.9629"], 5);



  }
  ngOnInit(): void {
    // alert()
    this.count_defects = []
    this.Total_count = []
    this.Total_key = []
    this.Total_project = []


    const newtoken = localStorage.getItem("token");
    // const newName = localStorage.getItem("name");
    this.user_id = localStorage.getItem("user_id");

    const token = localStorage.getItem("token");
    const headers = {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json',
    };

    this.center = [];
    this.items = [];
    const filter = { count: 3 }
    fetch(`${environment.api_name}api/project/get_all?filter=${JSON.stringify(filter)}`,{
      headers,
      credentials: 'omit',
    })
      .then(response => response.json())
      .then(data => {
        this.main_data_get_all = data['data']
        this.project_id_summary_alldata = Object.keys(this.main_data_get_all)
        // console.log(this.main_data_get_all);
        for (var x = 0; x < this.main_data_get_all.length; x++) {

          this.add(this.main_data_get_all[x]['category'])
        }
        // // console.log(this.main_data_get_all)
        // alert(this.project_id_summary_alldata.length)
        // console.log(this.main_data_get_all);

        for (this.i = 0; this.i < this.project_id_summary_alldata.length; this.i++) {
          this.str = this.main_data_get_all[this.i]['center']
          // // console.log(this.project_id_summary_alldata[this.i] )
          if (this.str != '') {
            // console.log(this.str)
            this.str = this.str.split(",");
            this.lat = this.str[0];
            this.long = this.str[1];

            this.center.push({ "lat": this.lat, "long": this.long, "name": this.main_data_get_all[this.i]["name"] })
            // alert(this.lat+ "---long"+ this.long)
            // console.log(this.main_data_get_all[this.i]["name"]);

            if (this.items.indexOf(this.main_data_get_all[this.i]["name"]) === -1) {
              this.items.push(this.main_data_get_all[this.i]["name"]);

            }
            // console.log(this.items)
          }
        }
        this.all_project(this.items)
        // console.log(this.center)
        setTimeout(() => {
          this.ngxService.stop();
        }, 4000)

        this.map = L.map('mapid', {
          attributionControl: false
        }).setView(["20.5937", "78.9629"], 5);


        // default MAP layer


        L.tileLayer('https://{s}.basemaps.cartocdn.com/rastertiles/voyager_nolabels/{z}/{x}/{y}{r}.png', {
          attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        }).addTo(this.map);
        // var new_center = ""
        // alert( this.center.length)

        var greenIcon = L.icon({
          iconSize: [30, 30],

          iconUrl: 'http://maps.google.com/mapfiles/ms/icons/blue-dot.png',
          // shadowUrl: 'http://leafletjs.com/examples/custom-icons/leaf-shadow.png',

          // iconSize: [30, 30], // size of the icon


        });
        // Define an icon called animatedCircleIcon and set the css
        const animatedCircleIcon = {
          icon: L.divIcon({
            className: "css-icon",
            html: '<div class="gps_ring"></div>',
            iconAnchor: [10, -2],
            popupAnchor: [2, -2],
            iconSize: [40, 40]
          })
        };

        for (this.j = 0; this.j < this.center.length; this.j++) {
          this.new_center = this.center[this.j]
          // // console.log([this.center[this.j]["lat"], this.center[this.j]["long"]])

          // L.marker([this.center[this.j]["lat"],this.center[this.j]["long"]]).addTo(this.map);
          var marker = L.marker([this.center[this.j]["lat"], this.center[this.j]["long"]], { icon: greenIcon }).bindPopup(this.center[this.j]["name"])
          selected_point.addLayer(marker).addTo(this.map);
          // var marker2 = L.marker([this.center[this.j]["lat"], this.center[this.j]["long"]], animatedCircleIcon)
          // selected_point.addLayer(marker2).addTo(this.map);

        }


        setTimeout(() => {
          this.ngxService.stop();
        }, 4000)
      })



      fetch(`${environment.api_name}api/project/get_dashboard_data`, {
        headers,
        credentials: 'omit',
      })
      .then(response => response.json())
      .then(data => {
        this.main_data = data
        console.log(data)
        console.log("---------------------------------------------")
        this.dashboard_total_key = Object.keys(data['dashboard_total'])
        // alert(this.dashboard_total_key)
        this.dashboard_total_values = Object.values(data['dashboard_total'])
        // plant_size_scanned,total_defects,total_power_loss
        this.plant_size_scanned = data['plant_size_scanned']
        this.total_defects = data['total_defects']
        this.total_power_loss = data['total_power_loss']



        // alert(this.dashboard_total_values)
        this.chartOptions = {
          series: [
            {
              name: "Defect count",
              data: this.dashboard_total_values
            }
          ],

          chart: {
            height: 350,
            type: "bar",
            toolbar: {
              show: false
            },

          },
          plotOptions: {
            bar: {
              columnWidth: "50%"
            },
          },
          dataLabels: {
            enabled: false
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
          stroke: {
            width: 2
          },

          grid: {
            row: {
              colors: ["#fff", "#f2f2f2"]
            }
          },
          xaxis: {
            labels: {
              rotate: -30
            },
            categories: this.dashboard_total_key,

          },


        };
        this.chartOptions1 = {
          series: this.dashboard_total_values,
          chart: {
            width: 500,
            type: "pie"
          },
          colors: ["#339933", "#1be461", "#ef6c00", "#ffd54f", "#ffa64f", "#17a2b8", "#6f42c1", "#a78bda", "#117888", "#17a2b8", "#28a745"],
          labels: this.dashboard_total_key,
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
            y: {
              formatter: function (val) {
                return val + " ";
              }
            },
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
          responsive: [
            {
              breakpoint: 480,
              options: {
                plotOptions: {
                  pie: {
                    size: 500
                  }
                },
                chart: {
                  width: 250
                },
                legend: {
                  position: "bottom"
                }
              }
            }
          ]
        };


      })

  }
add(category){
  // alert(category)
  if (this.categorywise_project.indexOf(category) === -1) {
    this.categorywise_project.push(category);
    console.log(this.categorywise_project);
  }
}

  plusSlides(n) {
    this.showSlides(this.slideIndex += n);
  }
  showSlides(n) {
    this.slides = document.getElementsByClassName("project-card");
    if (n > this.slides.length) { this.slideIndex = 1 }
    if (n < 1) { this.slideIndex = this.slides.length }
    for (this.i = 0; this.i < this.slides.length; this.i++) {
      this.slides[this.i].style.display = "none";
    }
    this.slides[this.slideIndex - 1].style.display = "block";


  }
  all_project(all_project_data) {
    this.Total_count = []

    const newtoken = localStorage.getItem("token");
    // console.log(all_project_data)
    // var keys =[]

    const newName = localStorage.getItem("name");

    const token = localStorage.getItem("token");
    const headers = {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json',
    };

    for (let index = 0; index < all_project_data.length; index++) {
      // console.log(all_project_data[index]);
      var proj_name = all_project_data[index]
      // }
      // all_project_data.forEach(proj_name => {
      // fetch(`${environment.api_name}project/retrieve_project_data/${proj_name}`, {
      //   headers,
      //   credentials: 'omit',
      // })
      //   .then(response => response.json())
      //   .then(data => {

      //     this.project_id_summary = Object.keys(data)
      //     this.dates = Object.values(data[this.project_id_summary])[2]
      //     // // console.log(this.dates);
      //     var hotspot = 0
      //     var short_circuit = 0
      //     var open_circuit = 0
      //     var upf_or_pf = 0
      //     var pid = 0
      //     var key_count = []
      //     var count_total = []
      //     this.dates.forEach(element => {
      //       // if (.length > 0) {
      //       for (var k in data[this.project_id_summary][element]['summary_data']) {
      //         // // console.log(data[this.project_id_summary][element]['summary_data'][k]['Count']);
      //         if (k == 'Hotspot') {
      //           var hotspot_key = k
      //           hotspot = hotspot + data[this.project_id_summary][element]['summary_data'][k]['Count']
      //         } else if (k == "Short Circuit") {
      //           var short_circuit_key = k
      //           short_circuit = short_circuit + data[this.project_id_summary][element]['summary_data'][k]['Count']
      //         } else if (k == "Open Circuit") {
      //           var open_circuit_key = k
      //           open_circuit = open_circuit + data[this.project_id_summary][element]['summary_data'][k]['Count']
      //         } else if (k == "Uniform Panel Heating" || k == "Panel Failure") {
      //           var upf_or_pf_key = k
      //           upf_or_pf = upf_or_pf + data[this.project_id_summary][element]['summary_data'][k]['Count']
      //         } else if (k == "PID") {
      //           var pid_key = k
      //           pid = pid + data[this.project_id_summary][element]['summary_data'][k]['Count']
      //         }
      //       }

      //       count_total = [hotspot, short_circuit, open_circuit, upf_or_pf, pid]
      //       key_count = [hotspot_key, short_circuit_key, open_circuit_key, upf_or_pf_key, pid_key]

      //     });
      //     // this.Total_count.push({'proj_name':  all_project_data[index], 'key': key_count, 'Count': count_total })
      //     this.all_defects_count(all_project_data[index], key_count, count_total, this.items.length, index)
      //     count_total = []
      //     key_count = []

      //   })

    }
    // console.log(this.Total_count[0])
    // this.all_defects_count()
  }
  all_defects_count(proj_name, key_count, count_total, total_proj, index) {
    // console.log(Total_defect_count.length)
    // for (var i = 0; i < 10; i++) {
    // this.count_defects.push({ 'proj_name': proj_name, 'key': key_count, 'Count': count_total })
    this.Total_count.push(count_total)
    // console.log( this.Total_count)
    this.Total_key.push(key_count)
    this.Total_project.push(proj_name)
    //     // console.log(total_proj);
    if ((total_proj - 1) == index) {
      this.chart_rendering_projectwise(total_proj - 1)
    }
  }
  chart_rendering_projectwise(proj_count) {

    let hotspot = [];
    let SC = [];
    let OC = [];
    let uph_pf = [];
    let PID = [];
    let Project = []
    for (let index = 0; index < proj_count - 2; index++) {
      Project.push(this.Total_project[index])
      hotspot.push(this.Total_count[index][0]);
      SC.push(this.Total_count[index][1]);
      OC.push(this.Total_count[index][2]);
      uph_pf.push(this.Total_count[index][3]);
      PID.push(this.Total_count[index][4]);


    }

    this.chartOptions3 = {
      series: [
        {
          name: "Hotspot",
          data: hotspot
        }, {
          name: "Short Circuit",
          data: SC
        },
        {
          name: "Open Circuit",
          data: OC
        },
        {
          name: "Uniform Panel Heating / Panel Failure",
          data: uph_pf
        },
        {
          name: "PID",
          data: PID
        }
      ],
      chart: {
        type: "bar",
        // height: 1000,
        height: hotspot.length * 30,
        stacked: true,
        // events: {
        //   dataPointSelection: function (event, chartContext, config) {
        //     this.selector = config['dataPointIndex'];
        //     document.getElementById('inver_wise_itc_1').innerHTML = `<P><b>` + lable[this.selector] + `</b></p>`
        //     document.getElementById('inver_wise_hotspot_1').innerHTML = `<P>` + da[this.selector][Project_layer_summary[0]]['count'] + `</p>`
        //     document.getElementById('inver_wise_sc_1').innerHTML = `<P>` + da[this.selector][Project_layer_summary[1]]['count'] + `</p>`
        //     document.getElementById('inver_wise_op_1').innerHTML = `<P>` + da[this.selector][Project_layer_summary[2]]['count'] + `</p>`
        //     document.getElementById('inver_wise_pf_1').innerHTML = `<P>` + da[this.selector][Project_layer_summary[3]]['count'] + `</p>`
        //     document.getElementById('inver_wise_pid_1').innerHTML = `<P>` + da[this.selector][Project_layer_summary[4]]['count'] + `</p>`
        //   }
        // }
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
        categories: Project,
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

  }

}
