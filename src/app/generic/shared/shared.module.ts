import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MaterialModule } from '../material/material.module';
import { TranslateModule } from '@ngx-translate/core';
import { GoogleChartsModule } from 'angular-google-charts';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { SpinnerLoaderComponent } from './spinner-loader/spinner-loader.component';

@NgModule({
  declarations: [SpinnerLoaderComponent],
  imports: [CommonModule, MaterialModule],
  exports: [
    CommonModule,
    MaterialModule,
    TranslateModule,
    FormsModule,
    ReactiveFormsModule,
    GoogleChartsModule,
    RouterModule,
    SpinnerLoaderComponent
  ]
})
export class SharedModule {}
