import { Component, OnInit } from '@angular/core';
import {
  faCircleCheck,
  faPersonWalking,
  faBurger,
  faGlassWater,
} from '@fortawesome/free-solid-svg-icons';
import { GoalService } from 'src/app/core/services/goal.service';

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
  userId: number = +localStorage.getItem('user_id');
  dailyGoals;

  constructor(private readonly goalsService: GoalService) {}

  ngOnInit() {
    this.getDailyGoals();
  }

  getDailyGoals() {
    this.goalsService
      .getDailyGoals({ id: +this.userId })
      .subscribe((data: any) => {
        this.dailyGoals = data.goal[0];
        console.log(this.dailyGoals);
      });
  }
  changeWaterStatus(args: string) {
    this.goalsService
      .updateWater({ id: this.dailyGoals.id, action: args })
      .subscribe((data) => {
        console.log(data);
        this.getDailyGoals();
      });
  }
}
