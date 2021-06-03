import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { catchError, map, retry } from 'rxjs/operators'
import { Weather } from './weather.model';



@Injectable({
  providedIn: 'root'
})
export class WeatherService {

  final : Weather [] =[];
  apikey='94c8368cf4830ff30e5638fb6058f4e1';
  lattitude;
  longitude
  clubfavlocation :Weather [] =[]


  constructor(private http:HttpClient) {}

  getWeatherByCity(city): Observable<any>{
    return this.http.get(`http://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${this.apikey}&units=imperial`)
    .pipe(
      retry(1),
      catchError(this.handleError)
    )
  }

  addfavLocation( favlocation : Weather){
      this.final = this.final || [];
      this.final.push(favlocation)
    localStorage.setItem('favLocation', JSON.stringify(this.final))
  }


  getfavLocation(){
    //getting the array from local storage
  this.final = JSON.parse(localStorage.getItem('favLocation'))
  console.log("final on get"+ this.final)
  // returning and saving it in array.
  return this.final
}

handleError(error : HttpErrorResponse){
  return Observable.throw(error.message || "Server Error")
}


getWeatherByGeoCord(lat,lng):Observable<any>{
 return this.http.get(`http://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lng}&appid=${this.apikey}&units=imperial`)
}

}
