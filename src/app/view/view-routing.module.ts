import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';


const routes: Routes = [
  {
    path: '',
    redirectTo: 'landing',
    pathMatch:'full'
  },
  {
    path: 'app',
    loadChildren: () => import("./section/section.module").then(m => m.SectionModule)

  },
  {
    path:'map',
    loadChildren: () => import("./map-section/map-section.module").then(m => m.MapSectionModule)
  },
  {
    path:'Assetmap',
    loadChildren: () => import("./mapasset-section/mapasset-section.module").then(m => m.MapassetSectionModule)
  },
  {
    path:'defectrectification',
    loadChildren: () => import("./map-section/map-section.module").then(m => m.MapSectionModule)
  },
  {
    path: 'auth',
    loadChildren: () => import("./authentication/authentication.module").then(m => m.AuthenticationModule)
  },
  {
    path: 'landing',
    loadChildren: () => import("./landing/landing.module").then(m => m.LandingModule)
  },
  {
    path: 'vendor',
    loadChildren:() => import("./vendor/vendor.module").then(m=>m.VendorModule)
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ViewRoutingModule { }
