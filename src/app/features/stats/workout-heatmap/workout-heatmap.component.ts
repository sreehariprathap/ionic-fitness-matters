import { Component, ViewEncapsulation, OnInit } from '@angular/core';
import { HeatMap } from '@syncfusion/ej2-heatmap';
import { CalorieService } from 'src/app/core/services/calorie.service';
@Component({
  selector: 'app-workout-heatmap',
  templateUrl: './workout-heatmap.component.html',
  styleUrls: ['./workout-heatmap.component.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class WorkoutHeatmapComponent implements OnInit {
  userId: number = +localStorage.getItem('user_id');
  monthData = [
    0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
    0, 0, 0, 0, 0, 0,0,0,0,0
  ];
  // Data for heatmap
  dataSource: object[] = [];
  xAxis: object = {
    labels: ['Week 1', 'Week 2', 'Week 3', 'Week 4', 'Week 5'],
  };
  yAxis: object = {
    labels: ['Day 1', 'Day 2', 'Day 3', 'Day 4', 'Day 5', 'Day 6', 'Day 7'],
  };
  public paletteSettings: object = {
    palette: [{ color: '#1f1f1f' }, { color: '#c7f9cc' }, { color: '#2ec4b6' }],
  };
  public cellSettings: object = {
    border: {
      width: 1,
      // radius: 4,
      color: '#1f1f1f',
    },
  };

  constructor(private readonly calorieService: CalorieService) {}

  ngOnInit() {
    this.getHeatMapData();
  }

  // get the date and workout data to populate heat map with calories burned
  getHeatMapData() {
    const filterDate = this.startOfMonth(new Date()).toString();
    this.calorieService
      .getWorkoutHeatMapData({ id: +this.userId, date: filterDate })
      .subscribe((items: any) => {
        items.workouts.forEach((workout) => {
          workout.date = new Date(workout.createAt);
          const day = workout.createAt.toString().slice(8, 10);
          this.monthData[day - 1] += +workout.caloriesBurned;
        });
        this.dataSource = this.sliceIntoChunks(this.monthData, 7);
      });
  }

  //split month into weeks function
  sliceIntoChunks(arr, chunkSize) {
    const res = [];
    for (let i = 0; i < arr.length; i += chunkSize) {
      const chunk = arr.slice(i, i + chunkSize);
      res.push(chunk);
    }
    return res;
  }

  //Get start date of a month
  startOfMonth(date) {
    return new Date(date.getFullYear(), date.getMonth(), 1);
  }
}
