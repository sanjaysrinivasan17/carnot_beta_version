import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';


import { MapSectionRoutingModule } from './map-section-routing.module';
import { SidebarComponent } from './sidebar/sidebar.component';
import { MapSectionComponent } from './map-section.component';
import { MaterialLibrary } from 'src/app/library/material.lib';
import { NgxPaginationModule } from 'ngx-pagination';
import { NgApexchartsModule } from 'ng-apexcharts';
import { AngularSvgIconModule } from 'angular-svg-icon';
import { AoiDialogComponent } from './sub-components/leaflet-draw/aoi-dialog/aoi-dialog.component';
import { DrawComponent } from './sub-components/leaflet-draw/draw/draw.component';
import { ComparisonSliderComponent } from './sub-components/comparison-slider/comparison-slider.component';
import { DialogPreviewComponent } from './sub-components/leaflet-draw/dialog-preview/dialog-preview.component';
import { ComparisionComponent } from './sub-components/comparision/comparision.component';
import { DateComponent } from './sub-components/date/date.component';
import { SubdefectsComponent } from './subdefects/subdefects.component';
import { GradinggraphComponent } from './gradinggraph/gradinggraph.component';
import { DefectrectificationComponent } from './defectrectification/defectrectification.component';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatRadioModule } from '@angular/material/radio';
import { MatSelectModule } from '@angular/material/select';
import { MatSliderModule } from '@angular/material/slider';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { MatMenuModule } from '@angular/material/menu';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatListModule } from '@angular/material/list';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatCardModule } from '@angular/material/card';
import { MatStepperModule } from '@angular/material/stepper';
import { MatTabsModule } from '@angular/material/tabs';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatButtonToggleModule } from '@angular/material/button-toggle';
import { MatChipsModule } from '@angular/material/chips';
import { MatIconModule } from '@angular/material/icon';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { MatDialogModule } from '@angular/material/dialog';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatTableModule } from '@angular/material/table';
import { MatSortModule } from '@angular/material/sort';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatDividerModule } from '@angular/material/divider';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatNativeDateModule, MatRippleModule } from '@angular/material/core';
import { MatBadgeModule } from '@angular/material/badge';

import { allIcons } from 'angular-feather/icons';
import { FeatherModule } from 'angular-feather';


@NgModule({
  declarations: [SidebarComponent, MapSectionComponent, AoiDialogComponent, DrawComponent, ComparisonSliderComponent, DialogPreviewComponent, ComparisionComponent, DateComponent, SubdefectsComponent, GradinggraphComponent, DefectrectificationComponent],
  imports: [
    CommonModule,
    MapSectionRoutingModule,
    MaterialLibrary,
    NgApexchartsModule,
    AngularSvgIconModule.forRoot(),
    NgxPaginationModule,
    MatAutocompleteModule,
    MatButtonModule,
    MatCardModule,
    MatCheckboxModule,
    MatChipsModule,
    MatDividerModule,
    MatExpansionModule,
    MatIconModule,
    MatInputModule,
    MatListModule,
    MatMenuModule,
    MatProgressSpinnerModule,
    MatPaginatorModule,
    MatSelectModule,
    MatSidenavModule,
    MatSnackBarModule,
    MatSortModule,
    MatTableModule,
    MatTabsModule,
    MatToolbarModule,
    MatFormFieldModule,
    MatButtonToggleModule,
    MatBadgeModule,
    MatProgressBarModule,
    MatDialogModule,
    MatTooltipModule,
    MatStepperModule,
    MatGridListModule,
    MatRadioModule,
    MatSliderModule,
    MatSlideToggleModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatRippleModule
  ]
})
export class MapSectionModule { }
