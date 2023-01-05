import { Component, EventEmitter, OnInit, Output } from '@angular/core';

@Component({
  selector: 'documents',
  templateUrl: './documents.component.html',
  styleUrls: ['./documents.component.css']
})
export class DocumentsComponent implements OnInit {

  @Output() stepperEvent: EventEmitter<number> = new EventEmitter();

  constructor() { }

  ngOnInit(): void {
  }
  prev() {
    this.stepperEvent.emit(3);
  }
}