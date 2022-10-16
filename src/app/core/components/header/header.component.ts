import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, NavigationEnd, Router } from '@angular/router';

import { filter, startWith } from 'rxjs/operators';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent implements OnInit {
  heading: string;

  constructor(
    private readonly router: Router,
    private readonly route: ActivatedRoute
  ) {
    this.router.events
      .pipe(
        filter((event) => event instanceof NavigationEnd),
        startWith(this.router)
      )
      .subscribe((e: NavigationEnd) => {
        const headerData = route.snapshot.children[0]?.children[0].data;
        this.heading = headerData?.heading;
      });
  }

  ngOnInit() {}
}
