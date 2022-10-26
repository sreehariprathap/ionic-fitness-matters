import { Component, OnInit } from '@angular/core';
import {
  faCircleCheck,
  faPersonWalking,
  faBurger,
  faGlassWater,
} from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-daily-goals',
  templateUrl: './daily-goals.component.html',
  styleUrls: ['./daily-goals.component.scss'],
})
export class DailyGoalsComponent implements OnInit {
  faCircleCheck = faCircleCheck;
  faPersonWalking = faPersonWalking;
  faBurger = faBurger;
  faGlassWater = faGlassWater;
  constructor() {}

  ngOnInit() {}
}
