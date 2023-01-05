import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { CloudLightning } from 'angular-feather/icons';
import { environment } from 'src/environments/environment';;

@Component({
  selector: 'ftp-environment',
  templateUrl: './environment.component.html',
  styleUrls: ['./environment.component.css']
})
export class EnvironmentComponent implements OnInit {

  
  @Output() stepperEvent: EventEmitter<number> = new EventEmitter();

  soiling:any;
  constructor() { }

  ngOnInit(): void {
  }

  soling(value){this.soiling=value}

  next(date,irradiation,air_temp,wind_speed,cloud_cov) {
    this.stepperEvent.emit(1)
    var environment_detail = {
      "Date":date,
      "Irradiation":irradiation,
      "Air_Temp":air_temp,
      "Wind_speed":wind_speed,
      "Cloud_coverage":cloud_cov,
      "soiling":this.soiling
    }
    // console.log(environment_detail)

  }

  prev() {
    this.stepperEvent.emit(1);
  }

}