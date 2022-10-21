import { Component, OnInit } from '@angular/core';
import { skip } from 'rxjs/operators';
import { CalorieService } from 'src/app/core/services/calorie.service';
import { UserService } from 'src/app/core/services/user.service';

@Component({
  selector: 'app-stats',
  templateUrl: './stats.component.html',
  styleUrls: ['./stats.component.scss'],
})
export class StatsComponent implements OnInit {
  calorieBurnPercent = 0;
  bmr: number;
  caloriesConsumed: number;
  caloriesBurned: number;
  constructor(
    private readonly calorieService: CalorieService,
    private readonly userService: UserService
  ) {}

  ngOnInit() {
    this.calorieCounter();
  }

  getUserDetails() {
    const userId = localStorage.getItem('user_id');
    this.userService
      .getUserDetails({ id: +userId })
      .subscribe((userData: any) => {
        console.log(userData);
        this.bmr = userData.fitness.caloriesPerDay;
      });
  }

  getCaloriesBurned() {
    const userId = localStorage.getItem('user_id');
    this.calorieService
      .caloriesBurnedToday({ id: +userId })
      .subscribe((data: any) => {
        console.log(data);
        this.caloriesBurned = data.burnedCalories;
      });
  }

  getCaloriesConsumed() {
    const userId = localStorage.getItem('user_id');
    this.calorieService
      .caloriesConsumedToday({ id: +userId })
      .subscribe((data: any) => {
        console.log(data);
        this.caloriesConsumed = data.consumedCalories;
      });
  }

  calorieCounter() {
    this.getUserDetails();
    this.getCaloriesBurned();
    this.getCaloriesConsumed();
    const caloriesBurned = +this.caloriesBurned + +this.bmr;
    const caloriesConsumed = +this.caloriesConsumed;
    this.calorieBurnPercent = (caloriesBurned / caloriesConsumed) * 100;
    console.log(this.calorieBurnPercent);
  }
}
