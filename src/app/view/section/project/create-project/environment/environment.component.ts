import { Output } from '@angular/core';
import { Component, EventEmitter, OnInit } from '@angular/core';

@Component({
  selector: 'environment',
  templateUrl: './environment.component.html',
  styleUrls: ['./environment.component.css']
})
export class EnvironmentComponent implements OnInit {

  @Output() stepperEvent: EventEmitter<number> = new EventEmitter();

  constructor() { }

  ngOnInit(): void {
  } 
  next() {
    this.stepperEvent.emit(3)
  }

  prev() {
    this.stepperEvent.emit(1);
  }

}

