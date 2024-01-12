import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router, NavigationEnd } from '@angular/router';
import { delay, filter } from 'rxjs/operators';
import { AppService } from './app.service';
declare const gtag: Function;
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = 'KRC';
  branches: any = [];
  showLoader = false;
  constructor(private http: HttpClient, private router: Router, private appService:AppService) {
    this.appService.loadingSubObs.pipe(delay(0)).subscribe(data=>{
      this.showLoader = data;
    })
    this.router.events.pipe(
      filter((event): event is NavigationEnd => event instanceof NavigationEnd)).subscribe(event => {
        console.log(event.urlAfterRedirects);
      /** START : Code to Track Page View  */
      gtag('event', 'page_view', {
        page_path: event.urlAfterRedirects
      })
      /** END */
    })
  }

  ngOnInit() {
    // this.http.get('https://krcnephrology.herokuapp.com/index.php').subscribe(data => {
    //   this.branches = JSON.parse(data.toString()).records;
    // })
  }
}
