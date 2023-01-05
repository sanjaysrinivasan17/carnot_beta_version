import { Component, EventEmitter, OnInit, Output } from '@angular/core';

@Component({
  selector: 'step-payload',
  templateUrl: './payload.component.html',
  styleUrls: ['./payload.component.css']
})
export class PayloadComponent implements OnInit {
  @Output() stepperEvent: EventEmitter<number> = new EventEmitter();

  constructor() { }

  ngOnInit(): void {
  }
  next() {
    this.stepperEvent.emit(4);
  }

  prev() {
    this.stepperEvent.emit(2);
  }

}