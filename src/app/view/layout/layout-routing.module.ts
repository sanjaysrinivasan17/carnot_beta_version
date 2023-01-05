import { Component , NgModule } from '@angular/core';
import { Routes, RouterModule} from '@angular/router';
import { MyprofileComponent} from './myprofile/myprofile.component';
import { ManageuserComponent } from './manageuser/manageuser.component';
import { AdduserComponent } from './adduser/adduser.component';

const routes: Routes = [
  { path: 'myprofile' , component: MyprofileComponent},
  { path: 'manageuser', component: ManageuserComponent},
  { path: 'adduser', component: AdduserComponent}
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
  })
  export class LayoutRoutingModule { }