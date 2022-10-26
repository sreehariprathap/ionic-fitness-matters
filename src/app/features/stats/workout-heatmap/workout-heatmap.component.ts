import { Component, ViewEncapsulation, OnInit } from '@angular/core';
import { HeatMap } from '@syncfusion/ej2-heatmap';
@Component({
  selector: 'app-workout-heatmap',
  templateUrl: './workout-heatmap.component.html',
  styleUrls: ['./workout-heatmap.component.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class WorkoutHeatmapComponent implements OnInit {
  // Data for heatmap
  dataSource: object[] = [
    [45, 7, 53, 81, 95, 79, 10],
    [25, 17, 3, 81, 35, 19, 20],
    [5, 27, 33, 21, 15, 39, 30],
    [85, 27, 53, 81, 85, 29, 40],
    [45, 7, 83, 21, 95, 89, 50],
  ];
  xAxis: object = {
    labels: ['1-7', '8-14', '15-21', '22-28', '29-31'],
  };
  yAxis: object = {
    labels: [
      'Monday',
      'Tuesday',
      'Wednesday',
      'Thursday',
      'Friday',
      'Saturday',
      'Sunday',
    ],
  };
  public paletteSettings: object = {
    palette: [{ color: '#f1faee' }, { color: '#c7f9cc' }, { color: '#2ec4b6' }],
  };
  public cellSettings: object = {
    border: {
      width: 1,
      radius: 4,
      color: 'white',
    },
  };
  constructor() {}

  ngOnInit() {}
}
