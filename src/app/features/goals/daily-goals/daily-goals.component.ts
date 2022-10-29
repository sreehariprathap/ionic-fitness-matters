import { Component, OnInit } from '@angular/core';
import {
  faCircleCheck,
  faPersonWalking,
  faBurger,
  faGlassWater,
} from '@fortawesome/free-solid-svg-icons';
import { AnimationModel } from '@syncfusion/ej2-angular-progressbar';
import { CalorieService } from 'src/app/core/services/calorie.service';
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
  foodIntakeProgress: number;
  calorieProgress: number;
  public animation: AnimationModel = { enable: true, duration: 2000, delay: 0 };

  constructor(
    private readonly goalsService: GoalService,
    private readonly calorieService: CalorieService
  ) {}

  ngOnInit() {
    this.getDailyGoals();
    this.calorieBurned();
    this.calorieConsumed();
  }

  getDailyGoals() {
    this.goalsService
      .getDailyGoals({ id: +this.userId })
      .subscribe((data: any) => {
        this.dailyGoals = data.goal[0];
      });
  }
  changeWaterStatus(args: string) {
    this.goalsService
      .updateWater({ id: this.dailyGoals.id, action: args })
      .subscribe((data) => {
        this.getDailyGoals();
      });
  }

  calorieConsumed() {
    this.calorieService
      .caloriesConsumedToday({ id: +this.userId })
      .subscribe((data: any) => {
        if (
          +(
            (+data.consumedCalories / +this.dailyGoals.inTakeGoal) *
            100
          ).toFixed() >= 100
        ) {
          this.foodIntakeProgress = 100;
          this.goalsService
            .updateDailyGoalStatus({
              id: +this.dailyGoals.id,
              action: 'intakeGoal',
            })
            .subscribe((goalData: any) => {
              this.getDailyGoals();
            });
        } else {
          this.foodIntakeProgress = +(
            (+data.consumedCalories / +this.dailyGoals.inTakeGoal) *
            100
          ).toFixed();
          this.getDailyGoals();
        }
      });
  }

  calorieBurned() {
    this.calorieService
      .caloriesBurnedToday({ id: +this.userId })
      .subscribe((data: any) => {
        if (
          +(
            (+data.burnedCalories / +this.dailyGoals.burnGoal) *
            100
          ).toFixed() >= 100
        ) {
          this.calorieProgress = 100;
          this.goalsService
            .updateDailyGoalStatus({
              id: +this.dailyGoals.id,
              action: 'workoutGoal',
            })
            .subscribe((goalData: any) => {
              this.getDailyGoals();
            });
        } else {
          this.calorieProgress = +(
            (+data.burnedCalories / +this.dailyGoals.burnGoal) *
            100
          ).toFixed();
        }
      });
  }
}
