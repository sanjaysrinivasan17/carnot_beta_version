import { Component, OnInit, ViewChild } from '@angular/core';
import { MatStepper } from '@angular/material/stepper';

@Component({
  selector: 'app-create-project',
  templateUrl: './create-project.component.html',
  styleUrls: ['./create-project.component.css']
})
export class CreateProjectComponent implements OnInit {

  @ViewChild('stepper') private stepper: MatStepper;

  constructor() { }

  ngOnInit(): void {
  }
  goToStep(index: number) {
    this.stepper.selectedIndex = index;
  }

}