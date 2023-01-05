import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ProjectRoutingModule } from './project-routing.module';
import { AllProjectsComponent } from './all-projects/all-projects.component';
import { MaterialLibrary } from 'src/app/library/material.lib';
import { MatStepperModule } from '@angular/material/stepper';
import { CreateProjectComponent } from './create-project/create-project.component';
import { DocumentsComponent } from './create-project/documents/documents.component';
import { EnvironmentComponent } from './create-project/environment/environment.component';
import { PayloadComponent } from './create-project/payload/payload.component';
import { FileComponent } from './create-project/file/file.component';
import { SubscriptionPlanComponent } from './create-project/subscription-plan/subscription-plan.component';
import { ProjectDetailsComponent } from './create-project/project-details/project-details.component';
import { NgApexchartsModule } from 'ng-apexcharts';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatDialogModule } from '@angular/material/dialog';
import { MatCardModule } from '@angular/material/card';
import { UploadComponent } from './upload/upload.component';
import { TabViewModule } from 'primeng/tabview';
import { ToolbarModule } from 'primeng/toolbar';

@NgModule({
  declarations: [AllProjectsComponent, CreateProjectComponent, DocumentsComponent, EnvironmentComponent, PayloadComponent, FileComponent, SubscriptionPlanComponent,  ProjectDetailsComponent, UploadComponent],
  imports: [
    CommonModule,
    ProjectRoutingModule,
    MaterialLibrary,
    MatStepperModule,
    NgApexchartsModule,
    MatDatepickerModule,
    MatDialogModule,
    MatCardModule,
    TabViewModule, 
    ToolbarModule
  ]
})
export class ProjectModule { }
