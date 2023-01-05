import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MaterialLibrary } from 'src/app/library/material.lib';

import { DashboardRoutingModule } from './dashboard-routing.module';
import { DashboardComponent } from './dashboard.component';
import { ProjectDetailsModule } from './project-details/project-details.module';
import { DashboardDetailsModule } from './dashboard-details/dashboard-details.module';
import { ValidationComponent } from './validation/validation.component';
import { DashboardMapComponent } from './dashboard-map/dashboard-map.component';
import { TabViewModule } from 'primeng/tabview';
import { GMapModule } from 'primeng/gmap';
import { NgApexchartsModule } from 'ng-apexcharts';

@NgModule({
  declarations: [DashboardComponent, ValidationComponent, DashboardMapComponent],
  imports: [
    CommonModule,
    DashboardRoutingModule,
    ProjectDetailsModule,
    DashboardDetailsModule,
    MaterialLibrary,
    TabViewModule,
    GMapModule,
    NgApexchartsModule
  ]

})
export class DashboardModule { }
