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
  @ViewChild('foodModal') foodModal: IonModal;
  @ViewChild('workoutModal') workoutModal: IonModal;
  @ViewChild('waterModal') waterModal: IonModal;
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

  addFood() {
    console.log(this.foodForm.value);
    this.calorieService.addFood(this.foodForm.value).subscribe((data) => {
      console.log(data);
      this.toast.success('food added successfully');
      this.foodModal.dismiss();
    });
  }

  initWorkoutForm() {
    this.workoutForm = this.formBuilder.group({
      userId: this.userId,
      caloriesBurned: ['', Validators.required],
      workoutName: ['', Validators.required],
    });
  }

  addWorkout() {
    console.log(this.workoutForm.value);
    this.calorieService.addWorkout(this.workoutForm.value).subscribe((data) => {
      console.log(data);
      this.toast.success('workout added successfully');
      this.workoutModal.dismiss();
    });
  }

  cancel() {
    this.foodModal.dismiss(null, 'cancel');
    this.workoutModal.dismiss(null, 'cancel');
  }

  confirm() {
    this.foodModal.dismiss(null, 'confirm');
    this.workoutModal.dismiss(null, 'confirm');
    this.foodModal.dismiss(null, 'confirm');
  }

  onWillDismiss(event: Event) {
    console.log(event);
    this.foodForm.reset();
    this.workoutForm.reset();
  }
}
