import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class TodoService {

  constructor(private readonly http: HttpClient) {}

  addTodo(item: any) {
    return this.http.post('todos/todo', item);
  }

  getAllTodos(params: any) {
    return this.http.post('todos/all-todos', params);
  }

  getTodosForToday(params: any) {
    return this.http.post('todos/today', params);
  }

  markAsDone(params: any) {
    return this.http.post('todos/mark-as-done', params);
  }
}
