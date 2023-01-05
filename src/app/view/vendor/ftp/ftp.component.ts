import { Component, OnInit, ViewChild } from '@angular/core';
import { MatStepper } from '@angular/material/stepper';
import { Router } from '@angular/router';

@Component({
  selector: 'app-ftp',
  templateUrl: './ftp.component.html',
  styleUrls: ['./ftp.component.css']
})
export class FtpComponent implements OnInit {


  @ViewChild('stepper') private stepper: MatStepper;


  constructor(private router: Router) { }

  ngOnInit(): void {
  }

  goToStep(index: any) {
    this.stepper.selectedIndex = index;
  }

  goToPage(pageName:string){
    this.router.navigate([`${pageName}`]);
  }

}
