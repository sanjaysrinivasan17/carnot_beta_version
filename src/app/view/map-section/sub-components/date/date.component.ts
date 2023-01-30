import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../../../environments/environment';

interface date {
  value: string;
  viewValue: string;
}
@Component({
  selector: 'app-date',
  templateUrl: './date.component.html',
  styleUrls: ['./date.component.css']
})
export class DateComponent implements OnInit {


  public inv_main_data: any;
  public main_data: any;
  public project_id_summary: any;
  public project_id_inv: any;
  public date_inv: any;
  public projectProject_layer_inv_id_inv: any;
  project_layer_inv_data = [];
  project_layer_inv_lable = [];
  Project_data = [];
  public Project_layer_inv: any;
  Hotspot_inv = [];
  ShortCircit_inv = [];
  Open_Circuit_inv = [];
  pannel_inv = [];
  Pid = [];
  inver_wise_data = [];
  inver_wise_lable= [];

  inver_wise_def_lable:any;
  inver_wise_def_hot:any;
  inver_wise_def_sc:any;
  inver_wise_def_os:any;
  inver_wise_def_pf:any;
  inver_wise_def_pid:any;

  date: any;

  total_Count=[];

  data = [];
  constructor(private http: HttpClient) { }

  ngOnInit(): void {


    // const headers = { 'Authorization': 'token 9881e95800afe06c804e6ea3417591cfcaa50164'}
    // this.http.get<any>(environment.api_name+'project/retrieve_project_data/hero', { headers }).subscribe(data => {
    //   this.inv_main_data = data;
    //   console.log(this.inv_main_data)
    //   this.project_id_inv = Object.keys(this.inv_main_data)
    //   this.date_inv = Object.values(this.inv_main_data[this.project_id_inv])[2]
      
    // })



  }
  // ViewMenu(date){
  //   // alert("inside"+date)


  //   const headers = { 'Authorization': 'token 9881e95800afe06c804e6ea3417591cfcaa50164'}
  //   this.http.get<any>(environment.api_name+'project/retrieve_project_data/hero', { headers }).subscribe(data => {
  //     this.inv_main_data = data
  //     // console.log(this.inv_main_data[1])

  //     this.project_id_inv = Object.keys(data)
  //     // console.log("second---"+this.project_id_inv)
  //     this.Project_data = data[1][date]['summary_data']

  //     this.Project_layer_inv = Object.keys(data[this.project_id_inv][date]['summary_data']
  //     )
  //     // console.log("third---"+this.Project_layer_inv)
      
  //     // console.log("sanjay values fourth-----"+Object.values(data[this.project_id_inv][date]['summary_data']['Hotspot']))
  //     console.log(this.Project_layer_inv.length,"sanjay values fifth-----",data[1][date]['summary_data'])


  //     for (var i = 0; i < this.Project_layer_inv.length; i++) {
        
  //       console.log("sanjay values---"+this.Project_data['Hotspot']['Count'])
  //       this.Hotspot_inv.push(Object.values(this.inv_main_data[this.project_id_inv][date]['summary_data']['Hotspot']['Count']))
  //       this.ShortCircit_inv.push(Object.values(this.inv_main_data[this.project_id_inv][date]['summary_data']['Short Circuit']['Count']))
  //       this.Open_Circuit_inv.push(Object.values(this.inv_main_data[this.project_id_inv][date]['summary_data']['Open Circuit']['Count']))
  //       this.pannel_inv.push(Object.values(this.inv_main_data[this.project_id_inv][date]['summary_data']['Panel Failure']['Count']))
  //       this.Pid.push(Object.values(this.inv_main_data[this.project_id_inv][date]['summary_data']['PID']['Count']))

  //      this.inver_wise_lable.push(Object.keys(this.inv_main_data[this.project_id_inv][date]['summary_data'])[i])
  //      Object.values(this.inv_main_data[this.project_id_inv][date]['summary_data'])[i]
  //      this.inver_wise_data.push([Object.values(this.inv_main_data[this.project_id_inv][date]['summary_data']['Hotspot']['Count']),
  //      Object.values(this.inv_main_data[this.project_id_inv][date]['summary_data']['Short Circuit']['Count']),
  //      Object.values(this.inv_main_data[this.project_id_inv][date]['summary_data']['Open Circuit']['Count']),
  //      Object.values(this.inv_main_data[this.project_id_inv][date]['summary_data']['Panel Failure']['Count']),
  //      Object.values(this.inv_main_data[this.project_id_inv][date]['summary_data']['PID']['Count'])])
  //     }
  //     this.inver_wise_def_lable = this.inver_wise_lable[0]
  //     this.inver_wise_def_hot = this.inver_wise_data[0][0]
  //     this.inver_wise_def_sc = this.inver_wise_data[0][1]
  //     this.inver_wise_def_os = this.inver_wise_data[0][2]
  //     this.inver_wise_def_pf = this.inver_wise_data[0][3]
  //     this.inver_wise_def_pid = this.inver_wise_data[0][4]
  //     for (var n = 0; n < this.Project_layer_inv.length; n++) {

  //       this.total_Count.push(+this.Hotspot_inv[n]+ +this.ShortCircit_inv[n]+ +this.Open_Circuit_inv[n]+ +this.pannel_inv[n]+ +this.Pid[n])
  //     }
  
  //   })



  // }
}
