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
}
