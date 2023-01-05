import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {MatFormFieldModule} from '@angular/material/form-field';
import { ViewRoutingModule } from './view-routing.module';
import { RawImageComponent } from './shared/raw-image/raw-image.component';
import {MatSelectModule} from '@angular/material/select';
import { FormsModule } from '@angular/forms';


@NgModule({
  declarations: [
    RawImageComponent
  ],
  imports: [
    CommonModule,
    ViewRoutingModule,
    MatFormFieldModule,
    MatSelectModule,
    FormsModule
  ]
})
export class ViewModule { }
