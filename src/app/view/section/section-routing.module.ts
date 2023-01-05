import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AnalyticsComponent } from './analytics/analytics.component';
import { FaqComponent } from './faq/faq.component';
import { SectionComponent } from './section.component';


const routes: Routes = [
  {
    path: '',
    component: SectionComponent,
    children:[
      {
        path: '',
        redirectTo: 'home',
        pathMatch: 'full'
      },
      {
        path: 'home',
        loadChildren:() => import("./dashboard/dashboard.module").then(m => m.DashboardModule)
      },

      {
        path: 'faq',
        component: FaqComponent
      },

      {
        path: 'project',
        loadChildren:() => import("./project/project.module").then(m=>m.ProjectModule)
      },

      {
        path: 'analytics',
        component:AnalyticsComponent
      },

    ]
  },

  {
    path: 'home',
    component: SectionComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SectionRoutingModule { }
