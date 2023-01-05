import { Component, OnInit, ViewChild } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthserviceService } from '../authservice.service'
import { HttpErrorResponse } from '@angular/common/http';
import { ToastrService } from 'ngx-toastr';
import { Country, State, City } from 'country-state-city';
import { MatStepper } from '@angular/material/stepper';


@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})


export class SignupComponent implements OnInit {
  @ViewChild('stepper') private stepper: MatStepper;

  stepperEvent: any;

  constructor(){}
  ngOnInit(): void {}
 
  goToStep(index) {
    this.stepper.selectedIndex = index;
  }
}

