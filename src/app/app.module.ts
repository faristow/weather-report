import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import {MatCardModule} from '@angular/material/card';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HttpClientModule } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { WeatherComponent } from './main-module/components/weather-report/weather/weather.component';
import { WeatherService } from './main-module/components/weather-report/weather.service';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { WeatherSearchComponent } from './main-module/components/weather-report/weather-search/weather-search.component';
import { ToastrModule } from 'ngx-toastr';

@NgModule({
  declarations: [
    AppComponent,
    WeatherComponent,
    WeatherSearchComponent,


  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    HttpClientModule,
    MatCardModule,
    FormsModule,
    ReactiveFormsModule,
    ToastrModule.forRoot({
      timeOut : 500,
      positionClass : 'toast-top-right',
      preventDuplicates : false
    })

  ],
  providers: [WeatherService],
  bootstrap: [AppComponent]
})
export class AppModule { }
