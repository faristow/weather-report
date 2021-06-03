import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { WeatherSearchComponent } from './main-module/components/weather-report/weather-search/weather-search.component';
import { WeatherComponent } from './main-module/components/weather-report/weather/weather.component';

const routes: Routes = [
  { path: '', pathMatch: 'full', redirectTo: '/weather' },
  {
    path: 'weather',
    component: WeatherComponent
  },
  {
    path: 'weather-search',
    component: WeatherSearchComponent
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
