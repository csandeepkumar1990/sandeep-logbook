import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class GlucoseService {

  constructor(private http: HttpClient) { }

  public create(data) {
    return this.http.post('api/glucose', data);
  }

  public get(data) {
    return this.http.get('api/glucose', data);
  }

  public getLatestGlucoseLevel(data) {
    return this.http.get('api/getLatestGlucoseLevel', data);
  }
  public getLatestGlucoseLevelByTime(data) {
    return this.http.post('api/getLatestGlucoseLevelByTime', data);
  }
}

