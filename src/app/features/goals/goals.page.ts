import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { IonModal } from '@ionic/angular';
import { HotToastService } from '@ngneat/hot-toast';
import { GoalService } from 'src/app/core/services/goal.service';

@Component({
  selector: 'app-goals',
  templateUrl: './goals.page.html',
  styleUrls: ['./goals.page.scss'],
})
export class GoalsPage implements OnInit {
  @ViewChild(IonModal) modal: IonModal;
  userId: number = +localStorage.getItem('user_id');

  message =
    'This modal example uses triggers to automatically open a modal when the button is clicked.';
  name: string;
  goalForm: FormGroup;
  goals: any[];

  constructor(
    private readonly formBuilder: FormBuilder,
    private readonly toast: HotToastService,
    private readonly goalService: GoalService
  ) {}

  ngOnInit() {
    this.initAddGoalForm();
    this.getAllGoals();
  }

  initAddGoalForm() {
    this.goalForm = this.formBuilder.group({
      userId: this.userId,
      title: ['', Validators.required],
      description: ['', Validators.required],
      status: 'Not started',
      year: ['', Validators.required],
    });
  }

  addGoal() {
    this.goalService.addGoal(this.goalForm.value).subscribe((data) => {
      this.toast.success('goal added successfully');
      this.modal.dismiss();
      this.getAllGoals();
    });
  }

  getAllGoals() {
    this.goalService.getAllGoals({ id: this.userId }).subscribe((data: any) => {
      console.log(data.goals);
      this.goals = data.goals;
    });
  }

  cancel() {
    this.modal.dismiss(null, 'cancel');
  }

  changeStatus($event, goalId) {
    const newStatus = $event.target.value;
    this.goalService
      .changeStatus({ id: goalId, status: newStatus })
      .subscribe((data) => {
        console.log(data);
      });
  }
}
