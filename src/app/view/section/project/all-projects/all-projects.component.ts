import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { MatDialog } from '@angular/material/dialog';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { DialogExampleComponent } from 'src/app/dialog-example/dialog-example.component';
import { ShareComponent } from 'src/app/view/layout/share/share.component';
import { DialogContentComponent } from 'src/app/dialog-content/dialog-content.component';
import { HttpService } from "../../../map-section/services-map/http.service";
import { Router } from '@angular/router';
import { $, element } from 'protractor';
import { DatePipe } from '@angular/common'
import { environment } from '../../../../../environments/environment';
import { FormControl } from '@angular/forms';
import { NgxUiLoaderService } from "ngx-ui-loader";

@Component({
  selector: 'app-all-projects',
  templateUrl: './all-projects.component.html',
  styleUrls: ['./all-projects.component.css']
})
export class AllProjectsComponent implements OnInit {

  @ViewChild("myNameElem") myNameElem!: ElementRef;
  // p: number = 1;
  data = [];
  resourcesLoaded: boolean = false;

  public main_data: any;
  public main_data_asset: any;
  project_id_summary: any;
  project_id_summary_asset: any;
  project_name: any;
  public status: any;
  project_city: any;
  public Date_value: any;
  public selectedDateStatus: any;
  public Date_value_length: any;
  public Current_date: any;
  public Current_date_status: any;
  i!: number;
  public project_id_summary_val: any;
  project_keys: any;
  project_values: any;
  project_values_copy: any;
  project_values_Inprogress: any;
  project_values_Completed: any;
  Current_date_status_Inprogress: any;
  public first_value: any;
  public Current_date_statusval: any;
  style: any;
  Inprogress_Date_values: any;
  Current_date_status_Completed: any;
  Current_date_status_Yettostart: any;
  Completed_Date_values: any;
  Completed_Date_values_status: any;
  changed_date: any;
  datepipe: any;
  month!: number;
  public newdate_to_add: any;
  postId: any;
  Created_Date_values: any;
  Created_Date_values_status: any;
  project_values_Created: any;
  public new_project_values: any;
  proj_name_length: any;
  public tab_name: any;
  public all_project: any;
  public all_project_copy: any;
  firstvalue: any;
  user_id: any;
  All_project_Categorywise: any = [];
  project_count: any;
  project_category: any = [];
  project_category_copy: any = [];
  project_category_asset: any = [];

  project_list: any = [];
  project_list_asset: any = [];
  tabGroup!: { _tabHeader: { _elementRef: { nativeElement: { children: any; }; }; }; };
  project_list_asset_copy: any= [];


  constructor(private _http: HttpService, private http: HttpClient, public dialog: MatDialog, private ngxService: NgxUiLoaderService, private router: Router) {
    // this.ngxService.start();
  }

  openDialogg() {
    const dialogRef = this.dialog.open(DialogContentComponent);

    dialogRef.afterClosed().subscribe(result => {
      // console.log(`Dialog result: ${result}`);
    });
  }
  openSharedialog(project_name : any, id: any) {
    localStorage.setItem("project_id", id)
    localStorage.setItem("project_name", project_name);

    let dialogRef = this.dialog.open(ShareComponent);
    dialogRef.afterClosed().subscribe(result => {
      localStorage.removeItem("id")
      localStorage.removeItem("project_name");
    })
  }
  openDialog(project_name: any) {
    let dialogRef = this.dialog.open(DialogExampleComponent);
    dialogRef.afterClosed().subscribe(result => {
      var newdate = result
      if (newdate != "false") {
        // alert()

        var d = new Date(newdate),
          month = '' + (d.getMonth() + 1),
          day = '' + d.getDate(),
          year = d.getFullYear();

        if ((d.getMonth() + 1) < 10) {
          month = "0" + month
        } else if ((d.getMonth() + 1) >= 9) {
          month = month
        }
        if ((d.getDate()) < 10) {
          day = "0" + day
        } else if ((d.getDate()) >= 9) {
          day = day
        }
        this.newdate_to_add = year + "-" + month + "-" + day;
        console.log(project_name + 'Date: ' + this.newdate_to_add)
        var post_url = environment.api_name + "project/add_new_date/" + project_name + "/" + this.newdate_to_add
        // console.log(post_url)
        const newtoken = localStorage.getItem("token");

        // const headers = { 'Authorization': 'token '+newtoken}
        var httpOptions = {


          headers: { 'Authorization': 'token ' + newtoken }
        };
        this.http.post(post_url, httpOptions).subscribe(data => {
          this.postId = data;
          // location.reload();
          this.onloadfunc()

        })
      }

    });

  }
  ngOnInit(): void {
    this.resourcesLoaded = false;
    this.user_id = localStorage.getItem("user_id");

    var proj_name = ""
    this.status = 'All Project'
    this.tab_name = 'Thermography'

    this.onloadfunc()
    this._http.setNewMapIcon({
      dateval: "allproject"
    });
  }

  onloadfunc() {
    const newtoken = localStorage.getItem("token");

    const headers = { 'Authorization': 'Bearer ' + newtoken }

    this.all_project = [];
    this.all_project_copy = [];
    this.project_values = [];
    this.project_values_copy = [];
    this.project_values_Inprogress = [];
    this.project_values_Completed = [];
    this.project_values_Created = [];
    this.Inprogress_Date_values = [];
    this.Completed_Date_values = [];
    this.Created_Date_values = [];
    this.Completed_Date_values_status = [];
    this.Created_Date_values_status = [];
    this.new_project_values = [];

    fetch(environment.api_name + 'api/project/get_project_by_category', { headers })
      // fetch(environment.api_name + 'api/project/get_all/'+this.user_id+'/?filter={"count":""}', { headers })
      .then(response => response.json())
      .then(datavalue => {
        this.main_data = datavalue['data']
        console.log(this.main_data)
        this.project_id_summary = Object.keys(this.main_data)
        // console.log(this.project_id_summary)


        for (let index = 0; index < this.project_id_summary.length; index++) {
          // console.log(this.main_data[this.project_id_summary[index]])
          this.main_data[this.project_id_summary[index]]
          // for (let m = 0; m < this.main_data[this.project_id_summary[index]].length; m++) {
          //   this.main_data[this.project_id_summary[index]][m]["product"] = "Carnot"
          // }
          if (this.main_data[this.project_id_summary[index]].length > 0) {
            this.project_category.push((this.project_id_summary[index]))
            this.project_category_copy.push((this.project_id_summary[index]))
          }

        }

      })
      // console.log(this.project_category)

    fetch(environment.api_name + 'api/asset/get_asset_project_by_category', { headers })
    // fetch(environment.api_name + 'api/project/get_all/'+this.user_id+'/?filter={"count":""}', { headers })
    .then(response => response.json())
    .then(datavalue => {
      this.main_data_asset = datavalue['data']
      console.log(this.main_data_asset)
      var site_img = null
      var date_status = {}
      var get_date
      var temp_date
      var temp_date_status
      var lat = null
      var long = null
      var type_status = {}
      var asset_key = Object.keys(this.main_data_asset)
      asset_key.forEach(element => {
        if (element == "construction") {
          site_img = '../../../../../assets/images/construction.jpg'
        } else if (element == "solar") {
          site_img = '../../../../../assets/images/solar.jpg'

        }
        if (this.main_data_asset[element].length > 0) {
          for (let index = 0; index < this.main_data_asset[element].length; index++) {
            // const element = array[index];
            var demo_project = this.main_data_asset[element][index].name.includes("DEMO")
            if (demo_project) {
              var share_project_status = "close"
              // alert(this.i)
            } else {
              var share_project_status = "share"

            }
            get_date = Object.keys(this.main_data_asset[element][index]['projectdata'])
            this.main_data_asset[element][index]['projectdata']
            get_date.forEach(element_date => {
              var type = Object.keys(this.main_data_asset[element][index]['projectdata'][element_date])
              type.forEach(element_type => {
                // alert(element_type)
                type_status[element_type] = this.main_data_asset[element][index]['projectdata'][element_date][element_type]['status']
                type_status['Report'] = this.main_data_asset[element][index]['projectdata'][element_date][element_type]['project_properties']['Report']
                if(lat == null){
                  lat = this.main_data_asset[element][index]['projectdata'][element_date][element_type]['project_properties']['center']['lat']
                  long = this.main_data_asset[element][index]['projectdata'][element_date][element_type]['project_properties']['center']['lng']
                  // console.log(this.main_data_asset[element][index]['projectdata'][element_date][element_type]['project_properties']['center']['lat'])

                }
              });

              date_status[element_date] =  type_status
              type_status = {}
            });
            
            var center = lat+","+long
            temp_date = (Object.keys(date_status))
            temp_date_status = (Object.values(date_status))
            // console.log(date_status);
            // console.log(temp_date_status);
            // console.log(temp_date_status[0]['Report']);
            // console.log(temp_date_status[0]['SCQM']);
            
            this.main_data_asset[element][index]["share_project"] = share_project_status
            this.main_data_asset[element][index]['site_img'] = site_img
            this.main_data_asset[element][index]['project_name'] = this.main_data_asset[element][index]['name']
            this.main_data_asset[element][index]["Date"] = temp_date
            this.main_data_asset[element][index]["current_date"] = temp_date[0]
            this.main_data_asset[element][index]["status"] = temp_date_status
            this.main_data_asset[element][index]["center"] = center
            this.main_data_asset[element][index]["current_date_status_SCPM"] = temp_date_status[0]['SCPM']
            this.main_data_asset[element][index]["current_date_status_SCQM"] = temp_date_status[0]['SCQM']
            // this.main_data_asset[element][index]["report_path"] = temp_date_status
            this.main_data_asset[element][index]["current_reportpath"] = temp_date_status[0]['Report']
            date_status = []
            var temp_date = null 
            var temp_date_status = null
            var lat: string | null = null
            var long = null
            // temp_date_status = []
            // temp_date_status = []
            this.project_list_asset.push(this.main_data_asset[element][index])
           
            // console.log(this.main_data_asset[element][index])

          }
        }
      });
      console.log(this.project_list_asset)


      this.project_id_summary_asset = Object.keys(this.main_data_asset)

      this.category_project(this.project_category[0])


    })
  }

  category_project_asset(category: any) {

    // this.project_list_asset = this.project_list_asset_copy

  }

  category_project(category: string | number) {

    console.log(this.main_data[category])
    this.project_list = this.main_data[category]
    this.project_list.forEach((element: { [x: string]: any; date_status: any; processed_data: { [x: string]: { report_path: any; }; }; name: string | string[]; }, index: string | number) => {

      var temp_date: any[] = []
      var temp_date_status = []
      var temp_report_path: any[] = []
      var date_status = element.date_status

      temp_date = (Object.keys(date_status))
      temp_date_status = (Object.values(date_status))
      // console.log(element.processed_data)
      temp_date.forEach((processed_data_for_dates, iter) => {
        temp_report_path.push(element.processed_data[temp_date[iter]].report_path)
      })


      var demo_project = element.name.includes("DEMO PROJECT")
      var Adani_project = element.name.includes("Adani")

      if (Adani_project) {
        var project_name_for_adani: any = element['name']
        var selected_project_name = project_name_for_adani.split("-", 2)
        this.project_list[index]['project_name'] = selected_project_name[0]
        this.project_list[index]['plant_city'] = selected_project_name[0]
        // alert(this.project_name)
        this.project_list[index]['plant_capacity_data'] = 61.41

      } else {
        this.project_list[index]['project_name'] = element['name']
        this.project_list[index]['plant_capacity_data'] = element['plant_capacity']
        this.project_list[index]['plant_city'] = element['city']
      }
      if (demo_project) {
        var share_project_status = "close"
        // alert(this.i)
      } else {
        var share_project_status = "share"

      }
      this.project_list[index]["share_project"] = share_project_status
      this.project_list[index]["Date"] = temp_date
      this.project_list[index]["current_date"] = temp_date[0]
      this.project_list[index]["status"] = temp_date_status
      this.project_list[index]["current_date_status"] = temp_date_status[0]
      this.project_list[index]["report_path"] = temp_report_path
      this.project_list[index]["current_reportpath"] = temp_report_path[0]
    });
    // console.log(this.project_list)

  }



  status_based_get_project(status: string) {
    this.resourcesLoaded = false;

    this.status = status
    var tab_name = this.tab_name
    // alert(tab_name + "------")
    if (status == 'All Project') {
      var Thermography_project = this.all_project.filter(function (hero: { category: string; }) {

        return hero.category.toLowerCase().includes(tab_name.toLowerCase());
      });
      this.project_values = Thermography_project
      this.project_values_copy = Thermography_project

    } else if (status == 'FTP') {
      var Thermography_project = this.all_project.filter(function (hero: { current_date_status: string; category: string; }) {
        if (hero.current_date_status == 'ftp' || hero.current_date_status == 'processing') {
          status = hero.current_date_status
          // console.log(status + "------" + hero.current_date_status);

        }
        return hero.category.toLowerCase().includes(tab_name.toLowerCase()) && hero.current_date_status.toLowerCase().includes(status.toLowerCase());
      });
      this.project_values = Thermography_project
      this.project_values_copy = Thermography_project
      // console.log(this.project_values)
    } else if (status == 'Created') {
      var Thermography_project = this.all_project.filter(function (hero: { category: string; current_date_status: string; }) {

        return hero.category.toLowerCase().includes(tab_name.toLowerCase()) && hero.current_date_status.toLowerCase().includes(status.toLowerCase());
      });
      this.project_values = Thermography_project
      this.project_values_copy = Thermography_project
      // console.log(this.project_values)
    } else if (status == 'Completed') {
      var Thermography_project = this.all_project.filter(function (hero: { category: string; current_date_status: string; }) {

        return hero.category.toLowerCase().includes(tab_name.toLowerCase()) && hero.current_date_status.toLowerCase().includes(status.toLowerCase());
      });
      this.project_values = Thermography_project
      this.project_values_copy = Thermography_project
      // console.log(this.project_values)
    }
    // console.log(this.project_values)

    this.resourcesLoaded = false;

  }

  load_invDiv(proj_name: string) {
    // console.log(proj_name.length)
    // console.log(this.project_values)
    if (proj_name.length > 2) {
      if (proj_name.length >= this.proj_name_length || this.proj_name_length == undefined) {
        var marvelHeroes = this.project_values.filter(function (hero: { name: string; }) {
          return hero.name.toLowerCase().includes(proj_name.toLowerCase());
        });
        // console.log(marvelHeroes)
        this.project_values = marvelHeroes
        this.proj_name_length = proj_name.length
      } else if (proj_name.length < this.proj_name_length) {

        this.project_values = this.project_values_copy
        var marvelHeroes = this.project_values.filter(function (hero: { name: string; }) {
          return hero.name.toLowerCase().includes(proj_name.toLowerCase());
        });
        this.proj_name_length = proj_name.length
        // console.log(marvelHeroes)
        this.project_values = marvelHeroes
      }
    } else {
      this.project_values = this.project_values_copy

    }


  }
  selectDateInprogress(date_inprogress: string, l: string, name_Inprogress: any) {

    var div = document.getElementById('date_inprogress_' + l);
    div!.innerHTML = date_inprogress;

  }
  selectedMapdate(date: string, name: string, i: { zoom_level: any; center: string; }, proj_id: string, project_type: string) {

    var zoom_level = i.zoom_level
    localStorage.setItem("name", name);
    localStorage.setItem("center", i.center);
    localStorage.setItem("date", date);
    sessionStorage.setItem("zoom_level", zoom_level);
    localStorage.setItem("project_id", proj_id);
    localStorage.setItem("project_type", project_type);

    this._http.setChangedCompletedDate({
      dateval: date
    });
    if(project_type == "carnot"){
      this.router.navigate(['/map'])

    }else{
      this.router.navigate(['/Assetmap'])

    }

  }
  selectedanalyticsdate(date: string, name: string, i: { zoom_level: any; center: string; }, proj_id: string, project_type: string) {
    // alert(date)
    var zoom_level = i.zoom_level
    localStorage.setItem("name", name);
    localStorage.setItem("center", i.center);
    localStorage.setItem("date", date);
    sessionStorage.setItem("zoom_level", zoom_level);
    localStorage.setItem("project_id", proj_id);
    localStorage.setItem("project_type", project_type);

    // localStorage.setItem("date", date);
    this._http.setChangedCompletedDate({
      dateval: date
    });
    this.router.navigate(['/app/analytics'])

  }

  downloadMyFile(report_path: string) {
    // alert(report_path)
    // return
    const link = document.createElement('a');
    // link.setAttribute('target', '_blank');
    link.href = report_path;
    // link.setAttribute('download', `products.csv`);
    document.body.appendChild(link);
    link.click();
    link.remove();
  }

  selectChange(date: string, proj_count_id: any, status: any, date_count_id: any, report_path: any) {
    // alert(status)
    this.first_value = 1
    var color = "";
    this.Current_date_statusval = status
    this.project_list[proj_count_id]['current_reportpath'] = report_path
    this.project_list[proj_count_id]['current_date_status'] = status
    this.project_list[proj_count_id]['current_date'] = date

    // this.Current_date = date
    // alert(this.Current_date_statusval)
    var style = "";
    if (this.Current_date_statusval == 'created') {
      this.Current_date_status = "Yet to start"
      style = "none";
      color = "red"

    } else if (this.Current_date_statusval == 'ftp' || this.Current_date_statusval == 'processing') {
      this.Current_date_status = "In Progress"
      style = "none"
      color = "yellow"
    } else {
      this.Current_date_status = "Completed"
      style = "block"
      color = "green"
    }
    // // console.log("style", style)
    this.changed_date = date
    var div = document.getElementById('date_' + proj_count_id);
    div!.innerHTML = date;
    var statusdiv = document.getElementById('status_' + proj_count_id);
    statusdiv!.innerHTML = this.Current_date_status;
    // var formElement = document.getElementById("WhenOnchange_" + proj_count_id);
    // formElement.style.display = style;
    var formElement = document.getElementById("bgcolor" + proj_count_id);
    formElement!.style.backgroundColor = color;
    // var formElement = document.getElementById("Map_" + proj_count_id);
    // console.log(formElement)
    // console.log(formElement.style)
    // console.log(formElement.style.display)
    // formElement.style.display = "none";

    this._http.setChangedCompletedDate({
      dateval: date
    });



    // // console.log(div)

  }

  selectChange_asset(date: string, proj_count_id: any, status: any, date_count_id: any, i: any) {
    // alert(status)
    console.log(i['status'][date_count_id]);
    
    this.first_value = 1
    var colorSCPM = "";
    var colorSCQM = "";
    var Current_date_statusSCPM = "";
    var Current_date_statusSCQM = "";
    this.Current_date_statusval = status
    this.project_list_asset[proj_count_id]['current_reportpath'] = i['status'][date_count_id]['Report']['COMMON']
    this.project_list_asset[proj_count_id]['current_date_status_SCPM'] = status.SCPM
    this.project_list_asset[proj_count_id]['current_date_status_SCQM'] = status.SCQM
    this.project_list_asset[proj_count_id]['current_date'] = date

    // this.Current_date = date
    // alert(this.Current_date_statusval)
    var Current_date_statusval_SCQM = status.SCQM
    var Current_date_statusval_SCPM = status.SCPM
    var style = "";
    if (Current_date_statusval_SCPM == 'Incomplete' ) {
      Current_date_statusSCPM = "Yet to start"
      style = "none";
      colorSCPM = "red"

    }else if (Current_date_statusval_SCPM == 'FTP' || Current_date_statusval_SCPM == 'Orthomosaic') {
      Current_date_statusSCPM = "In Progress"
      style = "none"
      colorSCPM = "yellow"
    
    } else if (Current_date_statusval_SCPM == 'Complete'){
      Current_date_statusSCPM = "Complete"
      style = "block"
      colorSCPM = "green"
    
    }
    if(Current_date_statusval_SCQM == 'Incomplete') {
      Current_date_statusSCQM = "Yet to start"
      style = "none";
      colorSCQM = "red"

    } else if (Current_date_statusval_SCQM == 'FTP' || Current_date_statusval_SCQM == 'Orthomosaic') {
      Current_date_statusSCQM = "In Progress"
      style = "none"
      colorSCQM = "yellow"
    
    } else if(Current_date_statusval_SCQM == 'Complete'){
        Current_date_statusSCQM = "Complete"
        style = "block"
        colorSCQM = "green"
    }
    
    // // console.log("style", style)

    this.changed_date = date
    var div = document.getElementById('date_' + proj_count_id);
    div!.innerHTML = date;
    var statusdiv1 = document.getElementById('statusSCPM_' + proj_count_id);
    statusdiv1!.innerHTML = Current_date_statusSCPM;
    var statusdiv2 = document.getElementById('statusSCQM_' + proj_count_id);
    statusdiv2!.innerHTML = Current_date_statusSCQM;
    // var formElement = document.getElementById("WhenOnchange_" + proj_count_id);
    // formElement.style.display = style;
    var formElement1 = document.getElementById("bgcolorSCPM" + proj_count_id);
    formElement1!.style.backgroundColor = colorSCPM;
    var formElement2 = document.getElementById("bgcolorSCQM" + proj_count_id);
    formElement2!.style.backgroundColor = colorSCQM;
    // var formElement = document.getElementById("Map_" + proj_count_id);
    // console.log(formElement)
    // console.log(formElement.style)
    // console.log(formElement.style.display)
    // formElement.style.display = "none";

    // this._http.setChangedCompletedDate({
    //   dateval: date
    // });



    // // console.log(div)

  }

  selectedUploadPage(current_date: string, project_id: string, proj_name: string) {
    localStorage.setItem("project_id", project_id);
    localStorage.setItem("date", current_date);
    localStorage.setItem("proj_name", proj_name);
    this.router.navigate(["/app/project/upload"])
  }

  tabClick(tab) {

    var d = tab["tab"]["textLabel"]
    this.tab_name = tab["tab"]["textLabel"]
    d = d.toLocaleLowerCase()
    if (d == "construction monitoring" || d == "Construction Monitoring") {
      this.category_project_asset(d)

    } else {
      this.category_project(d)

    }
  }
  scrollTabs(event: any) {
    const children = this.tabGroup._tabHeader._elementRef.nativeElement.children;
    const back = children[0];
    const forward = children[2];
    if (event.deltaY > 0) {
      forward.click();
    } else {
      back.click();
    }
  }


}


