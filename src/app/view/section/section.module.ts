import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SectionRoutingModule } from './section-routing.module';
import { SectionComponent } from './section.component';
import { LayoutModule } from '../layout/layout.module';
import { FaqComponent } from './faq/faq.component';
import { MaterialLibrary } from 'src/app/library/material.lib';
import { NgApexchartsModule } from 'ng-apexcharts';
import { AnalyticsComponent } from './analytics/analytics.component';



@NgModule({
  declarations: [SectionComponent, FaqComponent,AnalyticsComponent],
  imports: [
    CommonModule,
    SectionRoutingModule,
    LayoutModule,
    MaterialLibrary,
    NgApexchartsModule
  ]
})
export class SectionModule { }
