import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class GoalService {
  constructor(private readonly http: HttpClient) {}

  addGoal(item: any) {
    return this.http.post('goals/goal', item);
  }

  getAllGoals(params: any) {
    return this.http.post('goals/all-goals', params);
  }

  changeStatus(params: any) {
    return this.http.patch('goals/change-Status', params);
  }

  getDailyGoals(params: any) {
    return this.http.post('goals/daily-goals', params);
  }

  updateWater(params: any) {
    return this.http.patch('goals/add-water', params);
  }

  updateDailyGoalStatus(params: any) {
    return this.http.patch('goals/daily-goals/change-Status', params);
  }
}
