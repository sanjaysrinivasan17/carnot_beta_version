import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProjectDetailsComponent } from './project-details.component';
import { AngularSvgIconModule } from 'angular-svg-icon';
import { MaterialLibrary } from 'src/app/library/material.lib';



@NgModule({
  declarations: [ProjectDetailsComponent],
  imports: [
    CommonModule,
    AngularSvgIconModule.forRoot(),
    MaterialLibrary,
  ],

  exports: [
    ProjectDetailsComponent
  ]
})
export class ProjectDetailsModule { }
