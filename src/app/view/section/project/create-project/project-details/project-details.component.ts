import {
  Component,
  EventEmitter,
  OnInit,
  Input,
  ViewChild,
  ElementRef,
  Output,
} from "@angular/core";
import { FormControl, FormControlName, FormGroup } from "@angular/forms";
import { DomSanitizer, SafeUrl } from "@angular/platform-browser";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Country, State, City } from "country-state-city";
import { Router } from "@angular/router";
import { HttpService } from "../../../../map-section/services-map/http.service";
import { environment } from "../../../../../../environments/environment";

@Component({
  selector: "project-step-details",
  templateUrl: "./project-details.component.html",
  styleUrls: ["./project-details.component.css"],
})
export class ProjectDetailsComponent implements OnInit {
  @Input()
  mode: any;
  @Input()
  names: any;
  @Input()
  url: any;
  @Input()
  method: any;
  @Input()
  multiple: any;
  @Input()
  disabled: any;
  @Input()
  accept: any;
  @Input()
  maxFileSize: any;
  @Input()
  auto = true;
  @Input()
  withCredentials: any;
  @Input()
  invalidFileSizeMessageSummary: any;
  @Input()
  invalidFileSizeMessageDetail: any;
  @Input()
  invalidFileTypeMessageSummary: any;
  @Input()
  invalidFileTypeMessageDetail: any;
  @Input()
  previewWidth: any;
  @Input()
  chooseLabel = "Choose";
  @Input()
  uploadLabel = "Upload";
  @Input()
  cancelLabel = "Cancel";
  @Input()
  customUpload: any;
  @Input()
  showUploadButton: any;
  @Input()
  showCancelButton: any;

  @Input()
  dataUriPrefix: any;
  @Input()
  deleteButtonLabel: any;
  @Input()
  deleteButtonIcon = "close";
  @Input()
  showUploadInfo: any;

  fileUpload!: ElementRef;

  inputFileName: string = "";

  @Input()
  files: File[] = [];

  @Output() stepperEvent: EventEmitter<number> = new EventEmitter();

  moduletype: any;
  tabletype: any;
  invertertype: any;
  country_name: any;
  state_name: any;
  city_name: any;
  postId: any;
  public countries: any;
  public cities: any;
  public states: any;
  country_data: any;
  states_data: any;
  cities_data: any;
  public countryval_data: any;
  ngxService: any;
  public success: any;

  constructor(
    private _http: HttpService,
    private sanitizer: DomSanitizer,
    private router: Router,
    private http: HttpClient
  ) {}

  ngOnInit(): void {
    this.countries = Country.getAllCountries();
    this.states = State.getAllStates();
    this.cities = City.getAllCities();
    this.country_data = this.countries;
    this._http.setNewMapIcon({
      dateval: "create",
    });
    // // console.log(this.states[0])
    // // console.log(this.countries[0])
    // // alert(this.countries)
    // // console.log(this.cities[0])
  }
  selectChange(countryval: any) {
    // alert("inside"+countryval)
    // // console.log(this.states)
    // alert(this.states.length)
    for (var i = 0; i < this.countries.length; i++) {
      if (this.countries[i]["isoCode"] == countryval) {
        var country_name = this.countries[i]["name"];
        this.country(country_name);
      }
    }
    this.states_data = [];
    for (var i = 0; i < this.states.length; i++) {
      if (this.states[i]["countryCode"] == countryval) {
        var cou = this.states[i].length;
        this.states_data.push(this.states[i]);
        // // // console.log(this.states_data)
      }
    }
    this.countryval_data = countryval;
    // alert("inside" + cou)
    // this.country_data = this.countries
  }

  selectState(stateval: any) {
    // alert(stateval+"-----"+this.countryval_data)
    // alert(stateval)
    for (var i = 0; i < this.states_data.length; i++) {
      if (this.states_data[i]["isoCode"] == stateval) {
        // // console.log(this.states_data[i]["name"])

        var state_name_val = this.states_data[i]["name"];
        this.state(state_name_val);
      }
    }
    this.cities_data = [];
    for (var i = 0; i < this.cities.length; i++) {
      if (
        this.cities[i]["stateCode"] == stateval &&
        this.cities[i]["countryCode"] == this.countryval_data
      ) {
        this.cities_data.push(this.cities[i]);
        // // // console.log(this.cities_data)
      }
    }
  }

  selectCity(cityval: any) {
    // alert(cityval)
  }
  onClick(event: any) {
    if (this.fileUpload) this.fileUpload.nativeElement.click();
  }

  onInput(event: any) {}

  onFileSelected(event: any) {
    let files = event.dataTransfer
      ? event.dataTransfer.files
      : event.target.files;
    // // console.log('event::::::', event)
    for (let i = 0; i < files.length; i++) {
      let file = files[i];

      //if(!this.isFileSelected(file)){
      if (this.validate(file)) {
        //      if(this.isImage(file)) {
        file.objectURL = this.sanitizer.bypassSecurityTrustUrl(
          window.URL.createObjectURL(files[i])
        );
        // // console.log(file.objectURL.changingThisBreaksApplicationSecurity)
        //      }
        if (!this.isMultiple()) {
          this.files = [];
        }
        this.files.push(files[i]);
        // console.log(this.files)
        //  }
      }
      //}
    }
  }
  removeFile(file: any) {
    let ix;
    if (this.files && -1 !== (ix = this.files.indexOf(file))) {
      this.files.splice(ix, 1);
      this.clearInputElement();
    }
  }

  validate(file: File) {
    for (const f of this.files) {
      if (
        f.name === file.name &&
        f.lastModified === file.lastModified &&
        f.size === f.size &&
        f.type === f.type
      ) {
        return false;
      }
    }
    return true;
  }

  clearInputElement() {
    this.fileUpload.nativeElement.value = "";
  }

  isMultiple(): boolean {
    return this.multiple;
  }

  module(value: any) {
    this.moduletype = value;
  }
  table(value: any) {
    this.tabletype = value;
  }
  inverter(value: any) {
    this.invertertype = value;
  }
  country(value: any) {
    this.country_name = value;
  }
  state(value: any) {
    this.state_name = value;
  }
  city(value: any) {
    this.city_name = value;
  }

  next(
    prject_name: any,
    plant_size: any,
    plant_capacity: any,
    date: any,
    decription: any
  ) {
    this.stepperEvent.emit(1);
    var create_project_data = {
      "Project Name": prject_name,
      "plant size": plant_size,
      "plant capacity": plant_capacity,
      date: date,
      decription: decription,
      Module: this.moduletype,
      table: this.tabletype,
      inverter: this.invertertype,
      country: this.country_name,
      state: this.state_name,
      city: this.city_name,
    };
    // // console.log(create_project_data)
  }

  create_new_Project(
    prject_name: any,
    plant_size: any,
    plant_capacity: any,
    date: any,
    decription: any
  ) {
    var d = new Date(date),
      month = "" + (d.getMonth() + 1),
      day = "" + d.getDate(),
      year = d.getFullYear();

    if (d.getMonth() + 1 < 10) {
      month = "0" + month;
    } else if (d.getMonth() + 1 >= 9) {
      month = month;
    }
    if (d.getDate() < 10) {
      day = "0" + day;
    } else if (d.getDate() >= 9) {
      day = day;
    }
    date = year + "-" + month + "-" + day;
    var create_new_Project_data = {
      name: prject_name,
      plant_size: plant_size,
      plant_capacity: plant_capacity,
      date: date,
      description: decription,
      Module: this.moduletype,
      table: this.tabletype,
      inverter: this.invertertype,
      country: this.country_name,
      state: this.state_name,
      city: this.city_name,
    };

    // return // console.log(create_new_Project_data)
    const body = JSON.stringify(create_new_Project_data);
    // console.log(body)

    const newtoken = localStorage.getItem("token");

    var httpOptions = {
      headers: new HttpHeaders({
        "Content-Type": "application/json",
        Authorization: "Bearer " + newtoken,
      }),
      withCredentials: false,
    };

    this.http
      .post(environment.api_name + "project/create_project/", body, httpOptions)
      .subscribe((data) => {
        this.postId = data;
        // // console.log(data)
        this.success = data["status"];

        // alert(this.success)

        if (this.success == "success") {
          setTimeout(() => {
            this.ngxService.stop();
          }, 2100);
          this.router.navigate(["app/home"]);
        }
      });
  }

  // {
  //   "name": "PD_Testing_AT",
  //   "plant_size": "50 MW",
  //   "description": "Thermal INSPECTION",
  //   "city": "Chennai",
  //   "state": "TN",
  //   "country": "IN",
  //   "date":"2021-04-29"
  // }
}
