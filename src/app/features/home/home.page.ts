import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { IonModal } from '@ionic/angular';
import { HotToastService } from '@ngneat/hot-toast';
import { Subject } from 'rxjs';
import { CalorieService } from 'src/app/core/services/calorie.service';
import { TodoService } from 'src/app/core/services/todo.service';
@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
})
export class HomePage implements OnInit {
  @ViewChild('foodModal') foodModal: IonModal;
  @ViewChild('workoutModal') workoutModal: IonModal;
  @ViewChild('todoModal') todoModal: IonModal;
  @ViewChild('waterModal') waterModal: IonModal;
  foodForm: FormGroup;
  userId: number = +localStorage.getItem('user_id');
  workoutForm: FormGroup;
  todoForm: FormGroup;

  clickSubject: Subject<any> = new Subject();
  notifyClick() {
    this.clickSubject.next(1);
  }

  // eslint-disable-next-line @typescript-eslint/member-ordering
  constructor(
    private readonly formBuilder: FormBuilder,
    private readonly calorieService: CalorieService,
    private readonly toast: HotToastService,
    private readonly todoService: TodoService
  ) {}

  ngOnInit() {
    this.initFoodIntakeForm();
    this.initWorkoutForm();
    this.initAddTodoForm();
  }

  initFoodIntakeForm() {
    this.foodForm = this.formBuilder.group({
      userId: this.userId,
      calories: ['', Validators.required],
      foodIntake: ['', Validators.required],
    });
  }

  addFood() {
    this.calorieService.addFood(this.foodForm.value).subscribe((data) => {
      console.log(data);
      this.toast.success('food added successfully');
      this.foodModal.dismiss();
      window.location.reload();
    });
  }

  initWorkoutForm() {
    this.workoutForm = this.formBuilder.group({
      userId: this.userId,
      caloriesBurned: ['', Validators.required],
      workoutName: ['', Validators.required],
    });
  }

  initAddTodoForm() {
    this.todoForm = this.formBuilder.group({
      userId: this.userId,
      title: ['', Validators.required],
      description: ['', Validators.required],
      status: true,
      date: ['', Validators.required],
    });
  }

  addTodo() {
    this.todoService.addTodo(this.todoForm.value).subscribe((data) => {
      this.toast.success('todo added successfully');
      this.todoModal.dismiss();
      this.clickSubject.next(1);
    });
  }

  addWorkout() {
    this.calorieService.addWorkout(this.workoutForm.value).subscribe((data) => {
      this.toast.success('workout added successfully');
      this.workoutModal.dismiss();
    });
  }

  cancel() {
    this.foodModal.dismiss(null, 'cancel');
    this.workoutModal.dismiss(null, 'cancel');
    this.todoModal.dismiss(null, 'cancel');
  }

  confirm() {
    this.foodModal.dismiss(null, 'confirm');
    this.workoutModal.dismiss(null, 'confirm');
    this.todoModal.dismiss(null, 'confirm');
  }

  onWillDismiss(event: Event) {
    this.foodForm.reset();
    this.workoutForm.reset();
    this.todoForm.reset();
  }
}
