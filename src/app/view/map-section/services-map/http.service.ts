import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http'
import { of, Observable, BehaviorSubject } from 'rxjs';
// import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { environment } from '../../../../environments/environment';

@Injectable({
  providedIn: 'root'
})




export class HttpService {

  private messageSource = new BehaviorSubject<any>("default message");
  currentMessage = this.messageSource.asObservable();

  public popup: Observable<any>
  // newDate: any;
  private newDate = new BehaviorSubject<any>({
    date: '2021-11-01'
  });
  private close_side_bar = new BehaviorSubject<any>({
    close_side_bar: 'summarySidebar'
  });
  private newDatefromanalytics = new BehaviorSubject<any>({
    date: '2021-11-01'
  });

  private newDatefromAllProjects = new BehaviorSubject<any>({
    date: '2021-11-01'
  });

  private newscreenshotmap = new BehaviorSubject<any>({
    date: 'Capture'
  });
  private newAoI = new BehaviorSubject<any>({
    AOI: 'Capture'
  });
  private NewMapIcon = new BehaviorSubject<any>({
    mapicon: 'Analytics'
  });
  private projname = new BehaviorSubject<any>({
    projnameval: 'Adani'
  });
  private visibility = new BehaviorSubject<any>({
    visibility_val: 'visible'
  });
  private NewAdduser = new BehaviorSubject<any>({
    NewAdduserval: []
  });

  private newgradinggraph = new BehaviorSubject<any>({
    newgradinggraph_val: 'visible'
  });

  private defect_table_no = new BehaviorSubject<any>({
    Table_no: ''
  });
  total_rectify_data: any[] = [];
  files: any[] = [];
  mission_val: any[] = [];
  set_mision_flight_data: any[] = []

  constructor(private http: HttpClient) { }

  summary_data() {
    // const newName = localStorage.getItem("name");
    const project_id = localStorage.getItem("project_id");

    const newtoken = localStorage.getItem("token");
    // alert(newtoken)
    const headers = { 'Authorization': 'Bearer ' + newtoken }
    // return this.http.get(environment.api_name + 'api/project/get_project/' + project_id, { headers })
    return this.http.get(environment.api_name + 'api/project/get_project/' + project_id, { headers })
    // return this.http.get(environment.api_name+'project/retrieve_project_data/hero')
  }
  inverter_data() {
    const newName = localStorage.getItem("name");
    const newtoken = localStorage.getItem("token");
    const project_id = localStorage.getItem("project_id");
    // alert(newtoken)
    const headers = { 'Authorization': 'Bearer ' + newtoken }
    // const headers = { 'Authorization': 'token 9881e95800afe06c804e6ea3417591cfcaa50164'}
    return this.http.get(environment.api_name + 'api/project/get_project/' + project_id, { headers })
  }

  get_popup_data() {
    this.popup = of(localStorage.getItem('kml_popup_node'))
    return this.popup
  }
  setAreaofinterest(AoI: any) {
    // alert("----sanjayaasadasdasdasd-------"+date)
    this.newAoI.next(AoI);

  }
  setNewUserInfo(date: any) {
    // alert("----sanjayaasadasdasdasd-------"+date)
    this.newDate.next(date);

  }
  setdefect_table_no(table_no: any) {
    // alert("----sanjayaasadasdasdasd-------"+date)
    this.defect_table_no.next(table_no);

  }
  setgradingtable(tableno: any) {
    this.newgradinggraph.next(tableno);

  }
  setclosesidebar(close_side_bar: any) {
    // alert("----sanjayaasadasdasdasd-------"+date)
    this.close_side_bar.next(close_side_bar);

  }
  setNewdateanalyticsInfo(date: any) {
    // alert("----sanjayaasadasdasdasd-------"+date)
    this.newDatefromanalytics.next(date);

  }
  setNewMapIcon(Analytics: any) {
    // alert("----sanjayaasadasdasdasd-------"+date)
    this.NewMapIcon.next(Analytics);

  }
  setproject_name(projname: any) {
    // alert("----sanjayaasadasdasdasd-------"+date)
    this.projname.next(projname);

  }

  setNewadduser(fname) {
    // alert("----sanjayaasadasdasdasd-------"+date)
    this.NewAdduser.next(fname);

  }

  setsubdefects(visibility) {
    // return this.visibility.next(visibility);
    this.visibility.next(visibility);

  }

  setChangedCompletedDate(date: any) {
    this.newDatefromAllProjects.next(date);

  }

  setscreenshotmap(screenshotvalue: any) {
    this.newscreenshotmap.next(screenshotvalue);

  }
  setrectify_data(rectify_data) {
    this.total_rectify_data = rectify_data
  }
  setfiles(files) {
    this.files = files

  }
  setmissiondata(data) {
    this.mission_val = data

  }
  set_mision_flight_detail(data) {
    this.set_mision_flight_data = data

  }
  getproject_name() {
    // // console.log("----sanjayaasadasdasdasd-------"+this.newDate)
    return this.projname.asObservable();
  }
  getgradingtable() {
    return this.newgradinggraph.asObservable();

  }
  getAreaofinterest() {
    // // console.log("----sanjayaasadasdasdasd-------"+this.newDate)
    return this.newAoI.asObservable();
  }
  getNewUserInfo() {
    // // console.log("----sanjayaasadasdasdasd-------"+this.newDate)
    return this.newDate.asObservable();
  }
  getclosesidebar() {
    // // console.log("----sanjayaasadasdasdasd-------"+this.newDate)
    return this.close_side_bar.asObservable();
  }
  getNewdateanalyticsInfo() {
    // // console.log("----sanjayaasadasdasdasd-------"+this.newDate)
    return this.newDatefromanalytics.asObservable();
  }
  getNewMapIcon() {
    // // console.log("----sanjayaasadasdasdasd-------"+this.newDate)
    return this.NewMapIcon.asObservable();
  }
  getNewadduser() {
    // // console.log("----sanjayaasadasdasdasd-------"+this.newDate)
    return this.NewAdduser.asObservable();
  }
  getChangedCompletedDate() {
    // // console.log("----sanjayaasadasdasdasd-------"+this.newDate)
    return this.newDatefromAllProjects.asObservable();
  }
  getscreenshotmap() {
    // // console.log("----sanjayaasadasdasdasd-------"+this.newDate)
    return this.newscreenshotmap.asObservable();
  }
  getsubdefects() {
    // // console.log("----sanjayaasadasdasdasd-------"+this.newDate)
    return this.visibility.asObservable();
  }
  getdefect_table_no() {
    // alert("----sanjayaasadasdasdasd-------"+date)
    return this.defect_table_no.asObservable();

  }
  getrectify_data() {
    return this.total_rectify_data
  }
  getfiles() {
    return this.files
  }
  getmissiondata() {
    return this.mission_val
  }
  get_mision_flight_detail() {
    return this.set_mision_flight_data
  }
}
