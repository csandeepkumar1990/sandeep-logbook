import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ActivityLevelService {

  constructor(private http: HttpClient) { }

  public create(body) {
    return this.http.post('api/activity', body);
  }
}
