import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Food, Workout } from '../models';

@Injectable({
  providedIn: 'root',
})
export class CalorieService {
  constructor(private readonly http: HttpClient) {}

  addFood(food: Food) {
    return this.http.post(`food/food-intake`, food);
  }

  caloriesConsumedToday(params: any) {
    return this.http.post(`food/calories/today`, params);
  }

  addWorkout(workout: Workout) {
    return this.http.post(`workouts/add-workout`, workout);
  }

  caloriesBurnedToday(params: any) {
    return this.http.post('workouts/calories/today', params);
  }
}
