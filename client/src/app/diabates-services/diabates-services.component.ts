import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-diabates-services',
  templateUrl: './diabates-services.component.html',
  styleUrls: ['./diabates-services.component.scss']
})
export class DiabatesServicesComponent implements OnInit {
  constructor(private router: Router) { }

  ngOnInit() {
  }

  tabClick(selectedTab){
    let lastRouter = this.router.url.split('/')[this.router.url.split('/').length - 1]
    if(lastRouter == selectedTab){
      this.router.navigate(['/services'])
    }
  }

}
