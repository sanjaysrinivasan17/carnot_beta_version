import { Component, OnInit, ViewChild, Output, EventEmitter, Input } from '@angular/core';
import { HttpService } from '../services-map/http.service'
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from '../../../../environments/environment';
import { ToastrService } from 'ngx-toastr';
import { Defects, DefectsC } from './defects';
import { MatDialog } from '@angular/material/dialog';
import { ImageviewerComponent } from '../imageviewer/imageviewer.component';
import { mapsection, mapsectionC } from '../map-section';
@Component({
  selector: 'defectrectification',
  templateUrl: './defectrectification.component.html',
  styleUrls: ['./defectrectification.component.css']
})
export class DefectrectificationComponent implements OnInit {
  public Form: FormGroup;
  defect_rectify_visibility: any;
  defect_data: any;
  defect_data_copy: any;
  status: any;
  @Input() defect_event: EventEmitter<any> = new EventEmitter<any>();
  isMultiple: any;
  sanitizer: any;
  files: any[];
  files_data = [];
  base64image_split: any[] = [];
  fileInfo: string;
  updated_defect: any[] = [];
  public defects_arr: Defects[] = []
  listuser: any[] = [];
  sort_data: any;
  sort_val: any;
  defectType: any[] = [];

  constructor(private _http: HttpService, public dialog: MatDialog, private http: HttpClient, private toastr: ToastrService, private _formBuilder: FormBuilder) {

    this.Form = new FormGroup({
      // mail: new FormControl('', [Validators.required, Validators.email,Validators.pattern('^[a-z0-9._%+-]+@gmail+\\.[a-z]{2,4}$')]),
      // mail: new FormControl('', [Validators.required, Validators.email,Validators.pattern('^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$')])
      assignee: new FormControl('', Validators.required),
      date: new FormControl('', Validators.required),
      status: new FormControl('', Validators.required),
      image: new FormControl('', Validators.required)


    });

  }

  ngOnInit(): void {
    let selectedProducts = this._http.getrectify_data();
    this.defect_data = selectedProducts['Total_Defects']
    this.defect_data.forEach((element, index) => {
      this.defect_data[index]["Defect_status"] = 'old'
      this.defects_arr.push(new DefectsC());
    });
    this.defect_data_copy = this.defect_data
    let project_date = localStorage.getItem('date');
    let defect_type = sessionStorage.getItem('defect');
    let sub_defect = sessionStorage.getItem('sub_defect_pg');
    sub_defect.replace(' ', "_");
    this.updated_rectified_defect(project_date, defect_type, sub_defect)
  }



  onSelectFile(event, k) {
    // // console.log(event);

    // if (event.target.files && event.target.files[0]) {
    var filesAmount = event.target.files.length;
    for (let i = 0; i < filesAmount; i++) {
      var reader = new FileReader();
      // // console.log(event.target.files);
      // // console.log(event.target.files[0].name);

      reader.onload = (events: any) => {
        var base64 = events.target.result

        this.files_data.push({
          "filename": event.target.files[i].name,
          "module": "defects",
          "size": event.target.files[i].size,
          "url": base64.split("base64,")[1],
          "mimetype": event.target.files[i].type,
          "extension": event.target.files[i].name.split(".")[1]
        });
      }

      reader.readAsDataURL(event.target.files[i]);
    }
    // }
    const file = event.target.files;
    this.fileInfo = `${file.name}`;
  }

  Defect_rectified_data(k) {

    this.defects_arr[k].assigned_to = (<HTMLInputElement>document.getElementById("assignee_" + k)).value
    this.defects_arr[k].assigned_date = (<HTMLInputElement>document.getElementById("date_" + k)).value
    this.defects_arr[k].status = ((<HTMLInputElement>document.getElementById("status_" + k)).innerText).split("\t")[0]
    this.defects_arr[k].table_no = (<HTMLInputElement>document.getElementById("Table_no_" + k)).innerText
    this.defects_arr[k].module_no = (<HTMLInputElement>document.getElementById("Module_No_" + k)).innerText
    this.defects_arr[k].sub_defect_type = (<HTMLInputElement>document.getElementById("Defect_" + k)).innerText
    this.defects_arr[k].files = this.files_data


    var project_id = sessionStorage.getItem("project_id")
    // var post_url = environment.api_name + "carnot/project/project_defect/" + project_id;
    var post_url = environment.api_name + "project/project_defect/";

    const newtoken = localStorage.getItem("token");

    const project = localStorage.getItem("name");
    let project_date = localStorage.getItem("date");
    if (this.defects_arr[k].sub_defect_type == 'Dirt' || this.defects_arr[k].sub_defect_type == 'Multicell_Hotspot' || this.defects_arr[k].sub_defect_type == 'Hotspot' || this.defects_arr[k].sub_defect_type == 'Bypass_Diode Issues' || this.defects_arr[k].sub_defect_type == 'Others') {
      var defect_type = "Hotspot"
    } else if (this.defects_arr[k].sub_defect_type == 'Panel_Failure' || this.defects_arr[k].sub_defect_type == 'Open_String Tables' || this.defects_arr[k].sub_defect_type == 'Uniform_Panel Heating') {
      var defect_type = "Panel Failure"
    } else if (this.defects_arr[k].sub_defect_type == 'Short_Circuit') {
      var defect_type = "Short Circuit"
    } else if (this.defects_arr[k].sub_defect_type == 'Open_Circuit') {
      var defect_type = "Open Circuit"
    } else if (this.defects_arr[k].sub_defect_type == 'PID') {
      var defect_type = "PID"
    }
    this.defects_arr[k].defect_type = defect_type;

    var userdata = {
      "project": project_id,
      "table_no": this.defects_arr[k].table_no,
      "inverter_no": "",
      "project_date": project_date,
      "module_no": this.defects_arr[k].module_no,
      "defect_type": this.defects_arr[k].defect_type,
      "sub_defect_type": this.defects_arr[k].sub_defect_type,
      "assigned_date": this.defects_arr[k].assigned_date,
      "status": this.defects_arr[k].status,
      "assigned_by": newtoken,
      "assigned_to": this.defects_arr[k].assigned_to,
      "files": this.defects_arr[k].files
    }

    // console.log(userdata)
    var httpOptions = {
      headers: { 'Authorization': 'token ' + newtoken }
    };
    this.files_data = []
    this.http.post(post_url, userdata, httpOptions).subscribe(data => {
      // this.postId = data;
      // console.log(data)

      var success = data["status"]

      // alert(this.success)

      if (success == 'success') {
        // this.files_data= []
        this.toastr.success('Data Added Successfully');
        this.updated_rectified_defect(project_date, defect_type, this.defects_arr[k].sub_defect_type)
        // location.reload();
      }
    })
    // // this.updated_rectified_defect(project_date, defect_type, this.defects_arr[k].defect_type)

  }
  updated_rectified_defect(date, defect, sub_defect) {
    let defect_temp = []
    let Assign_to_temp = []
    let Assigned_date_temp = []
    let Status_temp = []
    this.defectType = []
    var project_id = sessionStorage.getItem("project_id")
    const newtoken = localStorage.getItem("token");
    if (sub_defect == null) {
      sub_defect = ""
    }
    const headers = { 'Authorization': 'token ' + newtoken }
    var url = environment.api_name + 'project/get_defects/' + project_id + '?filter={"date":"' + date + '","defect_type":"' + defect + '","sub_defect_type":"' + sub_defect + '"}'
// console.log(url)
    fetch(url, { headers })
      .then(response => response.json())
      .then(datavalue => {
        var main_data = datavalue['data']

        datavalue['data'].forEach((element, index) => {

          this.defects_arr[index].table_no = element['table_no'];
          this.defects_arr[index].assigned_by = localStorage.getItem("token");
          this.defects_arr[index].module_no = element['module_no'];
          this.defects_arr[index].assigned_to = element['assigned_to'];
          this.defects_arr[index].defect_type = element['defect_type'];
          this.defects_arr[index].sub_defect_type = element['sub_defect_type'];
          this.defects_arr[index].updated_at = (element['updated_at']);
          this.defects_arr[index].assigned_date = element['assigned_date'];
          this.defects_arr[index].status = element['status'];
          this.defects_arr[index].files = element['files'];
          this.defects_arr[index].id = element['id'];
          // this.updated_defect.push({ "table_no": main_data[index]['table_no'], "module_no": main_data[index]['module_no'], "assigned_to": main_data[index]['assigned_to'], "timestamp": main_data[index]['updated_at'], "Defect": main_data[index]['sub_defect_type'], "assigned_date": main_data[index]['assigned_date'], "status": main_data[index]['status'], "files": main_data[index]['files'] })
        });

        this.defect_data.forEach((element, index) => {
          // if (!this.defectType['Defect'].contains(element['Defect'])) {
          //   this.defectType.push({"Defect":element['Defect']});
          // }
          // // console.log(element);
          // return


          // if (!this.defectType['Defect'].contains(element['Defect'])) {
          //   this.defectType.push({'Defect':element['Defect']});
          // }
          // if (this.defectType['Defect'].index(element['Defect']) === -1) {
          //   this.defectType.push({ 'Defect': element['Defect'] })
          //   return true
          // }
          // // console.log(this.defectType["Defect"])
          // // console.log(element["Defect"])

          // this.defectType.push({"Defect":element['Defect']})

          if (element['Defect_status'] == 'old') {
            var marvelHeroes = this.defects_arr.filter(function (hero) {
              // // console.log(hero['table_no'])
              if (hero['table_no'] == element['Table_No'] && hero['module_no'] == element['Module_No']) {
                element['Defect_status'] = 'new'
                element['assigned_to'] = hero['assigned_to']

                // // console.log(hero['updated_at'])

                var date = new Date(hero['updated_at']);
                var year = date.getFullYear();
                var month = date.getMonth() + 1;
                var dt = date.getDate();
                // // console.log(dt + "-" + month + "-" + year)
                element['timestamp'] = dt + "-" + month + "-" + year
                element['assigned_date'] = hero['assigned_date']
                element['status'] = hero['status']
                element['files'] = hero['files']
                element['id'] = hero['id']
                // // console.log(element)
              }

              // return hero.name.toLowerCase().includes(main_data[index]['table_no'].toLowerCase());
            });
          }
          if (!defect_temp.includes(element["Defect"])) {
            defect_temp.push(element["Defect"])
          }
          if (!Assign_to_temp.includes(element["assigned_to"])) {
            // console.log(element["assigned_to"])
            if (element["assigned_to"] !== '') {
              Assign_to_temp.push(element["assigned_to"])

            }
          }
          if (!Assigned_date_temp.includes(element["assigned_date"])) {
            // console.log(element["assigned_date"])
            if (element["assigned_date"] !== '') {
              Assigned_date_temp.push(element["assigned_date"])
            }
          }
          if (!Status_temp.includes(element["status"])) {
            // // console.log(element["status"])
            if (element["status"] !== '') {
              Status_temp.push(element["status"])
            }
          }
        });

        defect_temp = defect_temp.concat("All")
        const index = Assign_to_temp.indexOf('' || undefined);

        if (index !== -1) {
          Assign_to_temp[index] = '(blank)';
          Assign_to_temp = Assign_to_temp.concat("All")
        }

        const index1 = Assigned_date_temp.indexOf('' || undefined);

        if (index1 !== -1) {
          Assigned_date_temp[index1] = '(blank)';
          Assigned_date_temp = Assigned_date_temp.concat("All")
        }

        const index2 = Status_temp.indexOf('' || undefined);

        if (index2 !== -1) {
          Status_temp[index2] = '(blank)';
          Status_temp = Status_temp.concat("All")
        }
        this.defectType.push({ "Defect": defect_temp, "Assign_to": Assign_to_temp, "Assigned_date": Assigned_date_temp, "Status": Status_temp })
        // console.log(this.defectType)
        // // console.log(this.defect_data)

      })
    this.defect_data_copy = this.defect_data


  }
  selectChange(param, col_name) {
    // alert(param + '==' + col_name)
    if (param == "All") {
      var total_defect_data = this.defect_data_copy
    } else {

      // // console.log(col_name)
      var total_defect_data = this.defect_data_copy.filter(function (hero) {

        if (param != undefined) {
          // // console.log("if");

          // // console.log("--------"+hero[col_name]+"--------"+param+"--------")
          if (col_name == "Defect") {
            // // console.log("if1");

            return hero[col_name].toLowerCase().includes(param.toLowerCase());

          } else {
            // // console.log("else1");

            if (hero[col_name] !== undefined  && param != "(blank)") {
              // console.log("if2");
              return hero[col_name].toLowerCase().includes(param.toLowerCase());

            } else if(param == "(blank)") {
              // console.log("else2");
              return hero['Defect_status'].toLowerCase().includes("old");

            }

          }
        } else {
          // // console.log("else");

          // // console.log(hero['Defect_status'])
          var total_defect_data = this.defect_data_copy
        }
        // // console.log(total_defect_data)
        // return hero.category.toLowerCase().includes(this.tab_name.toLowerCase());
      });
    }
    this.defect_data = total_defect_data
  }
  edit_line_item(index) {
    // alert(index)
    this.defect_data[index]['Defect_status'] = 'edit'

  }
  cancel_line_item(index) {
    // alert(index)
    this.defect_data[index]['Defect_status'] = 'new'

  }
  change_status(index, status) {
    // alert(status)
    this.defects_arr[index].status = status
    // this.defect_data[index]['status'] = status
  }
  delete_line_item(index) {
    if (confirm("Are you sure to delete this record")) {
      var delete_url = environment.api_name + "project/get_defects/" + this.defect_data[index]['id'];

      const newtoken = localStorage.getItem("token");

      var httpOptions = {
        headers: { 'Authorization': 'token ' + newtoken }
      };
      this.http.delete(delete_url, httpOptions).subscribe(data => {
        // this.postId = data;

        var success = data["status"]

        // alert(this.success)

        if (success == 'success') {
          this.toastr.success('Line deleted successfully');
          // this.defect_data[index]['Defect_status'] = 'old'
          this.defect_data = []
          this.defects_arr = []
          // // console.log(this.defect_data)
          this.ngOnInit()
        }
      })
    }

  }
  Defect_rectified_update(index) {
    // alert("status_" + index+"======"+(<HTMLInputElement>document.getElementById("status_" + index)))
    // // console.log((<HTMLInputElement>document.getElementById("status_" + index)));
    if ((<HTMLInputElement>document.getElementById("date_" + index)).value == null || (<HTMLInputElement>document.getElementById("date_" + index)).value == "") {
      alert("please fill the updated date")
      return
    }

    this.defects_arr[index].assigned_to = (<HTMLInputElement>document.getElementById("assignee_" + index)).value
    this.defects_arr[index].assigned_date = (<HTMLInputElement>document.getElementById("date_" + index)).value
    this.defects_arr[index].table_no = (<HTMLInputElement>document.getElementById("Table_no_" + index)).innerText
    this.defects_arr[index].module_no = (<HTMLInputElement>document.getElementById("Module_No_" + index)).innerText
    this.defects_arr[index].sub_defect_type = (<HTMLInputElement>document.getElementById("Defect_" + index)).innerText
    this.defects_arr[index].files = this.files_data
    var project_id = sessionStorage.getItem("project_id")
    // var post_url = environment.api_name + "carnot/project/project_defect/" + project_id;
    var put_url = environment.api_name + "project/get_defects/" + this.defect_data[index]['id'];
    // // console.log(post_url)
    const newtoken = localStorage.getItem("token");
    const project = localStorage.getItem("name");
    let project_date = localStorage.getItem("date");

    if (this.defects_arr[index].sub_defect_type == 'Dirt' || this.defects_arr[index].sub_defect_type == 'Multicell_Hotspot' || this.defects_arr[index].sub_defect_type == 'Hotspot' || this.defects_arr[index].sub_defect_type == 'Bypass_Diode Issues') {
      var defect_type = "Hotspot"
    } else if (this.defects_arr[index].sub_defect_type == 'Panel_Failure' || this.defects_arr[index].sub_defect_type == 'Open_String Tables' || this.defects_arr[index].sub_defect_type == 'Uniform_Panel Heating') {
      var defect_type = "Panel Failure"
    } else if (this.defects_arr[index].sub_defect_type == 'Short_Circuit') {
      var defect_type = "Short Circuit"
    } else if (this.defects_arr[index].sub_defect_type == 'Open_Circuit') {
      var defect_type = "Open Circuit"
    } else if (this.defects_arr[index].sub_defect_type == 'PID') {
      var defect_type = "PID"
    }
    this.defects_arr[index].defect_type = defect_type
    var userdata = {
      "id": this.defect_data[index]['id'],
      "project": project_id,
      "table_no": this.defects_arr[index].table_no,
      "inverter_no": "",
      "project_date": project_date,
      "module_no": this.defects_arr[index].module_no,
      "defect_type": this.defects_arr[index].defect_type,
      "sub_defect_type": this.defects_arr[index].sub_defect_type,
      "assigned_date": this.defects_arr[index].assigned_date,
      "status": this.defects_arr[index].status,
      "assigned_by": newtoken,
      "assigned_to": this.defects_arr[index].assigned_to,
      "files": this.files_data
    }

    // // console.log(userdata)

    var httpOptions = {
      headers: { 'Authorization': 'token ' + newtoken }
    };
    this.files_data = []
    this.http.put(put_url, userdata, httpOptions).subscribe(data => {
      // this.postId = data;

      var success = data["status"]

      // alert(this.success)

      if (success == 'success') {
        // this.files_data= []
        this.toastr.success('Data Updated Successfully');
        this.defect_data = []
        this.defects_arr = []
        // // console.log(this.defect_data)
        this.ngOnInit()

        // this.updated_rectified_defect(project_date,defect_type, Defect.innerHTML)
        // location.reload();
      }
    })
  }
  image_click(files) {
    // console.log(files)
    this._http.setfiles(files)
    // const dialogRef = this.dialog.open(ImageviewerComponent, { panelClass: 'my-full-screen-dialog' });

    // dialogRef.afterClosed().subscribe(result => {
    //   // sessionStorage.removeItem('sub_defect_pg')
    //   // sessionStorage.removeItem('defect')
    //   // // console.log(`Dialog result: ${result}`);
    // });
    // const dialogRef = this.dialog.open(ImageviewerComponent, { panelClass: 'my-full-screen-dialog' });
    const dialogRef = this.dialog.open(ImageviewerComponent);

    dialogRef.afterClosed().subscribe(result => {
      // sessionStorage.removeItem('sub_defect_pg')
      // sessionStorage.removeItem('defect')
      // // console.log(`Dialog result: ${result}`);
    });
  }
  addRow(index) {
    // alert("inside"+index)
    this.listuser.push(index + 1)

  }

  // sort(col_name) {
  //   // alert(this.sort_data)
  //   if (this.sort_data == undefined) {
  //     this.defect_data.sort(this.GetSortOrder_asc(col_name));
  //     this.sort_data = "data";
  //     // // console.log(this.defect_data);

  //   } else {

  //     if (this.sort_val == "Ascending") {
  //       this.defect_data.sort(this.GetSortOrder_asc(col_name));
  //       this.sort_val = "Descending"
  //       // alert("if")
  //       // // console.log(this.defect_data);

  //     } else {
  //       this.defect_data.sort(this.GetSortOrder_desc(col_name));
  //       this.sort_val = "Ascending"
  //       // // console.log(this.defect_data);

  //       // alert("else")
  //     }
  //   }

  // this.defect_data = 
  // // console.log(this.defect_data[col_name])
  // // console.log(this.defect_data[col_name].sort())
  // }

  // GetSortOrder_asc(prop) {
  //   return function (a, b) {
  //     if (a[prop] > b[prop]) {
  //       return 1;
  //     } else if (a[prop] < b[prop]) {
  //       return -1;
  //     }
  //     return 0;
  //   }
  // }
  // GetSortOrder_desc(prop) {
  //   return function (a, b) {
  //     if (b[prop] > a[prop]) {
  //       return 1;
  //     } else if (b[prop] < a[prop]) {
  //       return -1;
  //     }
  //     return 0;
  //   }
  // }


}
