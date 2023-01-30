import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Component, OnInit, EventEmitter, Input } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
//import * as EXIF from 'exif-js';
//import * as ExifReader from 'exifreader';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { NgxUiLoaderService } from "ngx-ui-loader";
// import RNFS from 'react-native-fs';
import { decode } from 'base64-arraybuffer';
import { environment } from 'src/environments/environment';
import { ParseLocation } from '@angular/compiler';
//import exifr from 'exifr'

@Component({
  selector: 'app-upload',
  templateUrl: './upload.component.html',
  styleUrls: ['./upload.component.css']
})
export class UploadComponent implements OnInit {
  @Input() defect_event: EventEmitter<any> = new EventEmitter<any>();
  public Form: FormGroup;
  files: any = [];
  files_data: any = [];
  fileInfo: string = '';
  status: string = '';
  statusval: string = '';
  status1: string = '';
  upload_File: any = [];
  upload_additional_file: any = [];
  mission_count_val: number | undefined;
  flight_count_val: number | undefined;
  public res: { [key: string]: any };
  lat_long: any = [];
  all_files: any = [];
  projname: any;
  success: string = '';
  image_type: any = 'RGB';
  image_type_value: any = [];
  module_type: any;
  project_type: any;



  constructor(private http: HttpClient, private toastr: ToastrService, private ngxService: NgxUiLoaderService) {
    this.Form = new FormGroup({
      // mail: new FormControl('', [Validators.required, Validators.email,Validators.pattern('^[a-z0-9._%+-]+@gmail+\\.[a-z]{2,4}$')]),
      // mail: new FormControl('', [Validators.required, Validators.email,Validators.pattern('^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$')])
      image: new FormControl('', Validators.required),
      Mission: new FormControl('', Validators.required),
      Flight: new FormControl('', Validators.required)


    });
  }

  ngOnInit(): void {
    this.project_type = sessionStorage.getItem("project_type")
    this.projname = localStorage.getItem("proj_name")
  }


  onSelectFile(event: any) {
    // if (event.target.files && event.target.files[0]) {
    if (event.target.files.length > 0) {
      var filesAmount = event.target.files.length;
      for (let i = 0; i < filesAmount; i++) {
        var reader = new FileReader();
        // // // console.log(event.target);
        // // // console.log(event.target.files[0].name);

        reader.onload = (events: any) => {
          var base64 = events.target.result
          // // // console.log(events.target);


          this.files_data.push({
            "filename": event.target.files[i].name,
            "module": this.statusval,
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
      // // // console.log(this.fileInfo )
    }
  }

  async onChange(event: any) {
    // const input: HTMLInputElement = event.target as any;
    // const file: Blob = input.files[0];
    // // console.log(file)
    // // console.log(event.target.files.length);
    var filesAmount = event.target.files.length;
    for (let i = 0; i < filesAmount; i++) {
      // // console.log(i);

      var reader = new FileReader();

      // // console.log(event.target.files[i])

      // reader.onload = (events: any) => {
      // // console.log(event.target.files)
      //let { latitude, longitude } = await exifr.gps(event.target.files[i])
      // let latitude =  exifr.gps(event.target.files[i])
      // let longitude =  exifr.gps(event.target.files[i])
      // // console.log(latitude)
     // this.lat_long.push({
      //  "latitude": latitude,
      //  "longitude": longitude
      //})


      // }
    }
    // console.log(this.lat_long)
  }


  onSelect_AdditionalFile(event) {
    // // console.log();
    if (event.target.files.length > 0) {
      this.toastr.info('Please Wait!!!  Data is getting ready for upload.');
      this.ngxService.start();

      var filesAmount = event.target.files.length;
      for (let i = 0; i < filesAmount; i++) {


        var reader = new FileReader();


        reader.onload = (events: any) => {
          var base64 = events.target.result
          this.files_data.push({
            "filename": event.target.files[i].name,
            "size": event.target.files[i].size,
            "url": base64.split("base64,")[1],
            "mimetype": event.target.files[i].type,
            "extension": event.target.files[i].name.split(".")[1]
          });
        }

        reader.readAsDataURL(event.target.files[i]);

      }
      setTimeout(() => {
        this.ngxService.stop();
        this.toastr.success('Data is ready for upload.');

      }, 40000)

      const file = event.target.files;
      this.fileInfo = `${file.name}`;


      // console.log(this.files_data);
    }
    var submit = (<HTMLInputElement>document.getElementById("submit"))
    submit.disabled = false
  }

  selectChange(stat: any) {
    // // // console.log(stat)
    var file = document.getElementById('file')
    file!.style.display = "block";
    var cardd = document.getElementById('cardd')
    cardd!.style.height = "231px";
    var file_format = document.getElementById('file_format')
    var file_upload_format = document.getElementById('file_upload_format')
    // alert(stat)
    this.statusval = stat.value
    if (this.statusval == "Images") {
      file_format!.innerText = "accepted file format .jpg,.png";
      // file_upload_format['accept'] = ".jpg,.png";
    } else if (this.statusval == "Orthomosaic") {
      file_format!.innerText = "accepted file format .tif,.tiff";
      // file_upload_format['accept'] = ".tif,.tiff";
    } else if (this.statusval == "CAD") {
      file_format!.innerText = "accepted file format .dwg,.dxl";
      // file_upload_format['accept'] = ".dwg,.dxl";
    } else if (this.statusval == "Point cloud") {
      file_format!.innerText = "accepted file format .las,.xyz";
      // file_upload_format['accept'] = ".las,.xyz";
    } else if (this.statusval == "GPC") {
      file_format!.innerText = "accepted file format .xls,.csv";
      // file_upload_format['accept'] = ".xls,.csv";
    }


  }

  selectChange_aditional_file_type() {
    var file = document.getElementById('image_type')
    file!.style.display = "block";
    var cardd = document.getElementById('cardd')
    cardd!.style.height = "280px";

    this.image_type_value = ['RGB', 'Thermal']
  }
  selectChange_aditional(image) {
    if (image.value == "Thermal") {
      this.module_type = 'thermal_raw_images'
    } else if (image.value == "RGB") {
      this.module_type = 'raw_images'
    }
    // alert(this.module_type)
    // // // console.log(document.getElementById('file_format'))
    var file = document.getElementById('file')
    file!.style.display = "block";
    var cardd = document.getElementById('cardd')
    cardd!.style.height = "420px";
    var file_format = document.getElementById('file_format')
    var file_upload_format = document.getElementById('file_upload_format')

    file_format!.innerText = "accepted file format .jpg,.png";
    // file_upload_format['accept'] = ".jpg,.png";


  }
  uploadFiles() {
    var project_id = localStorage.getItem("project_id")
    this.project_type = sessionStorage.getItem("project_type")
    var date = localStorage.getItem("date")
    var token = localStorage.getItem("token")
    this.ngxService.start();

    var user_data = {
      "project": project_id,
      "project_type": this.project_type,
      "date": date,
      "files": this.files_data
    }
    // // console.log(user_data)
    var post_url = environment.api_name + "ftp/asset_upload/"

    const newtoken = localStorage.getItem("token");

    var httpOptions = {
        headers: new HttpHeaders({
            'Content-Type':  'application/json',
            'Authorization': 'Bearer ' + newtoken,
          }),
        withCredentials: false,
     };

    this.http.post(post_url, user_data, httpOptions).subscribe(data => {
      // this.postId = data;
      // // console.log(data)

      this.success = data['status']


      if (this.success == 'success') {
        setTimeout(() => {
          this.ngxService.stop();
        }, 1000)
        this.files_data = []
        this.toastr.success('Data Added Successfully');
        this.show_data(data["data"])
        // this.upload_File.push(data["data"])

      } else if (this.success == 'failed') {
        setTimeout(() => {
          this.ngxService.stop();
        }, 100)
      }
    })

  }
  uploadAdditionalFiles() {
    var submit = (<HTMLInputElement>document.getElementById("submit"))
    submit.disabled = true
    var project_id = localStorage.getItem("project_id")
    var date = localStorage.getItem("date")
    var token = localStorage.getItem("token")
    var mission_count = (<HTMLInputElement>document.getElementById("mission_count")).value
    var flight_count = (<HTMLInputElement>document.getElementById("flight_count")).value
    // alert(flight_count)
    if (mission_count == null || mission_count == "") {
      alert("please enter Mission number")
      submit.disabled = false
      return
    }
    if (flight_count == null || flight_count == "") {
      alert("please enter Flight number")
      submit.disabled = false
      return
    }
    this.ngxService.start();

    this.files_data.forEach((element, index) => {
      // // console.log(this.lat_long)
      element['latitude'] = (this.lat_long[index]['latitude']).toString()
      element['longitude'] = (this.lat_long[index]['longitude']).toString()
    });
    let a = this.files_data.length;
    let b = 0;

    if (this.files_data.length > 99) {
      b = 100
    } else {
      b = 1
    }
    let quo = ~~(a / b);
    let rem = a % b;
    let z = 0;
    let arr = []
    for (let iter = 0; iter < quo; iter++) {

      if (iter == 0) {
        for (let j = 0; j < b; j++) {
          // // console.log(j);
          arr.push(this.files_data[j])
        }
      } else {
        z = iter + 1
        for (let j = (iter * 100); j < (z * 100); j++) {
          arr.push(this.files_data[j])
        }
      }

      var user_data = {
        "project": project_id,
        "date": date,
        "mission": "M" + mission_count,
        "flight": "F" + flight_count,
        'project_type': this.project_type,
        'module': this.module_type,
        "files": arr
      }
      this.all_files.push([user_data])
      arr = []
    }
    var j = 1;
    if (rem > 0) {
      for (let iter = (quo * 100); iter < (quo * 100 + rem); iter++) {

        arr.push(this.files_data[iter])
        if (j == rem - 1) {
          var user_data = {
            "project": project_id,
            "date": date,
            "mission": "M" + mission_count,
            "flight": "F" + flight_count,
            'module': this.module_type,
            'project_type': this.project_type,
            "files": arr
          }
        }
        j++
      }
      this.all_files.push([user_data])
    }
    this.post_additional_file_data()

    arr = []
    // console.log(this.all_files)

  }

  async post_additional_file_data() {
    var token = localStorage.getItem("token")
    // var post_url = environment.api_name + "api/project/thermal_assets/"
    var post_url = "http://localhost:8000/carnot/api/project/thermal_assets/"

    const newtoken = localStorage.getItem("token");

    var httpOptions = {
        headers: new HttpHeaders({
            'Content-Type':  'application/json',
            'Authorization': 'Bearer ' + newtoken,
          }),
        withCredentials: false,
     };

    // console.log(post_url)
    await Promise.all(
      this.all_files.map(async (id, index) => {
        // // console.log(id[0])
        return new Promise((resolve) => {
          this.http.post(post_url, id[0], httpOptions).subscribe(async data => {
            // this.postId = data;
            return new Promise(async (response_status) => {
              // // console.log(data)

              let success = await data["status"]


              if (success == 'success') {
                // // console.log(index + "-----" + (this.all_files.length - 1))

                if (index == this.all_files.length - 1) {
                  setTimeout(() => {
                    this.ngxService.stop();
                    this.toastr.success('Data Updated successfully.');
                    this.files_data = []
                    let mission_count = (<HTMLInputElement>document.getElementById("mission_count"))
                    mission_count.value = "0"
                    let flight_count = (<HTMLInputElement>document.getElementById("flight_count"))
                    flight_count.value = "0"
                  }, 50000)
                } else {
                  this.toastr.info('Data is still uploading. Please wait... Do not refresh the page');
                }


              } else if (success == 'failed') {
                setTimeout(() => {
                  this.ngxService.stop();
                }, 100)
              }
            })
          })
        })
      })
    )

  }

  // post_balance_additional_file_data(user_data, project_id, date) {
  //   var token = localStorage.getItem("token")
  //   var post_url = environment.api_name + "project/thermal_assets/"
  //   var httpOptions = {
  //     headers: { 'Authorization': 'Bearer ' + token }
  //   };

  //   this.http.post(post_url, user_data, httpOptions).subscribe(data => {
  //     // this.postId = data;
  //     // // console.log(data)

  //     var success = data["status"]


  //     if (success == 'success') {
  //       setTimeout(() => {
  //         this.ngxService.stop();
  //         this.toastr.success('Data Updated successfully.');

  //       }, 20000)
  //       this.files_data = []
  //       this.show_additional_file_data(project_id, date)
  //       // this.upload_File.push(data["data"])

  //     }
  //   })
  // }
  show_additional_file_data(project_id: any, date: any) {

    const token = localStorage.getItem("token");
    const headers = {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json',
    };

    var url = environment.api_name + 'api/project/get_thermal_assets/' + project_id + '/' + date + '/' + this.project_type
    fetch(url, { headers })
      .then(response => response.json())
      .then(datavalue => {
        var main_data = datavalue['data']
        // // console.log(main_data)
        main_data.forEach((element) => {
          // // // console.log()
          var date = new Date(element['created_at'])
          // // console element['crea']
          var year = date.getFullYear();
          var month = date.getMonth() + 1;
          var dt = date.getDate();

          element['created_date'] = dt + "-" + month + "-" + year
        });
        this.upload_additional_file = main_data

        // // console.log(this.upload_additional_file)
      })

  }
  show_data(data: any[]) {
    // foreach
    data.forEach((element: { [x: string]: string; }) => {
      // // // console.log()
      var date = new Date(element['created_at'])
      // // console element['crea']
      var year = date.getFullYear();
      var month = date.getMonth() + 1;
      var dt = date.getDate();

      element['created_date'] = dt + "-" + month + "-" + year
    });

    this.upload_File.push(data)

  }
  tabClick(tab) {
    // alert(tab)

    const d = tab["tab"]["textLabel"]
    if (d == "Images Upload") {
      var project_id = localStorage.getItem("project_id")
      var date = localStorage.getItem("date")
      this.show_additional_file_data(project_id, date)

    }
    // alert(d)
  }
}


