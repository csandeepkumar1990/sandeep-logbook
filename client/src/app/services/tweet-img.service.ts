import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class TweetImgService {

  constructor(private http: HttpClient) { }

  tweetImg(image: File, status: string){
    const formData = new FormData();

    formData.append('image', image);
    formData.append('status', status);

    return this.http.post('/api/tweet-img', formData);
  }
}
