import { Component, OnInit } from '@angular/core';
import { AppGlobals } from '../../core/services/AppGlobals';
import { Router, NavigationStart, NavigationEnd } from '@angular/router';

@Component({
  selector: 'rebar-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  basePath = '';
  url = '';

  constructor(private router: Router, private appGlobals: AppGlobals) {
    this.basePath = this.appGlobals.getBasePath();
  }

  ngOnInit() {
    this.router.events
      .filter((event) => event instanceof NavigationEnd)
      .subscribe((event: NavigationEnd) => {
        this.url = event.url;
      });
  }

  navigateTo(route?: string) {
    this.router.navigate([route || '']);
  }
}
