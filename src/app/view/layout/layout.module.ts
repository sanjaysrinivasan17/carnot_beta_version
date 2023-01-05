import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SidebarComponent } from './sidebar/sidebar.component';
import { NavbarComponent } from './navbar/navbar.component';
import { MaterialLibrary } from 'src/app/library/material.lib';
import { RouterModule } from '@angular/router';
// import { FlexLayoutModule } from '@angular/flex-layout';
import { LayoutRoutingModule} from './layout-routing.module';
import { MyprofileComponent } from './myprofile/myprofile.component';
import { ManageuserComponent } from './manageuser/manageuser.component'
import {MatButtonModule} from '@angular/material/button';
import { AdduserComponent } from './adduser/adduser.component';
import {MatDialogModule} from '@angular/material/dialog';
import { ShareComponent } from './share/share.component';
import {MatSelectModule} from '@angular/material/select';
import {MatCardModule} from '@angular/material/card';
import {MatListModule} from '@angular/material/list';
import {MatIconModule} from '@angular/material/icon';

@NgModule({
  declarations: [SidebarComponent, NavbarComponent, MyprofileComponent, ManageuserComponent, AdduserComponent, ShareComponent ],
  imports: [
    CommonModule,
    MaterialLibrary,
    RouterModule,
    // FlexLayoutModule,
    LayoutRoutingModule,
    MatButtonModule,
    MatDialogModule,
    MatSelectModule,
    MatCardModule,
    MatListModule,
    MatIconModule
  ],
  exports: [
    SidebarComponent,
    NavbarComponent
  ]
})
export class LayoutModule { }
