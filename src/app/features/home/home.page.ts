import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { IonModal } from '@ionic/angular';
import { HotToastService } from '@ngneat/hot-toast';
import { CalorieService } from 'src/app/core/services/calorie.service';
@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
})
export class HomePage implements OnInit {
  @ViewChild(IonModal) modal: IonModal;
  foodForm: FormGroup;
  userId: number = +localStorage.getItem('user_id');
  workoutForm: FormGroup;

  constructor(
    private readonly formBuilder: FormBuilder,
    private readonly calorieService: CalorieService,
    private readonly toast: HotToastService
  ) {}

  ngOnInit() {
    this.initFoodIntakeForm();
    this.initWorkoutForm();
  }

  initFoodIntakeForm() {
    this.foodForm = this.formBuilder.group({
      userId: this.userId,
      calories: ['', Validators.required],
      foodIntake: ['', Validators.required],
    });
  }

  initWorkoutForm() {
    this.workoutForm = this.formBuilder.group({
      userId: this.userId,
      caloriesBurned: ['', Validators.required],
      workoutName: ['', Validators.required],
    });
  }

  addFood() {
    console.log(this.foodForm.value);
    this.calorieService.addFood(this.foodForm.value).subscribe((data) => {
      console.log(data);
      this.toast.success('food added successfully');
      this.modal.dismiss();
    });
  }

  addWorkout() {
    console.log(this.workoutForm.value);
    this.calorieService.addWorkout(this.workoutForm.value).subscribe((data) => {
      console.log(data);
      this.toast.success('workout added successfully');
      this.modal.dismiss();
    });
  }

  cancel() {
    this.modal.dismiss(null, 'cancel');
  }

  confirm() {
    this.modal.dismiss(null, 'confirm');
  }

  onWillDismiss(event: Event) {}
}
