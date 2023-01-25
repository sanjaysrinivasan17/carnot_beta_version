import { Component, OnInit, ViewChild } from '@angular/core';
import { environment } from 'src/environments/environment';
import 'leaflet';
import 'leaflet-kml';
import { NgxUiLoaderService } from 'ngx-ui-loader';
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
declare var require: any
// require('leaflet-side-by-side');
declare const L: any;

var selected_point = new L.LayerGroup();

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
  selector: 'dashboard-map',
  templateUrl: './dashboard-map.component.html',
  styleUrls: ['./dashboard-map.component.css']
})
export class DashboardMapComponent implements OnInit {
  @ViewChild("chart") chart: ChartComponent;
  public chartOptions: Partial<ChartOptions>;

  @ViewChild("chart1") chart1: ChartComponent;
  public chartOptions1: Partial<ChartOptions1>;

  @ViewChild("chart3") chart6: ChartComponent;
  public chartOptions3: Partial<ChartOptions3>;

  public center: any = [];
  items: any = [];
  main_data_get_all: any;
  categorywise_project: any = ['all'];
  project_id_summary_alldata: any;
  str: any;
  lat: any;
  long: any;
  public map;
  new_center: any;
  j: any;
  date: any;
  All_projects_category: any = [];
  dashboard_total_key: any;
  dashboard_total_values: any;
  get_dashboard_data: any;
  plant_size_scanned: any;
  total_defects: any;
  total_power_loss: any;
  project_list: any;
  allproject: any;
  marker: any
  markerlist: any = [];
  tabIndex = 0;
  activeTab = 0;
  processed_data_project_categorywise: any = [];
  processed_data_project_categorywise_backup: any = [];
  Total_count: any = [];
  Total_project: any = [];
  Total_key: any = [];
  user_id: any;
  tabGroup;

  constructor(private ngxService: NgxUiLoaderService) { }

  ngOnChanges(): void {
    this.map = L.map('mapdashboard', {
      attributionControl: false
    }).setView(["20.5937", "78.9629"], 5);
  }

  ngOnInit(): void {
 // const newName = localStorage.getItem("name");
 this.user_id = localStorage.getItem("user_id");

 const token = localStorage.getItem("token");
 const headers = {
     'Authorization': `Bearer ${token}`,
     'Content-Type': 'application/json',
 };

 const filter = { count: 10 }
 fetch(`${environment.api_name}api/project/get_all?filter=${JSON.stringify(filter)}`, {
   method: "GET",
   headers,
   credentials: "omit",
 })
   .then((response) => response.json())
      .then(data => {
        this.main_data_get_all = data['data']
        this.project_id_summary_alldata = Object.keys(this.main_data_get_all)
        // get category wise based on the user account.
        for (var x = 0; x < this.main_data_get_all.length; x++) {
          if (
            this.categorywise_project.indexOf(
              this.main_data_get_all[x]["category"]
            ) === -1
          ) {
            this.categorywise_project.push(
              this.main_data_get_all[x]["category"]
            );
          }
        }
        this.categorywise_project.push("SCPM", "SCQM");

        // get all coordinates of the project.
        for (var i = 0; i < this.project_id_summary_alldata.length; i++) {
          var processed_data = []
          this.str = this.main_data_get_all[i]['center']
          if (this.str != '') {
            this.str = this.str.split(",");
            this.lat = this.str[0];
            this.long = this.str[1];

            this.center.push({
              lat: this.lat,
              long: this.long,
              name: this.main_data_get_all[i]["name"],
              category: this.main_data_get_all[i]["category"],
            });
            this.allproject = this.center
          }

          var processed_data_keys = Object.keys(
            this.main_data_get_all[i]["processed_data"]
          );
          var processed_data_values = Object.values(
            this.main_data_get_all[i]["processed_data"]
          );
          processed_data.push({
            processed_data_key: processed_data_keys,
            processed_data_values: processed_data_values,
            category: this.main_data_get_all[i]["category"],
            name: this.main_data_get_all[i]["name"],
            Data: this.main_data_get_all[i],
            center: this.main_data_get_all[i]["center"],
          });
          // for (var j = 0; j < processed_data_keys.length; j++) {


          //   processed_data.push({ "processed_data_key": processed_data_keys[j], "processed_data_values": processed_data_values[j], "category": this.main_data_get_all[i]['category'] })
          // }
          this.processed_data_project_categorywise.push(processed_data)
        }

        this.processed_data_project_categorywise_backup = this.processed_data_project_categorywise

        setTimeout(() => {
          this.ngxService.stop();
        }, 4000)

        // Initialize the map component

        this.map = L.map('mapdashboard', {
          attributionControl: false
        }).setView(["20.5937", "78.9629"], 5);

        // default MAP layer

        L.tileLayer(
          "https://{s}.basemaps.cartocdn.com/rastertiles/voyager_nolabels/{z}/{x}/{y}{r}.png",
          {
            attribution:
              '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
          }
        ).addTo(this.map);

        this.map_location_marker(this.categorywise_project[0]);

        setTimeout(() => {
          this.ngxService.stop();
        }, 4000);
      });

    // get dashboard data for the project based on category.
    fetch(`${environment.api_name}api/project/get_dashboard_data`, {
      method: "GET",
      headers,
      credentials: "omit",
    })
      .then((response) => response.json())
      .then((data) => {
        this.get_dashboard_data = data;
      })
      .catch((error) => console.error(error));
  }

   Dashboard_data(get_dashboard_data, category) {
    this.dashboard_total_key = Object.keys(
      get_dashboard_data["dashboard_total"]
    );
    // alert(this.dashboard_total_key)
    this.dashboard_total_values = Object.values(
      get_dashboard_data["dashboard_total"]
    );
    // plant_size_scanned,total_defects,total_power_loss
    this.plant_size_scanned = get_dashboard_data["plant_size_scanned"];
    this.total_defects = get_dashboard_data["total_defects"];
    this.total_power_loss = get_dashboard_data["total_power_loss"];

    if (category == "All" || category == this.categorywise_project[0]) {
      this.project_list = this.processed_data_project_categorywise_backup;
    } else {
      var thermography_project =
        this.processed_data_project_categorywise.filter(function (hero) {
          return hero[0].category
            .toLowerCase()
            .includes(category.toLowerCase());
        });
      this.project_list.push(thermography_project);
    }

    for (var k = 0; k < this.project_list.length; k++) {
      let hotspot = [];
      let SC = [];
      let OC = [];
      let uph_pf = [];
      let PID = [];
      let Project = [];
      var temp_array = this.project_list[k];

      if (this.project_list[k][0]["category"] == "thermography") {
        let hotspot_val = 0;
        let short_circuit = 0;
        let open_circuit = 0;
        let upf_or_pf = 0;
        let pid = 0;
        var key_count = [];
        var count_total = [];
        var proj_name = [];

        var array = this.project_list[k][0]["processed_data_values"];
        for (var m = 0; m < array.length; m++) {
          var summary_keys = Object.keys(array[m]["summary_layers"]);

          for (var n = 0; n < summary_keys.length; n++) {
            if (summary_keys[n] == "Hotspot") {
              var hotspot_key = summary_keys[n];
              hotspot_val =
                hotspot_val +
                array[m]["summary_layers"][summary_keys[n]]["Count"];
            } else if (summary_keys[n] == "Short Circuit") {
              var short_circuit_key = summary_keys[n];
              short_circuit =
                short_circuit +
                array[m]["summary_layers"][summary_keys[n]]["Count"];
            } else if (summary_keys[n] == "Open Circuit") {
              var open_circuit_key = summary_keys[n];
              open_circuit =
                open_circuit +
                array[m]["summary_layers"][summary_keys[n]]["Count"];
            } else if (
              summary_keys[n] == "Uniform Panel Heating" ||
              summary_keys[n] == "Panel Failure"
            ) {
              var upf_or_pf_key = summary_keys[n];
              upf_or_pf =
                upf_or_pf +
                array[m]["summary_layers"][summary_keys[n]]["Count"];
            } else if (summary_keys[n] == "PID") {
              var pid_key = summary_keys[n];
              pid = pid + array[m]["summary_layers"][summary_keys[n]]["Count"];
            }
          }
        }

        count_total = [
          hotspot_val,
          short_circuit,
          open_circuit,
          upf_or_pf,
          pid,
        ];
        key_count = [
          hotspot_key,
          short_circuit_key,
          open_circuit_key,
          upf_or_pf_key,
          pid_key,
        ];

        proj_name = [this.project_list[k][0]["name"]];

        this.Total_count.push(count_total);
        this.Total_key.push(key_count);
        this.Total_project.push(proj_name);
        var count_total = [];
      }
    }

    this.Dashboard_graph(
      this.dashboard_total_key,
      this.dashboard_total_values,
      this.Total_project
    );
  }
  Dashboard_graph(dashboard_total_key, dashboard_total_values, project) {
    // Initialize the chart on dashboard.
    this.chartOptions = {
      series: [
        {
          name: "Defect count",
          data: dashboard_total_values,
        },
      ],

      chart: {
        height: 350,
        type: "bar",
        toolbar: {
          show: false,
        },
      },
      plotOptions: {
        bar: {
          columnWidth: "50%",
        },
      },
      dataLabels: {
        enabled: false,
      },
      legend: {
        show: true,
        showForSingleSeries: false,
        showForNullSeries: true,
        showForZeroSeries: true,
        fontFamily: "'Montserrat', Helvetica, sans-serif",
        position: "right",
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
          fontSize: "12px",
          fontFamily: "'Montserrat', Helvetica, sans-serif",
        },
        theme: "dark",
        onDatasetHover: {
          highlightDataSeries: true,
        },
      },
      stroke: {
        width: 2,
      },

      grid: {
        row: {
          colors: ["#fff", "#f2f2f2"],
        },
      },
      xaxis: {
        labels: {
          rotate: -30,
        },
        categories: dashboard_total_key,
      },
    };
    this.chartOptions1 = {
      series: dashboard_total_values,
      chart: {
        width: 500,
        type: "pie",
      },
      colors: [
        "#339933",
        "#1be461",
        "#ef6c00",
        "#ffd54f",
        "#ffa64f",
        "#17a2b8",
        "#6f42c1",
        "#a78bda",
        "#117888",
        "#17a2b8",
        "#28a745",
      ],
      labels: dashboard_total_key,
      legend: {
        show: true,
        showForSingleSeries: false,
        showForNullSeries: true,
        showForZeroSeries: true,
        fontFamily: "'Montserrat', Helvetica, sans-serif",
        position: "right",
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
          fontSize: "12px",
          fontFamily: "'Montserrat', Helvetica, sans-serif",
        },

        theme: "dark",
        onDatasetHover: {
          highlightDataSeries: true,
        },
        y: {
          formatter: function (val) {
            return val + " ";
          },
        },
      },
      dataLabels: {
        enabled: true,
        enabledOnSeries: undefined,

        textAnchor: "middle",
        distributed: false,
        offsetX: 0,
        offsetY: 0,
        style: {
          fontSize: "14px",
          fontFamily: "'Montserrat', Helvetica, sans-serif",
          fontWeight: "bold",
          colors: undefined,
        },
        background: {
          enabled: true,
          foreColor: "#000",
          padding: 4,
          borderRadius: 2,
          borderWidth: 1,
          borderColor: "#fff",
          opacity: 0.9,
          dropShadow: {
            enabled: false,
            top: 1,
            left: 1,
            blur: 1,
            color: "#000",
            opacity: 0.45,
          },
        },
        dropShadow: {
          enabled: false,
          top: 1,
          left: 1,
          blur: 1,
          color: "#000",
          opacity: 0.45,
        },
        // offset: 0,
        // minAngleToShowLabel: 10
      },
      responsive: [
        {
          breakpoint: 480,
          options: {
            plotOptions: {
              pie: {
                size: 500,
              },
            },
            chart: {
              width: 250,
            },
            legend: {
              position: "bottom",
            },
          },
        },
      ],
    };
    let hotspot = [];
    let SC = [];
    let OC = [];
    let uph_pf = [];
    let PID = [];
    let Project = [];

    for (let index = 0; index < project.length; index++) {
      Project.push(this.Total_project[index]);
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
          data: hotspot,
        },
        {
          name: "Short Circuit",
          data: SC,
        },
        {
          name: "Open Circuit",
          data: OC,
        },
        {
          name: "Uniform Panel Heating / Panel Failure",
          data: uph_pf,
        },
        {
          name: "PID",
          data: PID,
        },
      ],
      chart: {
        type: "bar",
        // height: 1000,
        height: 5 * 30,
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
          fontSize: "12px",
          fontFamily: "'Montserrat', Helvetica, sans-serif",
        },
        theme: "dark",
        onDatasetHover: {
          highlightDataSeries: true,
        },
        y: {
          formatter: function (val) {
            return val + "";
          },
        },
      },
      dataLabels: {
        enabled: true,
        offsetX: 0,
        style: {
          fontSize: "14px",
          fontFamily: "'Montserrat', Helvetica, sans-serif",

          fontWeight: "bold",
          colors: undefined,
        },
        background: {
          enabled: true,
          foreColor: "#000",
          padding: 4,
          borderRadius: 2,
          borderWidth: 1,
          borderColor: "#fff",
          opacity: 0.9,
          dropShadow: {
            enabled: false,
            top: 1,
            left: 1,
            blur: 1,
            color: "#000",
            opacity: 0,
          },
        },
      },
      plotOptions: {
        bar: {
          horizontal: true,
        },
      },
      stroke: {
        width: 1,
        colors: ["#fff"],
      },
      title: {
        text: "",
      },
      xaxis: {
        categories: Project,
        labels: {
          formatter: function (val) {
            return val + "";
          },
        },
      },
      yaxis: {
        title: {
          text: undefined,
        },
      },

      fill: {
        opacity: 1,
      },
      legend: {
        position: "top",
        horizontalAlign: "left",
        fontFamily: "'Montserrat', Helvetica, sans-serif",
        offsetX: 40,
      },
      grid: {
        show: true,

        xaxis: {
          lines: {
            show: false,
          },
        },
        yaxis: {
          lines: {
            show: false,
          },
        },
        row: {
          colors: undefined,
          opacity: 0.0,
        },
        column: {
          colors: undefined,
          opacity: 0.0,
        },
      },
    };
  }

  map_location_marker(category) {
    // var color = {'blue','green','red','yellow','orange','pink'}
    var category_wise_color = {
      vegetation: "blue",
      thermography: "green",
      topography: "red",
      grading: "yellow",
      "due diligence": "orange",
    };

    if (category == "All" || category == this.categorywise_project[0]) {
      this.project_list = this.processed_data_project_categorywise_backup;
    } else {
      this.project_list = this.processed_data_project_categorywise.filter(
        function (hero) {
          return hero[0].category
            .toLowerCase()
            .includes(category.toLowerCase());
        }
      );
    }

    for (this.j = 0; this.j < this.project_list.length; this.j++) {
      var mapIcon = L.icon({
        iconSize: [30, 30],

        iconUrl:
          "http://maps.google.com/mapfiles/ms/icons/" +
          category_wise_color[this.project_list[this.j][0]["category"]] +
          "-dot.png",
        // shadowUrl: 'http://leafletjs.com/examples/custom-icons/leaf-shadow.png',
        // iconSize: [30, 30], // size of the icon
      });

      this.new_center = this.project_list[this.j];
      this.str = this.project_list[this.j][0]["center"];
      if (this.str != "") {
        this.str = this.str.split(",");
        this.lat = this.str[0];
        this.long = this.str[1];
      }
      this.All_projects_category = [this.lat, this.long];

      this.marker = L.marker([this.lat, this.long], {
        icon: mapIcon,
      }).bindPopup(this.project_list[this.j][0]["name"]);
      selected_point.addLayer(this.marker).addTo(this.map);
      this.markerlist.push(this.marker);
    }

    this.Dashboard_data(this.get_dashboard_data, category);
  }

  removeMap_marker() {
    for (var i = 0; i < this.markerlist.length; i++) {
      this.map.removeLayer(this.markerlist[i]);
    }

    this.Total_count = [];
    this.Total_key = [];
    this.Total_project = [];
  }

  switchHeaders(tab: any) {
    this.removeMap_marker();
    var d = tab["tab"]["textLabel"];
    var tab_name = tab["tab"]["textLabel"];
    this.map_location_marker(tab_name);
  }
  scrollTabs(event) {
    const children =
      this.tabGroup._tabHeader._elementRef.nativeElement.children;
    const back = children[0];
    const forward = children[2];
    if (event.deltaY > 0) {
      forward.click();
    } else {
      back.click();
    }
  }

}
