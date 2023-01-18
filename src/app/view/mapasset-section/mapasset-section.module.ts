import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MapassetSectionRoutingModule } from './mapasset-section-routing.module';
import { MapassetSectionComponent } from './mapasset-section.component';
import { MaterialLibrary } from 'src/app/library/material.lib';
import { AssetsidebarComponent } from './assetsidebar/assetsidebar.component';
import { NgApexchartsModule } from 'ng-apexcharts';
import { ComparisionAssetComponent } from './sub-components/comparision-asset/comparision-asset.component';
import { SummaryAnalyticsComponent } from './sub-components/summary-analytics/summary-analytics.component';
import { DownloadreportComponent } from './sub-components/downloadreport/downloadreport.component';
import { InverterAnalyticsComponent } from './sub-components/inverter-analytics/inverter-analytics.component';
import { AssetSharecomponentComponent } from './sub-components/asset-sharecomponent/asset-sharecomponent.component';
import { InverterwiseAnalyticsComponent } from './sub-components/inverterwise-analytics/inverterwise-analytics.component';
import { AssetaoiDrawComponent } from './sub-components/leaflet-draw/assetaoi-draw/assetaoi-draw.component';
import { AssetdialogPreviewComponent } from './sub-components/leaflet-draw/assetdialog-preview/assetdialog-preview.component';
import { AssetdrawComponent } from './sub-components/leaflet-draw/assetdraw/assetdraw.component';
import { MeasureComponent } from './sub-components/leaflet-measure/measure/measure.component';
import { MatDialogModule } from '@angular/material/dialog';


@NgModule({
  declarations: [
    MapassetSectionComponent,
    AssetsidebarComponent,
    ComparisionAssetComponent,
    SummaryAnalyticsComponent,
    DownloadreportComponent,
    InverterAnalyticsComponent,
    AssetSharecomponentComponent,
    InverterwiseAnalyticsComponent,
    AssetaoiDrawComponent,
    AssetdialogPreviewComponent,
    AssetdrawComponent,
    MeasureComponent
  ],
  imports: [
    CommonModule,
    MaterialLibrary,
    MapassetSectionRoutingModule,
    NgApexchartsModule,
    MatDialogModule
  ]
})
export class MapassetSectionModule { }
