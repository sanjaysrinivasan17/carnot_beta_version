import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MapComponent } from './Components/Map/map/map.component';
import { DrawComponent } from './Components/Map/map/sub-component/draw/draw.component';



@NgModule({
  declarations: [MapComponent, DrawComponent],
  imports: [
    CommonModule
  ]
})
export class FunctionalModule { }
