import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DashboardDetailsComponent } from './dashboard-details.component';
import { MaterialLibrary } from 'src/app/library/material.lib';
import { AngularSvgIconModule } from 'angular-svg-icon';
import { NgApexchartsModule } from 'ng-apexcharts';




@NgModule({
  declarations: [DashboardDetailsComponent],
  imports: [
    CommonModule,
    MaterialLibrary,
    AngularSvgIconModule.forRoot(),
    NgApexchartsModule
  ],

  exports: [
    DashboardDetailsComponent
  ]
})
export class DashboardDetailsModule { }
