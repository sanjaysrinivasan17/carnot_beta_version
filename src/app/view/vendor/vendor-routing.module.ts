import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { VendorHomeComponent } from './vendor-home/vendor-home.component';
import { VendorComponent } from './vendor.component';


const routes: Routes = [
  {
    path: '',
    component: VendorComponent,
    children:[
      {
        path: '',
        component: VendorHomeComponent
      },
      {
        path: 'ftp',
        loadChildren:() => import("./ftp/ftp.module").then(m => m.FtpModule)
      },
    ]
  }

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class VendorRoutingModule { }
