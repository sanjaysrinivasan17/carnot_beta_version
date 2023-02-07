import { Component, OnInit, ViewChild, Output, EventEmitter, Input } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import {
  ApexNonAxisChartSeries,
  ApexResponsive,
  ApexChart,
  ChartComponent,
  ApexStroke,
  ApexTooltip,
  ApexLegend
} from "ng-apexcharts";
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { HttpService } from '../services-map/http.service';
import { ComparisionComponent } from '../sub-components/comparision/comparision.component';
import { Router } from '@angular/router';
import { allowedNodeEnvironmentFlags } from 'process';
import { FormGroup, FormControl, Form, Validators } from "@angular/forms";
import { ShareComponent } from 'src/app/view/layout/share/share.component';
import { environment } from '../../../../environments/environment';
import { HttpErrorResponse } from '@angular/common/http';
import { ToastrService } from 'ngx-toastr';
//import { HttpService } from 'src/app/Root/Functional/Components/Map/map/http.service';

export type ChartOptions = {
  series: ApexNonAxisChartSeries;
  chart: ApexChart;
  responsive: ApexResponsive[];
  labels: any;
  stroke: ApexStroke;
  legend: ApexLegend;
  colors: any;
  tooltip: ApexTooltip;


};


@Component({
  selector: 'sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent implements OnInit {
  static Grading_data_render() {
    throw new Error('Method not implemented.');
  }



  @ViewChild("chart") chart: ChartComponent;
  public chartOptions: Partial<ChartOptions>;
  public currentMenu: string;
  public previousID: string;
  // variables
  p: number = 1;
  public hide = false;
  isShown1: boolean = false; // hidden by default
  isShown2: boolean = false; // hidden by default
  isShown3: boolean = false; // hidden by default
  isShown4: boolean = false; // hidden by default
  isShown5: boolean = false; // hidden by default

  project_id: any;
  main_data: any;
  datesumlength: any;
  datevalue: any;
  project_layer_summary_data = [];
  project_layer_summary_lable = [];
  Hotspot_inv_val = [];
  ShortCircit_inv_val = [];
  Open_Circuit_inv_val = [];
  pannel_inv_val = [];
  Pid_val = [];
  total_count = [];
  Project_layer_summary_values: any;
  Project_layer_inverter_data: any;
  Project_layer_inverter_data_values: any;
  public inverter_data: any;

  date: any;
  Project_layer: any;
  hotpot_summary: any;
  short_circuit_summary: any;
  Open_circuit_summary: any;
  Panel_Failure_summary: any;
  PID_summary: any;
  ana_def_def: any;
  ana_def_cou: any;
  getting_date: any;
  l: any;


  project_id_summary: any;
  project_id_summary_values: any;
  date_summary: any;
  Project_layer_summary: any;

  inverter_content: string;
  i: any;
  sub_group_label: any;
  chart_data = [];
  chart_label = [];
  defects = [];
  defects_summary = [];
  n: any;
  kml = [];
  summary_data = [];
  summ: any;
  invData = [];
  check = [];
  inv_all: any;
  demo = [];
  inv_tb = [];
  public namevalue: [];
  idd: any;
  public item: any;
  public elm_value: any;
  public Summary_tab: Boolean;
  ChangedDate: any;
  SelectedDate: any;
  sub_defect = [];
  sub_label = [];
  but = ['explore', 'merge_type', 'nat', 'grid_off', 'cast'];
  col = ['yellow', 'blue', 'red', 'greeno'];
  colour: any;
  unfilteredDataToSearch: any[] = [];
  public filtered_data: any;

  public beComponentForm: FormGroup = new FormGroup({
    slct_cntrl: new FormControl("")
  });
  public menuIcons = [
    {
      name: 'PID',
      img: './assets/images/pid.svg',
      color: '#DC2828',
      rippleColor: '#007bff45'
    }, {
      name: 'Hotspot',
      img: './assets/images/hotspot.svg',
      color: '#089E60',
      rippleColor: '#007bff45'
    },
    {
      name: 'Open Circuit',
      img: './assets/images/open circuit.svg',
      color: '#FFC107',
      rippleColor: '#007bff45'
    },
    {
      name: 'Short Circuit',
      img: './assets/images/short circuit.svg',
      color: '#1396CC',
      rippleColor: '#007bff45'
    },
    {
      name: 'Panel Failure',
      img: './assets/images/panel failure.svg',
      color: '#D56DFC',
      rippleColor: '#007bff45'
    },

  ];

  public currentIndex: number = 0;
  public isOpenCompare: boolean;
  public dialogRef: any;
  public namedata: string = 'Hotspot';



  // Comparison Slider output click event

  slider_state: boolean = false;
  @Output() compare_slider_event = new EventEmitter<boolean>();

  // Change to appropriate names
  current_summary_state: any = 'Hotspot.kml';
  @Output() current_summary_state_event: EventEmitter<any> = new EventEmitter<any>();

  inverter_page: any;
  @Output() inverter_page_event: EventEmitter<any> = new EventEmitter<any>();

  cadastrial_map_page: any;
  @Output() cadastrial_map_page_event: EventEmitter<any> = new EventEmitter<any>();

  removing_kml: any = 'remove';
  @Output() removing_kml_event: EventEmitter<any> = new EventEmitter<any>();

  subdefects_page: any = 'visible';
  @Output() subdefects_page_event: EventEmitter<any> = new EventEmitter<any>();

  public newDatefromAllProjects: any;
  ChangedDateAllProjects: any;
  colors_tab: string[];
  date_inv_status_key: string[];
  date_inv_status_value: unknown[];
  Completed_date_array: any;
  inverter_name: any;
  report_path: any;
  public inverter_names: any;
  project_id_summary_val: any;
  Date_value: string[];
  Date_value_length: number;
  Current_date: string;
  project_values: any;
  share_project: any;
  topograpyData: any;
  topography_title: any;
  topography_values: any;
  grading_values: any;
  topography_data: any;
  token_based_logo: any;
  token_logo: any;
  closesidebar: any;
  closesidebar_for_site: any;
  splitted_sidebar_value: any;
  public proj_name: any;
  public proj_name_once: Boolean;
  public c = 0;
  grading_title: any;
  grading_data: any;


  constructor(private _http: HttpService, public dialog: MatDialog, private router: Router,  private toastr: ToastrService) { }

  // on Initializing this component
  ngOnInit(): void {
    sessionStorage.removeItem("current_tab")
    sessionStorage.removeItem("mode")
    sessionStorage.removeItem("kmlfilename")
    sessionStorage.removeItem("sub_defects")
    this.inverter_names = [];
    sessionStorage.setItem("shareComponent", "close");

    this._http.getclosesidebar().subscribe(info => {
      this.closesidebar = info;
      this.closesidebar_for_site = this.closesidebar.close_side_bar
      this.splitted_sidebar_value = this.closesidebar_for_site.split('/', 2)

      if (this.splitted_sidebar_value[1] == "True") {
        this.closeSidebar(this.splitted_sidebar_value[0])

      }
    },
    (err: HttpErrorResponse) => {
      if (err.status == 401) {
        this.toastr.error("Login time expired. Please login again.")
        this.gotologin()
      }
    })
    this._http.getproject_name().subscribe(info => {
      var Changedprojname = info;
      this.proj_name = Changedprojname.proj_name_val
      var prev_proj = sessionStorage.getItem("prev_proj")
      // if (prev_proj == "Adani-Limbaganesh") {

      //   sessionStorage.removeItem("prev_proj")
      //   this.ngOnInit()
      // } else if (this.proj_name == "Adani-Limbaganesh") {
      //   this.ngOnInit()
      // }

      // if(this.proj_name == ){
      // }
      // if(this.proj_name == "Adani-Limbaganesh"){
      //   this.proj_name_once = true
      // }
      // if(this.proj_name_once && this.c == 0){
      //   // this.ngOnInit()
      //   this.c = this.c+1;
      //   this.proj_name_once = false
      // }

      // this.ngOnInit()
      this._http.getNewUserInfo().subscribe(info => {
        this.ChangedDate = info;
        this.SelectedDate = this.ChangedDate.dateval

        this._http.getNewdateanalyticsInfo().subscribe(info => {
          this.ChangedDateAllProjects = info;
          this.newDatefromAllProjects = this.ChangedDateAllProjects.dateval
          this.Completed_date_array = [];
          const newtoken = localStorage.getItem("token");
          this.token_logo = localStorage.getItem("token");
          if (this.token_logo == '01df11c9ed93294a50c84389ba52f2eb05ffddd4' || this.token_logo == 'e29841efad583127cdaca516319e51a3bdbf9138') {
            this.token_based_logo = "other";
          } else {
            this.token_based_logo = "new";
          }
          const newName = localStorage.getItem('proj_name');
          //  this.proj_name = localStorage.getItem('proj_name');
          const date = localStorage.getItem("date");

        const token = localStorage.getItem("token");
        const headers = {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json',
        };

          var demo_project = newName.includes("DEMO PROJECT")
          if (demo_project) {
            var formElement = document.getElementById("share_visibility");
            formElement.style.display = "none";
          } else {
            var formElement = document.getElementById("share_visibility");
            formElement.style.display = "block";

          }
          this.project_values = [];
          // fetch(`${environment.api_name}project/get_projects_status/`, {
          //   method: 'GET',
          //   headers,
          //   credentials: 'omit',
          // })
          //   .then(response => response.json())
          //   .then(datavalue => {
          //     this.main_data = datavalue

          //     this.project_id_summary = Object.keys(datavalue)
          //     for (var i = 0; i < this.project_id_summary.length; i++) {
          //       this.project_id_summary_val = this.project_id_summary[i]
          //       // this.project_values.push(Object.values(this.main_data[this.project_id_summary_val]))
          //       this.Date_value = Object.keys(this.main_data[this.project_id_summary_val]['status'])
          //       this.Date_value_length = this.Date_value.length
          //       this.Current_date = this.Date_value[this.Date_value_length - 1]

          //       this.project_values.push({ "name": this.main_data[this.project_id_summary_val]['name'], "id": i })
          //     }
          //   })

          this._http.summary_data().subscribe(data => {

            this.main_data = data['data']

            data['data']['dates'] = Object.keys(data['data']['date_status'])
            this.project_id_summary = Object.keys(data['data']['date_status'])

            this.date_inv_status_key = Object.keys(data['data']["date_status"])
            this.date_inv_status_value = Object.values(data['data']["date_status"])
            for (var k = 0; k < this.date_inv_status_key.length; k++) {
              if (this.date_inv_status_value[k] == "completed") {
                this.Completed_date_array.push(this.date_inv_status_key[k])
              }
            }
            this.datesumlength = this.Completed_date_array.length - 1
            this.datevalue = this.Completed_date_array[this.datesumlength]
            this.report_path = data['data']['processed_data'][date]['report_path']
            sessionStorage.setItem("reportPath", this.report_path)

            // this.project_layer_summary_data = [];
            // this.project_layer_summary_lable = [];
            // this.Hotspot_inv_val = [];
            // this.ShortCircit_inv_val = [];
            // this.Open_Circuit_inv_val = [];
            // this.pannel_inv_val = [];
            // this.Pid_val = [];
            // this.total_count=[];
            var date_local = localStorage.getItem('date')
            // if (date_local == "undefined" || date_local == "" || date_local == null) {
            //   if (this.SelectedDate != undefined) {
            //     this.SelectedDate = this.SelectedDate
            //   } else {
            //     this.SelectedDate = this.datevalue
            //   }
            // }
            // else {
            this.SelectedDate = date_local
            // }
            // this.Project_layer_summary = Object.keys(this.main_data[this.project_id_summary][this.datevalue]['summary_data'])
            // this.Project_layer_summary_values = this.main_data[this.project_id_summary][this.datevalue]['summary_data']
            // this.Project_layer_inverter_data = Object.keys(this.main_data[this.project_id_summary][this.datevalue]['inverter_data'])
            // this.Project_layer_inverter_data_values = Object.values(this.main_data[this.project_id_summary][this.datevalue]['inverter_data'])
            this.Project_layer_summary = Object.keys(data['data']['processed_data'][this.datevalue]['summary_layers'])

            this.Project_layer_inverter_data = Object.keys(data['data']['processed_data'][this.datevalue]['inverter_layers'])
            this.topography_data = Object.keys(data['data']['processed_data'][this.datevalue]['topography_layers'])
            this.grading_data = Object.keys(data['data']['processed_data'][this.datevalue]['grading_layers'])
            for (var j = 0; j < this.Project_layer_inverter_data.length; j++) {
              let x = (j + 1)
              this.inverter_names.push({ "name": this.Project_layer_inverter_data[j], "pvalue": (x) })

            }
          })
        })

      })
    },
    (err: HttpErrorResponse) => {
      if (err.status == 401) {
        this.toastr.error("Login time expired. Please login again.")
        this.gotologin()
      }
    })


  }

  // Function for displaying description in summary,inverter sidebar
  toggleShow() {

    this.isShown1 = !this.isShown1;
    this.isShown2 = !this.isShown2;
    this.isShown3 = !this.isShown3;
    this.isShown4 = !this.isShown4;
    this.isShown5 = !this.isShown5;

  }

  // Function for showing opened sidebar.

  activateMenu(id: string) {
    this.idd = id
    if (this.previousID != undefined && (this.Summary_tab == true || this.Summary_tab == undefined)) {

      let prevId = document.getElementById(this.previousID);
      prevId.style.width = '0px';
    }
    else {
      let e = document.getElementById(id);
      e.style.width = '5px';
      this.previousID = id;
    }


  }


  // Function for slider in comparison page

  public sliderToggle() {
    this.slider_state = !this.slider_state;
    this.compare_slider_event.emit(this.slider_state)

  }

  // Function for Opening sidebar

  public openSidbar(id: string, menuId: string) {

    let sideBar = document.getElementById(id);

    sideBar.style.display = 'block';
    sideBar.style.width = '380px';

    window.addEventListener("resize", function (event) {
      if (document.body.clientWidth > 600) {
        sideBar.style.width = '380px';
      } else {
        sideBar.style.width = '300px';
      }
    });
    switch (menuId) {
      case 'summary':
        this.summary_data = [];
        this.currentMenu = 'summary';
        this.summary_data_render();
        break;
      case 'inventor':
        this.invData = [];
        this.currentMenu = 'inventor';
        this.inverter_data_render();
        break;
      case 'Topography':
        this.topograpyData = [];
        this.currentMenu = 'Topography';
        this.Topography_data_render();
        break;
      case 'Grading':
        this.topograpyData = [];
        this.currentMenu = 'Grading';
        this.Grading_data_render();
        break;
    }
  }

  // Function for closing sidebar
  closeSidebar(id: string) {
    let sideBar = document.getElementById(id);
    sideBar.style.display = 'none';
    sideBar.style.width = '0px';
    this.removing_kml_event.emit(this.removing_kml);
    sessionStorage.removeItem("current_tab")
    sessionStorage.removeItem("mode")
    sessionStorage.removeItem("kmlfilename")
    sessionStorage.removeItem("sub_defects")
    if (this.Summary_tab == true) {
      this.activateMenu(this.previousID)
      this.Summary_tab = false;

    }
  }

  // Function for getting current tab from summary, inverter in sidebar
  activate_tab(name: string, i: number, currentMenu: string, defect_name, kml) {
    sessionStorage.setItem('current_tab', JSON.stringify(i))
    this.currentIndex = i;
    var kml_color = []

    this.namedata = name;
    var sub_group_detail
    var sub_group_detail_inv
    var sub_group_lables_inv
    var sub_group_lables



    if (currentMenu == 'summary') {

      // if (name == 'Hotspot' || name === 'Panel Failure' || name === 'Uniform Panel Heating') {
      this.loadSumm_data(defect_name, kml)
      // }
      try {
        var kml_name = this.summ['processed_data'][this.datevalue]['summary_layers'][name]['kml']
      } catch (error) {
        name = 'Uniform Panel Heating'
        kml_name = this.summ['processed_data'][this.datevalue]['summary_layers'][name]['kml']
      }
      sub_group_detail = this.summ['processed_data'][this.datevalue]['summary_layers'][name]['sub_group']

      if (Object.keys(sub_group_detail).length == 0) {
        sub_group_lables = this.summ['processed_data'][this.datevalue]['summary_layers'][name]
        kml_color.push(this.summ['processed_data'][this.datevalue]['summary_layers'][name]['color'])
      }
      else {
        sub_group_lables = this.summ['processed_data'][this.datevalue]['summary_layers'][name]['sub_group']
        for (var n in sub_group_lables) {

          kml_color.push(sub_group_lables[n]['color'])
        }
      }




      this.current_summary_state = { tab: kml_name, menu: currentMenu, color: kml_color, pageno: this.p };


      this.current_summary_state_event.emit(this.current_summary_state)
    }
    if (currentMenu == 'inventor') {
      // if (name == 'Hotspot' || name === 'Panel Failure' || name === 'Uniform Panel Heating') {
      this.inv_table(defect_name, kml)
      // }
      try {
        var inverter_kml = this.inv_all['processed_data'][this.datevalue]['inverter_layers'][this.l][name]['kml']
      } catch (error) {
        name = 'Uniform Panel Heating'

        inverter_kml = this.inv_all['processed_data'][this.datevalue]['inverter_layers'][this.l][name]['kml']

      }


      sub_group_detail_inv = this.inv_all['processed_data'][this.datevalue]['inverter_layers'][this.l][name]['sub_group']
      if (Object.keys(sub_group_detail_inv).length == 0) {
        sub_group_lables_inv = this.inv_all['processed_data'][this.datevalue]['inverter_layers'][this.l][name]
        kml_color.push(this.inv_all['processed_data'][this.datevalue]['inverter_layers'][this.l][name]['color'])
      }
      else {
        sub_group_lables_inv = this.inv_all['processed_data'][this.datevalue]['inverter_layers'][this.l][name]['sub_group']
        for (var t in sub_group_lables_inv) {
          kml_color.push(sub_group_lables_inv[t]['color'])
        }
      }


      this.current_summary_state = { tab: inverter_kml, menu: currentMenu, color: kml_color, pageno: this.p };

      this.current_summary_state_event.emit(this.current_summary_state)

    }





  }

  // Function for loading kml from sub group table in summary,inverter,cadastrial side bar.
  sub_defect_kml(n, type) {

    sessionStorage.setItem('sub_defects', n)
    if (type == 'summary') {
      try {
        var sub_group_kml = this.summ['processed_data'][this.datevalue]['summary_layers'][this.namedata]['sub_group'][n]['kml']


      } catch (error) {
        this.namedata = 'Uniform Panel Heating'
        sub_group_kml = this.summ['processed_data'][this.datevalue]['summary_layers'][this.namedata]['sub_group'][n]['kml']
      }
      this.colour = this.summ['processed_data'][this.datevalue]['summary_layers'][this.namedata]['sub_group'][n]['color']
      this.current_summary_state = { tab: sub_group_kml, menu: 'summary_sub_details', color: this.colour, pageno: this.p };
      this.sub_defects_count(this.current_summary_state)
      this.current_summary_state_event.emit(this.current_summary_state)
      // this.subdefects_page_event.emit("visibility_off");
    }
    if (type == 'invertor') {
      try {
        var sub_group_kml_inverter = this.inv_all['processed_data'][this.datevalue]['inverter_layers'][this.l][this.namedata]['sub_group'][n]['kml']

      } catch (error) {
        this.namedata = 'Uniform Panel Heating'
        sub_group_kml_inverter = this.inv_all['processed_data'][this.datevalue]['inverter_layers'][this.l][this.namedata]['sub_group'][n]['kml']
      }
      this.colour = this.inv_all['processed_data'][this.datevalue]['inverter_layers'][this.l][this.namedata]['sub_group'][n]['color']
      this.current_summary_state = { tab: sub_group_kml_inverter, menu: 'inverter_sub_details', color: this.colour, pageno: this.p };
      this.sub_defects_count(this.current_summary_state)

      this.current_summary_state_event.emit(this.current_summary_state)
    }
    if (type == 'Topography') {
      var sub_group_kml = this.summ['processed_data'][this.datevalue]['topography_layers'][this.topography_title]['sub_feature'][n]["kml"]
      this.colour = this.summ['processed_data'][this.datevalue]['topography_layers'][this.topography_title]['sub_feature'][n]['color']

      this.cadastrial_map_page = { tab: sub_group_kml, menu: 'cadastral_map', color: this.colour, pageno: this.p };


      this.cadastrial_map_page_event.emit(this.cadastrial_map_page)
    }
    if (type == 'Grading') {
      var sub_group_kml = this.summ['processed_data'][this.datevalue]['grading_layers'][this.grading_title]['sub_feature'][n]["kml"]
      this.colour = this.summ['processed_data'][this.datevalue]['grading_layers'][this.grading_title]['sub_feature'][n]['color']
      this.cadastrial_map_page = { tab: sub_group_kml, menu: 'Grading', color: this.colour, pageno: this.p };


      this.cadastrial_map_page_event.emit(this.cadastrial_map_page)
    }


  }

  // summary data

  // Function for loading summary data
  sub_defects_count(current_summary_state) {
  }
  summary_data_render() {
    sessionStorage.setItem('current_tab', "0")
    var shareComponent_visibility = sessionStorage.getItem("shareComponent")
    if (shareComponent_visibility == "open") {
      this.Summary_tab = false;
      this.dialog.closeAll();
      this.activateMenu("summary")
    }


    if (this.Summary_tab == true) {
      if (this.previousID == "inventor") {
        this.Summary_tab = false
        this.activateMenu("summary")
        return this.summary_data_render()
      } else if (this.previousID == "Topography") {
        this.Summary_tab = false
        this.activateMenu("summary")
        return this.summary_data_render()
      }
      this.previousID = "summary"
      this.Summary_tab = false
      this.closeSidebar('summarySidebar')
      return
    }
    this._http.summary_data().subscribe(data => {

      this.summ = data['data']

      this.project_id_summary = Object.keys(data['data'])
      var date_local = localStorage.getItem('date')

      this.datevalue = date_local

      this.Project_layer_summary = Object.keys(this.summ['processed_data'][this.datevalue]['summary_layers'])

      for (var k in this.summ['processed_data'][this.datevalue]['summary_layers']) {
        this.summary_data.push({
          "name": k,
          "kml": this.summ['processed_data'][this.datevalue]['summary_layers'][k]["kml"],
          "color": this.summ['processed_data'][this.datevalue]['summary_layers'][k]["color"],
          "count": this.summ['processed_data'][this.datevalue]['summary_layers'][k]["Count"]
        });

      }
      // this.loadSumm_data(this.Project_layer_summary[0], this.summ['processed_data'][this.datevalue]['summary_layers'][this.Project_layer_summary[0]]['kml']);


    },
    (err: HttpErrorResponse) => {
      if (err.status == 401) {
        this.toastr.error("Login time expired. Please login again.")
        this.gotologin()
      }
    })

  }


  // Function for loading summary data in summary side bar

  loadSumm_data(elm, x) {
    this.removing_kml_event.emit(this.removing_kml);
    this.subdefects_page_event.emit("visibility_off");


    if (elm === 'Hotspot') {
      this.sub_defect.length = 0
      this.sub_label.length = 0
      this.colors_tab = ['#008000', '#0000ff', '#ff0000', '#e6e600']
    }
    if (elm === 'Panel Failure' || elm === 'Uniform Panel Heating') {
      this.sub_defect.length = 0
      this.sub_label.length = 0
      this.colors_tab = ['#ffa500', '#ff0000']

    }
    this.defects_summary = [];
    this.sub_defect = []
    this.sub_label = []
    for (var key in this.summ['processed_data'][this.datevalue]['summary_layers'][elm]['sub_group']) {
      this.defects_summary.push({
        "name": key,
        "count": this.summ['processed_data'][this.datevalue]['summary_layers'][elm]['sub_group'][key]["Count"],
        "kml": this.summ['processed_data'][this.datevalue]['summary_layers'][elm]['sub_group'][key]["kml"],
        "color": this.summ['processed_data'][this.datevalue]['summary_layers'][elm]['sub_group'][key]["color"]
      });
      this.sub_label.push(key)
      this.sub_defect.push(this.summ['processed_data'][this.datevalue]['summary_layers'][elm]['sub_group'][key]["Count"])

    }
    if (this.sub_defect.length === 0) {
      document.getElementById('chart1').style.display = "none"
      this.sub_defect = [0, 0, 0, 0, 0]
      this.sub_label = ['No data', 'No data', 'No data', 'No data', 'No data']
    }
    else {
      document.getElementById('chart1').style.display = "block"

    }

    //chart
    this.chartOptions = {
      series: this.sub_defect, //value
      chart: {
        width: 300,
        type: "donut",
        // background: '#d9d9d9'
      },

      // colors: ['#264D59',  '#4397AD',  '#F9E07F',  '#F9AD6A'],
      // colors: ['#F9AD6A', '#dfff80', '#4397AD', '#264D59'],
      colors: this.colors_tab,


      stroke: {
        show: false,
      },

      labels: this.sub_label, //labels
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
          fontFamily: 'Montserrat,Helvetica,sans-serif'
        },
        theme: 'dark',
        onDatasetHover: {
          highlightDataSeries: true,
        },
      },
      legend: {
        show: true,
        showForSingleSeries: false,
        showForNullSeries: true,
        fontFamily: "'Montserrat', Helvetica, sans-serif",
        showForZeroSeries: true,
        position: 'bottom',
      },
      responsive: [
        {

          breakpoint: 500,
          options: {
            chart: {
              foreColor: '#000',
              width: 200
            },
            dataLabels: {
              enabled: true,
              enabledOnSeries: true,
              formatter: function (val, opts) {
                return val
              },
              // color: "#000",
              textAnchor: 'middle',
              distributed: false,
              offsetX: 0,
              offsetY: 0,
              style: {
                fontSize: '14px',
                fontFamily: 'Montserrat,Helvetica,sans-serif',
                fontWeight: 'bold',
                colors: ['#F44336', '#E91E63', '#9C27B0']
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
                  color: '#999',
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
            },
            legend: {
              show: true,
              showForSingleSeries: false,
              showForNullSeries: true,
              showForZeroSeries: true,
              position: 'bottom',
              horizontalAlign: 'center',
              floating: false,
              fontSize: '10px',
              fontFamily: "'Montserrat', Helvetica, sans-serif",
              fontWeight: 400,
              formatter: undefined,
              inverseOrder: false,
              width: undefined,
              height: undefined,
              tooltipHoverFormatter: undefined,
              customLegendItems: [],
              offsetX: 0,
              offsetY: 0,
              labels: {
                colors: undefined,
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
                offsetX: 0,
                offsetY: 0
              },
              itemMargin: {
                horizontal: 5,
                vertical: 0
              },
              onItemClick: {
                toggleDataSeries: false
              },
              onItemHover: {
                highlightDataSeries: true
              },
            }

          }
        }
      ]
    };
    if (this.isOpenCompare) {
      this.openComparision('compare')
    }
    this.Summary_tab = true;
  }
  // end summary

  // inverter data

  // Function for opening inverter sidebar

  inverter_data_render() {
    // this.removing_kml_event.emit(this.removing_kml);
    sessionStorage.setItem('current_tab', "0")

    var shareComponent_visibility = sessionStorage.getItem("shareComponent")
    if (shareComponent_visibility == "open") {
      this.Summary_tab = false;
      this.dialog.closeAll();
      this.activateMenu("inventor")
    }
    if (this.Summary_tab == true) {
      if (this.previousID == "summary") {
        this.Summary_tab = false
        this.activateMenu("inventor")
        return this.inverter_data_render()
      } else if (this.previousID == "Topography") {
        this.Summary_tab = false
        this.activateMenu("inventor")
        return this.inverter_data_render()
      }
      this.Summary_tab = false
      this.previousID = "inventor"
      this.closeSidebar('summarySidebar')
      return
    }
    this._http.inverter_data().subscribe(data => {
      this.inv_all = data['data']
      this.project_id = Object.keys(data['data'])
      var date_local = localStorage.getItem('date')

      this.datevalue = date_local
      // this.date = Object.values(data[this.project_id])[2]
      this.Project_layer = Object.values(this.inv_all['processed_data'][this.datevalue]['inverter_layers'])
      this.check = []


      for (var key in this.inv_all['processed_data'][this.datevalue]['inverter_layers']) {
        this.check.push({ "title": key })
      }
      this.load_invDiv(1);
    },
    (err: HttpErrorResponse) => {
      if (err.status == 401) {
        this.toastr.error("Login time expired. Please login again.")
        this.gotologin()
      }
    });

  }


  // Function for loading inverter data in inverter side bar

  load_invDiv(elm) {
    for (var j = 0; j < this.inverter_names.length; j++) {
      if (elm == this.inverter_names[j]["name"]) {
        elm = parseInt(this.inverter_names[j]["pvalue"])
        this.p = parseInt(this.inverter_names[j]["pvalue"])
      }
    }
    this.removing_kml_event.emit(this.removing_kml);
    this.inverter_page_event.emit(this.p)

    this.l = this.check[elm - 1]['title'];
    this.invData = [];

    for (var k in this.inv_all['processed_data'][this.datevalue]['inverter_layers'][this.l]) {
      this.inverter_name = this.l

      this.invData.push({
        "inv_name": this.l,
        "name": k,
        "count": this.inv_all['processed_data'][this.datevalue]['inverter_layers'][this.l][k]["count"],
        "kml": this.inv_all['processed_data'][this.datevalue]['inverter_layers'][this.l][k]["kml"],
        "color": this.inv_all['processed_data'][this.datevalue]['inverter_layers'][this.l][k]["color"]
      });
    }
    if (this.namedata == null) {

      this.inv_table(this.l, 'Hotspot')

    }
    else {
      this.inv_table(this.l, this.namedata)

    }
  }

  // Function for loading inverter data in a table in inverter side bar

  inv_table(ele, elm) {
    // this.removing_kml_event.emit(this.removing_kml);
    this.subdefects_page_event.emit("visibility_off");

    this.inv_tb = [];
    for (var key in this.inv_all['processed_data'][this.datevalue]['inverter_layers'][ele][elm]['sub_group']) {
      this.inv_tb.push({
        "name": key,
        "count": this.inv_all['processed_data'][this.datevalue]['inverter_layers'][ele][elm]['sub_group'][key]["count"],
        "kml": this.inv_all['processed_data'][this.datevalue]['inverter_layers'][ele][elm]['sub_group'][key]["kml"],
        "color": this.inv_all['processed_data'][this.datevalue]['inverter_layers'][ele][elm]['sub_group'][key]["color"]
      });

    }
    if (this.isOpenCompare) {
      this.openComparision('compare')
    }
    this.Summary_tab = true
  }

  // end inverter

  // cadastrial map start

  // Function for going to cadastrial map page in side bar

  Topography_data_render() {
    this.subdefects_page_event.emit("visibility_off");

    var shareComponent_visibility = sessionStorage.getItem("shareComponent")
    if (shareComponent_visibility == "open") {
      this.Summary_tab = false;
      this.dialog.closeAll();
      this.activateMenu("Topography")
    }

    if (this.Summary_tab == true) {
      if (this.previousID == "summary") {
        this.Summary_tab = false
        this.activateMenu("Topography")
        return this.Topography_data_render()
      } else if (this.previousID == "inventor") {
        this.Summary_tab = false
        this.activateMenu("Topography")
        return this.Topography_data_render()
      }
      this.Summary_tab = false
      this.previousID = "inventor"
      this.closeSidebar('summarySidebar')
      return
    }
    this._http.summary_data().subscribe(data => {
      var sub_feature = null
      this.topography_values = []
      this.summ = data['data']
      this.project_id = Object.keys(data['data'])
      var date_local = localStorage.getItem('date')
      this.datevalue = date_local

      this.Project_layer = this.summ['processed_data'][this.datevalue]['topography_layers']
      this.topography_title = Object.keys(this.summ['processed_data'][this.datevalue]['topography_layers'])
      sub_feature = this.summ['processed_data'][this.datevalue]['topography_layers'][this.topography_title]['sub_feature']
      for (var i = 0; i < sub_feature.length; i++) {
        this.topography_values.push({
          "name": sub_feature[i],
          // "count": this.summ['processed_data'][this.project_id_summary][this.datevalue]['summary_layers'][elm]['sub_group'][key]["Count"],
          "kml": this.summ['processed_data'][this.datevalue]['topography_layers'][this.topography_title]['sub_feature'][sub_feature[i]]["kml"],
          "color": this.summ['processed_data'][this.datevalue]['topography_layers'][this.topography_title]['sub_feature'][sub_feature[i]]["color"]
        });
        // this.topography_title.push({ "title": Object.keys(data[this.project_id][this.datevalue]['topography_data']) })
      }
      this.current_summary_state = { tab: sub_feature[0], menu: 'cadastral_map', color: this.summ['processed_data'][this.datevalue]['topography_layers'][this.topography_title]['sub_feature'][sub_feature[0]]["color"], pageno: 1 };


      this.current_summary_state_event.emit(this.current_summary_state)


      if (this.isOpenCompare) {
        this.openComparision('compare')
      }

      this.Summary_tab = true

    },
    (err: HttpErrorResponse) => {
      if (err.status == 401) {
        this.toastr.error("Login time expired. Please login again.")
        this.gotologin()
      }
    })

  }

  Grading_data_render() {
    this.subdefects_page_event.emit("visibility_off");

    var shareComponent_visibility = sessionStorage.getItem("shareComponent")
    if (shareComponent_visibility == "open") {
      this.Summary_tab = false;
      this.dialog.closeAll();
      this.activateMenu("Grading")
    }

    if (this.Summary_tab == true) {
      if (this.previousID == "summary") {
        this.Summary_tab = false
        this.activateMenu("Grading")
        return this.Grading_data_render()
      } else if (this.previousID == "inventor") {
        this.Summary_tab = false
        this.activateMenu("Grading")
        return this.Grading_data_render()
      }
      this.Summary_tab = false
      this.previousID = "inventor"
      this.closeSidebar('summarySidebar')
      return
    }
    this._http.summary_data().subscribe(data => {
      var sub_feature = null
      this.grading_values = []
      this.summ = data['data']
      this.project_id = Object.keys(data['data'])
      var date_local = localStorage.getItem('date')

      this.datevalue = date_local
      this.Project_layer = (this.summ['processed_data'][this.datevalue]['grading_layers'])
      this.grading_title = Object.keys(this.summ['processed_data'][this.datevalue]['grading_layers'])
      sub_feature = (this.summ['processed_data'][this.datevalue]['grading_layers'][this.grading_title]['sub_feature'])
      for (var i = 0; i < sub_feature.length; i++) {
        this.grading_values.push({
          "name": sub_feature[i],
          // "count": this.summ['processed_data'][this.project_id_summary][this.datevalue]['summary_data'][elm]['sub_group'][key]["Count"],
          "kml": this.summ['processed_data'][this.datevalue]['grading_layers'][this.grading_title]['sub_feature'][sub_feature[i]]["kml"],
          "color": this.summ['processed_data'][this.datevalue]['grading_layers'][this.grading_title]['sub_feature'][sub_feature[i]]["color"]
        });
        // this.topography_title.push({ "title": Object.keys(this.summ['processed_data'][this.datevalue]['topography_data']) })
      }
      this.current_summary_state = { tab: sub_feature[0], menu: 'Grading', color: this.summ['processed_data'][this.datevalue]['grading_layers'][this.grading_title]['sub_feature'][sub_feature[0]]["color"], pageno: 1 };


      this.current_summary_state_event.emit(this.current_summary_state)


      if (this.isOpenCompare) {
        this.openComparision('compare')
      }

      this.Summary_tab = true

    },
    (err: HttpErrorResponse) => {
      if (err.status == 401) {
        this.toastr.error("Login time expired. Please login again.")
        this.gotologin()
      }
    })
  }
  // end cadastrial map

  // map Comparison start
  // Function for opening comparison page

  public openComparision(id: string) {
    var shareComponent_visibility = sessionStorage.getItem("shareComponent")
    if (shareComponent_visibility == "open") {
      this.dialog.closeAll();
    }
    let e = document.getElementById(id);

    if (this.isOpenCompare) {
      this.dialogRef.close();
      this.isOpenCompare = false;
      e.style.width = '0px';
    } else {
      this.isOpenCompare = true;
      this.dialogRef = this.dialog.open(ComparisionComponent, {
        height: "calc(100%)",
        width: "calc(100%)",
        maxWidth: "100%",
        maxHeight: "100%"
      });
      e.style.width = '5px';
      this.closeSidebar('summarySidebar')

    }

    this.dialogRef.afterClosed().subscribe(result => {
      this.dialog.closeAll();
      e.style.width = '0px';
    });

  }
  // Function for tab change event

  public onTabChange(event: any) {
    switch (event.index) {
      case 0:
        break;
    }
  }
  // map Comparison end

  // Function for going to dashboard page

  public gotodashboard() {
    var shareComponent_visibility = sessionStorage.getItem("shareComponent")
    if (shareComponent_visibility == "open") {
      this.dialog.closeAll();
    }
    if (this.isOpenCompare) {
      this.openComparision('compare')
    }
    this.router.navigate(['app/home'])
  }

  // Function for going to shared project list page
  public openSharedialog(id: string) {
    if (this.isOpenCompare) {
      this.openComparision('compare')
    }

    if (this.Summary_tab == true) {
      this.closeSidebar('summarySidebar')

    }
    var proj_name = localStorage.getItem('proj_name');

    for (var j = 0; j < this.project_values.length; j++) {
      if (this.project_values[j]["name"] == proj_name) {

        this.share_project = this.project_values[j]["id"]
      }
    }
    let e = document.getElementById(id);

    var shareComponent_visibility = sessionStorage.getItem("shareComponent")
    if (shareComponent_visibility == "close") {
      e.style.width = '5px';

      localStorage.setItem("id", this.share_project);
      localStorage.setItem("project_name", proj_name);

      let dialogRef = this.dialog.open(ShareComponent);
      dialogRef.afterClosed().subscribe(result => {
        localStorage.removeItem("id")
        localStorage.removeItem("project_name");
        sessionStorage.setItem("shareComponent", "close");
        e.style.width = '0px';
        // this.Summary_tab = false;

      })

    } else {
      e.style.width = '0px';
      sessionStorage.setItem("shareComponent", "close");
      this.dialog.closeAll();
    }


  }


  // Function for going to analytics page
  public gotoAnalytics() {
    var shareComponent_visibility = sessionStorage.getItem("shareComponent")
    if (shareComponent_visibility == "open") {
      this.dialog.closeAll();
    }
    if (this.isOpenCompare) {
      this.openComparision('compare')
    }
    this.router.navigate(['app/analytics'])
  }

  // Function for going to all projects page
  public gotoAllprojects() {
    var shareComponent_visibility = sessionStorage.getItem("shareComponent")
    if (shareComponent_visibility == "open") {
      this.dialog.closeAll();
    }
    if (this.isOpenCompare) {
      this.openComparision('compare')
    }
    this.router.navigate(['/app/project/all'])

  }

  // Function for Capture screenshot
  public captureButton() {
    localStorage.setItem("capture", "capture")
    this._http.setscreenshotmap({
      screenshotdata: "capture"
    });
    // let element = document.querySelector("#capture");
    // html2canvas(document).then(function(canvas) {
    //     // Convert the canvas to blob
    //     canvas.toBlob(function(blob){
    //         // To download directly on browser default 'downloads' location
    //         let link = document.createElement("a");
    //         link.download = "image.png";
    //         link.href = URL.createObjectURL(blob);
    //         link.click();

    //         // To save manually somewhere in file explorer
    //         window.saveAs(blob, 'image.png');

    //     },'image/png');
    // });
  }

  gotologin(){
    this.router.navigate(['auth/login'])
   }
  // Function for Report download
  downloadMyFile(report_path) {
    var report_path_new = sessionStorage.getItem("reportPath")
    if (report_path_new != null) {
      report_path = report_path_new
      sessionStorage.removeItem("reportPath");
    } else {
      report_path = report_path
    }

    if (report_path != null) {
      const link = document.createElement('a');
      // link.setAttribute('target', '_blank');
      link.href = report_path;
      // link.setAttribute('download', `products.csv`);
      document.body.appendChild(link);
      link.click();
      link.remove();

    } else {
      alert("There is no report for current project")
    }



  }

}
