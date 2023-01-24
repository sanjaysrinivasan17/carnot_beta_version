import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ReactiveFormsModule } from '@angular/forms';
import { NgxCaptchaModule } from 'ngx-captcha';
import { RecaptchaModule } from 'ng-recaptcha';
import { HttpClientModule } from '@angular/common/http';
import { AngularSvgIconModule } from 'angular-svg-icon';
import { NgApexchartsModule } from 'ng-apexcharts';
import {MatMenuModule} from '@angular/material/menu'; 
import { NgxPaginationModule } from 'ngx-pagination';
import { MaterialLibrary } from './library/material.lib';
import { HttpService } from './controller/http.service';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ToastrModule } from 'ngx-toastr';
import { 
  NgxUiLoaderModule,
  NgxUiLoaderConfig,
  SPINNER,
  POSITION,
  PB_DIRECTION
} from "ngx-ui-loader";
import { DialogExampleComponent } from './dialog-example/dialog-example.component';
import { DialogContentComponent } from './dialog-content/dialog-content.component';

const ngxUiLoaderConfig: NgxUiLoaderConfig = {
  bgsColor: "#0060FE",
  bgsPosition: POSITION.bottomCenter,
  bgsSize: 40,
  bgsType: SPINNER.rectangleBounce, // background spinner type
  fgsType: SPINNER.cubeGrid, // foreground spinner type
  pbDirection: PB_DIRECTION.leftToRight, // progress bar direction
  pbThickness: 5,
  fgsColor: '#0060FE',
  pbColor: '#0060FE'
};


@NgModule({
  
  declarations: [
    AppComponent,
    DialogExampleComponent,
    DialogContentComponent,
  ],
 entryComponents:[DialogExampleComponent , DialogContentComponent],
 
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    AngularSvgIconModule.forRoot(),
    BrowserAnimationsModule,
    MaterialLibrary,
    NgApexchartsModule,
    NgxPaginationModule,
    MatMenuModule, 
    ReactiveFormsModule,
    NgxCaptchaModule,
    RecaptchaModule,
    BrowserAnimationsModule, // required animations module
    ToastrModule.forRoot({
      timeOut: 10000,
      positionClass: 'toast-top-right',
      preventDuplicates: true,
    }), // ToastrModule added  ,
    NgxUiLoaderModule.forRoot(ngxUiLoaderConfig)
  ],
  providers: [
    HttpService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
