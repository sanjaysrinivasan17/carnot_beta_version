import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AllProjectsComponent } from './all-projects/all-projects.component';
import { CreateProjectComponent } from './create-project/create-project.component';
import { UploadComponent } from './upload/upload.component';


const routes: Routes = [
  {
    path: 'create',
    component: CreateProjectComponent
  },

  {
    path: 'all',
    component: AllProjectsComponent
  },
  {
    path: 'upload',
    component: UploadComponent
  }

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ProjectRoutingModule { }
