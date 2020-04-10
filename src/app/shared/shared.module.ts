import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TranslateLoader, TranslateModule } from '@ngx-translate/core';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import { HttpClient, HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { BsDropdownModule } from 'ngx-bootstrap/dropdown';
import { CollapseModule } from 'ngx-bootstrap/collapse';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FooterComponent } from './footer/footer.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ToastrModule } from 'ngx-toastr';
import { NgxSpinnerModule } from 'ngx-spinner';
import { HeaderComponent } from './header/header.component';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from '../app-routing.module';
import { FontAwesomeModule, FaIconLibrary } from '@fortawesome/angular-fontawesome';
import { fas } from '@fortawesome/free-solid-svg-icons';
import {MatSlideToggleModule} from '@angular/material/slide-toggle';
import { GoogleChartsModule } from 'angular-google-charts';
import { NgxSelectModule, INgxSelectOptions  } from 'ngx-select-ex';

// required for AOT compilation
export function HttpLoaderFactory(http: HttpClient) {
  return new TranslateHttpLoader(http, './assets/i18n/', '.json');
}


const customSelectOptions: INgxSelectOptions = { // Check the interface for more options
  optionValueField: 'id',
  optionTextField: 'name',
  keepSelectedItems: true
};

@NgModule({
  declarations: [HeaderComponent, FooterComponent],
  imports: [
    CommonModule,
    ToastrModule.forRoot({
      preventDuplicates: true
    }),
    NgxSpinnerModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    BrowserModule,
    AppRoutingModule,
    FontAwesomeModule,
    BrowserAnimationsModule,
    HttpClientModule,
    TranslateModule.forRoot({
      loader: {
        provide: TranslateLoader,
        useFactory: HttpLoaderFactory,
        deps: [HttpClient]
      }
    }),
    CollapseModule.forRoot(),
    BsDropdownModule.forRoot(),   
    MatSlideToggleModule,
    GoogleChartsModule,
    NgxSelectModule.forRoot(customSelectOptions)
  ],
  exports: [
    TranslateModule,
    CommonModule,
    FormsModule,
    HeaderComponent,
    FooterComponent,
    ReactiveFormsModule,
    NgxSpinnerModule,   
    MatSlideToggleModule,
    GoogleChartsModule,
    NgxSelectModule
    ]
})
export class SharedModule {
   constructor(library: FaIconLibrary) {
    library.addIconPacks(fas);
  }
}

