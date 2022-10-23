import { Component, Input, OnInit } from '@angular/core';
import { TodoService } from 'src/app/core/services/todo.service';

@Component({
  selector: 'app-todos',
  templateUrl: './todos.component.html',
  styleUrls: ['./todos.component.scss'],
})
export class TodosComponent implements OnInit {
  @Input() item = ''; // decorate the property with @Input()
  todos: any[];

  constructor(private readonly todoService: TodoService) {}

  ngOnInit() {
    this.getTodosForToday();
  }



  getTodosForToday() {
    const userId = localStorage.getItem('user_id');
    this.todoService
      .getTodosForToday({ id: +userId })
      .subscribe((data: any) => {
        this.todos = data.todasTodos.filter((datum) => datum.status);
      });
  }

  markAsDone(id: number) {
    this.todoService.markAsDone({ id: +id }).subscribe((data: any) => {
      this.getTodosForToday();
    });
  }
}
