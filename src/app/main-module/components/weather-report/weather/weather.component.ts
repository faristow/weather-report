import { Component, ComponentFactoryResolver, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Weather } from '../weather.model';
import { WeatherService } from '../weather.service';


@Component({
  selector: 'app-weather',
  templateUrl: './weather.component.html',
  styleUrls: ['./weather.component.css']
})
export class WeatherComponent implements OnInit {

  lat;
  lng;
  useLocationWeather
  weatherItem : Weather[]
  searchForm : FormGroup
  popupweather

  constructor(private weather_service : WeatherService, private router : Router, private fb : FormBuilder) {}

  ngOnInit(): any {
    this.getFavLocation()
    this.initForm()
    this.getWeatherbyCoords()

  }
  private initForm(){
    this.searchForm = this.fb.group({
      city : ['', Validators.required]
    })
  }

  get f() {
    return this.searchForm.controls;
  }

  getByCity(){
    this.weather_service.getWeatherByCity(this.searchForm.value.city).
    subscribe(data =>{
      this.popupweather = new Weather(data.name, data.weather[0].description, data.main.temp , data.weather[0].icon)
      console.log(this.popupweather)
    })
    this.searchForm.reset()
  }

  getFavLocation(){
    this.weatherItem = this.weather_service.getfavLocation()
  }

  addFavorite(){
    this.weather_service.addfavLocation(this.popupweather)
    this.router.navigate([''])
  }

  getWeatherbyCoords(){
    if("geolocation" in navigator){
      navigator.geolocation.watchPosition((response)=>{
        this.lat = response.coords.latitude;
        this.lng = response.coords.longitude
        this.weather_service.getWeatherByGeoCord(this.lat, this.lng)
        .subscribe(data=>{
          this.useLocationWeather = data
          console.log(this.useLocationWeather)
        })

      })
    }
  }

}
