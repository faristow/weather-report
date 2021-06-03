import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, NgControlStatusGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Weather } from '../weather.model';
import { WeatherService } from '../weather.service';

@Component({
  selector: 'app-weather-search',
  templateUrl: './weather-search.component.html',
  styleUrls: ['./weather-search.component.css']
})
export class WeatherSearchComponent implements OnInit {

  weatherItem : Weather [] =[]
  public errorMsg;
  searchForm : FormGroup
  submitted = false
  public isLoading: boolean = false
  constructor( private fb : FormBuilder,
    private weather_service : WeatherService , private router : Router,
    private toastr_service : ToastrService) { }

  ngOnInit(): void {
    this.initForm()
  }

  private initForm(){
    this.searchForm = this.fb.group({
      city : ['', Validators.required]
    })
  }

  get f() {
    return this.searchForm.controls;
  }


  addCity(){
    this.weather_service.getWeatherByCity(this.searchForm.value.city)
    .subscribe (
      data =>{
        // console.log(data)
        const favLocation = new Weather(data.name, data.weather[0].description, data.main.temp , data.weather[0].icon);
        this.weather_service.addfavLocation(favLocation)
        this.toastr_service.success('Favourite Location added' , 'Success')
        this.router.navigate([''])
      },
      error => {this.errorMsg = this.toastr_service.error('City Not found', 'Error')}
    )
  }



}
