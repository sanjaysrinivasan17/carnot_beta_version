import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http'
import { of, Observable, BehaviorSubject } from 'rxjs';
// import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { environment } from '../../../../environments/environment';

@Injectable({
  providedIn: 'root'
})

export class HttpAssetService {

  Asset_typewise_data: any = {};
  mission_val: any[] = [];
  set_mision_flight_data : any[] = []


  private newAoI = new BehaviorSubject<any>({
    AOI: 'Capture'
  });

  constructor(private http: HttpClient) { }

  setAsset_data(Asset_data) {
    this.Asset_typewise_data = Asset_data
  }

  setAreaofinterest(AoI: any) {
    // alert("----sanjayaasadasdasdasd-------"+date)
    this.newAoI.next(AoI);

  }
  setmissiondata(data){
    this.mission_val = data

  }
  set_mision_flight_detail(data){
    this.set_mision_flight_data = data

  }
  getAsset_data() {
    return this.Asset_typewise_data
  }
  getAreaofinterest() {
    return this.newAoI.asObservable();
  }
  getmissiondata(){
    return this.mission_val
  }
  get_mision_flight_detail(){
    return this.set_mision_flight_data
  }
  Asset_project() {
    // const newName = localStorage.getItem("name");
    const project_id = localStorage.getItem("project_id");

    const token = localStorage.getItem("token");
    const headers = {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json',
    };

    // return this.http.get(environment.api_name + 'api/project/get_project/' + project_id, { headers })
    return this.http.get(environment.api_name + 'api/asset/get_asset_project/' + project_id, { headers })
    // return this.http.get(environment.api_name+'project/retrieve_project_data/hero')
  }
}
