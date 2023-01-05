import { Component, EventEmitter, OnInit, Output } from '@angular/core';

@Component({
  selector: 'subscription-plan',
  templateUrl: './subscription-plan.component.html',
  styleUrls: ['./subscription-plan.component.css']
})
export class SubscriptionPlanComponent implements OnInit {
  @Output() stepperEvent: EventEmitter<number> = new EventEmitter();

  constructor() { }

  ngOnInit(): void {
  }
  next() {
    this.stepperEvent.emit(2);
  }
}