import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class CarbsService {

  constructor(private http: HttpClient) { }

  public create(data) {
    return this.http.post('api/carbs', data);
  }

  public get(data) {
    return this.http.get('api/carbs', data);
  }

}

