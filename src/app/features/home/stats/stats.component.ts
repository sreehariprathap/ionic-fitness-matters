import { Component, Input, OnInit } from '@angular/core';
import { Subject } from 'rxjs';
import { skip } from 'rxjs/operators';
import { CalorieService } from 'src/app/core/services/calorie.service';
import { UserService } from 'src/app/core/services/user.service';

@Component({
  selector: 'app-stats',
  templateUrl: './stats.component.html',
  styleUrls: ['./stats.component.scss'],
})
export class StatsComponent implements OnInit {
  @Input('foodSubject') foodSubject: Subject<any>;
  @Input('workoutSubject') workoutSubject: Subject<any>;
  calorieBurnPercent: number;
  bmr: number;
  caloriesConsumed: number;
  caloriesBurned: number;

  constructor(
    private readonly calorieService: CalorieService,
    private readonly userService: UserService
  ) {}

  ngOnInit() {
    this.calorieCounter();
    this.workoutSubject.subscribe((e) => {
      this.calorieCounter();
    });
    this.foodSubject.subscribe((e) => {
      this.calorieCounter();
    });
  }

  calorieCounter() {
    const userId = localStorage.getItem('user_id');
    this.calorieService
      .caloriesConsumedToday({ id: +userId })
      .subscribe((data: any) => {
        this.caloriesConsumed = +data.consumedCalories;
      });
    this.calorieService
      .caloriesBurnedToday({ id: +userId })
      .subscribe((data: any) => {
        this.caloriesBurned = +data.burnedCalories;
      });
    this.userService
      .getUserDetails({ id: +userId })
      .subscribe((userData: any) => {
        this.bmr = +userData.fitness.caloriesPerDay;
        //get calories percentage value
        this.calorieBurnPercent = +(
          (this.caloriesConsumed / (this.bmr + this.caloriesBurned)) *
          100
        ).toFixed(2);
      });
  }
}
