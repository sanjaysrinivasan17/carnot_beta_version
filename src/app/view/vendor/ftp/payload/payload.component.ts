import { Component, EventEmitter, OnInit, Output } from '@angular/core';

@Component({
  selector: 'ftp-payload',
  templateUrl: './payload.component.html',
  styleUrls: ['./payload.component.css']
})
export class PayloadComponent implements OnInit {
  @Output() stepperEvent: EventEmitter<number> = new EventEmitter();

  Radiometry:any;
  inter:any
  lens_focal:any;

  constructor() { }

  ngOnInit(): void {
  }


  radio(value){this.Radiometry=value}
  Integration(value){this.inter=value}
  lens(value){this.lens_focal=value}


  next(resolution,frame_rate,flight_speed,aov,height) {
    this.stepperEvent.emit(2);

    var payload ={
      "Resolution":resolution,
      "Frame_rate":frame_rate,
      "Flight_speed":flight_speed,
      "Angleofview":aov,
      "Height":height,
      "Radiometry":this.Radiometry,
      "Integration":this.inter,
      "Lens_focal":this.lens_focal
    }
    // // console.log(payload)
  }

  prev() {
    this.stepperEvent.emit(0);
  }


}
