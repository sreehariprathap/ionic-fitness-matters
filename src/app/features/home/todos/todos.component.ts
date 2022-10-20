import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-todos',
  templateUrl: './todos.component.html',
  styleUrls: ['./todos.component.scss'],
})
export class TodosComponent implements OnInit {
  todos = [
    {
      id: 1,
      value: 'Workout from 6PM-8PM',
      status: true,
    },
    {
      id: 2,
      value: 'Study from 9PM',
      status: true,
    },
    {
      id: 3,
      value: 'eat an egg as dinner',
      status: true,
    },
  ];
  constructor() {}

  ngOnInit() {}

  markAsDone(item) {
    item.status = !item.status;
  }
}
