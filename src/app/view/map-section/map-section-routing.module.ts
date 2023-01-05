import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { MapSectionComponent } from './map-section.component';


const routes: Routes = [
  {
    path: '',
    component: MapSectionComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class MapSectionRoutingModule { }
