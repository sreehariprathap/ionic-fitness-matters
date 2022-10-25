import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { IonModal } from '@ionic/angular';
import { HotToastService } from '@ngneat/hot-toast';
import { CalorieService } from 'src/app/core/services/calorie.service';

@Component({
  selector: 'app-stats',
  templateUrl: './stats.page.html',
  styleUrls: ['./stats.page.scss'],
})
export class StatsPage implements OnInit {
  @ViewChild(IonModal) modal: IonModal;
  weightTrackerForm: FormGroup;
  userId: number = +localStorage.getItem('user_id');

  constructor(
    private readonly formBuilder: FormBuilder,
    private readonly toast: HotToastService,
    private readonly calorieService: CalorieService
  ) {}

  ngOnInit() {
    this.initWeightTrackerForm();
  }

  initWeightTrackerForm() {
    this.weightTrackerForm = this.formBuilder.group({
      userId: this.userId,
      weight: ['', Validators.required],
    });
  }

  addWeight() {
    this.calorieService
      .addWeight(this.weightTrackerForm.value)
      .subscribe((data) => {
        this.toast.success('weight added successfully');
        this.modal.dismiss();
      });
  }

  cancel() {
    this.modal.dismiss(null, 'cancel');
  }
}
