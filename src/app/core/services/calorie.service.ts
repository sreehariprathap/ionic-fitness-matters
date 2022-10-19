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

  addWorkout(workout: Workout) {
    return this.http.post(`workouts/add-workout`, workout);
  }
}
