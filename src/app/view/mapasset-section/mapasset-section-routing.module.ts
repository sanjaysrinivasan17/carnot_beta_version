import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MapassetSectionComponent } from './mapasset-section.component';

const routes: Routes = [
  {
    path: '',
    component: MapassetSectionComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class MapassetSectionRoutingModule { }
