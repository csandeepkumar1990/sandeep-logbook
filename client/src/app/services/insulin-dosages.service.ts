import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class InsulinDosagesService {

  constructor(private http: HttpClient) { }

  public create(body) {
    return this.http.post('api/insulin', body);
  }

  public getChartData(body) {
    return this.http.post('api/getChartData', body);
  }

  public getHistoricalCsvData(body) {
    return this.http.get('api/exportHistory', body);
  }

  public getCsvData(body) {
    return this.http.post('api/export', body);
  }

  public downloadFile(data, filename='data') {
    console.log('data', data)
    let blob = new Blob(['\ufeff' + data], { type: 'text/csv;charset=utf-8;' });
    let dwldLink = document.createElement("a");
    let url = URL.createObjectURL(blob);
    let isSafariBrowser = navigator.userAgent.indexOf('Safari') != -1 && navigator.userAgent.indexOf('Chrome') == -1;
    if (isSafariBrowser) {  //if Safari open in new window to save file with random filename.
        dwldLink.setAttribute("target", "_blank");
    }
    dwldLink.setAttribute("href", url);
    dwldLink.setAttribute("download", "diabetes-logbook.csv");
    dwldLink.style.visibility = "hidden";
    document.body.appendChild(dwldLink);
    dwldLink.click();
    document.body.removeChild(dwldLink);
}


}
