import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http'


@Injectable({
  providedIn: 'root'
})
export class HttpService {

  constructor(private http: HttpClient) { }

  summary_data(){
    // return this.http.get('https://asset.datasee.ai/thermal/thermal/project/data/hero_ichawar')
  }
  inverter_data(){
    // return this.http.get('https://asset.datasee.ai/thermal/thermal/project/retrieve_data/hero_ichawar')
  }

}
