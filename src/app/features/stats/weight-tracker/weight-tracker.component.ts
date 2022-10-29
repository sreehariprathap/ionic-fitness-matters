import { Component, Input, OnInit } from '@angular/core';
import { Subject } from 'rxjs';
import { CalorieService } from 'src/app/core/services/calorie.service';

import LinearGradient from 'zrender/lib/graphic/LinearGradient';

@Component({
  selector: 'app-weight-tracker',
  templateUrl: './weight-tracker.component.html',
  styleUrls: ['./weight-tracker.component.scss'],
})
export class WeightTrackerComponent implements OnInit {
  // eslint-disable-next-line @angular-eslint/no-input-rename
  @Input('weightSubject') weightSubject: Subject<any>;

  options: any;
  weightHistory: any;
  userId: number = +localStorage.getItem('user_id');
  dataAxis = [];
  data = [];
  yMax;
  weight = 0;

  constructor(private readonly calorieService: CalorieService) {}

  ngOnInit() {
    this.getWeightHistory();
    this.weightSubject.subscribe((e) => {
      this.getWeightHistory();
      console.log('hello');
    });

    const dataShadow = [];
    // tslint:disable-next-line: prefer-for-of
    // eslint-disable-next-line @typescript-eslint/prefer-for-of
    for (let i = 0; i < this.data.length; i++) {
      dataShadow.push(this.yMax);
    }

    this.options = {
      xAxis: {
        data: this.dataAxis,
        axisLabel: {
          inside: false,
          color: '#fff',
        },
        axisTick: {
          show: false,
        },
        axisLine: {
          show: false,
        },
        z: 10,
      },
      yAxis: {
        axisLine: {
          show: false,
        },
        axisTick: {
          show: false,
        },
        axisLabel: {
          color: '#999',
        },
      },
      dataZoom: [
        {
          type: 'inside',
        },
      ],
      series: [
        {
          // For shadow
          type: 'bar',
          itemStyle: {
            color: 'rgba(0,0,0,0.05)',
          },
          barGap: '-100%',
          barCategoryGap: '40%',
          data: dataShadow,
          animation: false,
        },
        {
          type: 'bar',
          itemStyle: {
            color: new LinearGradient(0, 0, 0, 1, [
              { offset: 0, color: '#ffccd5' },
              { offset: 0.5, color: '#ff499e' },
              { offset: 1, color: '#FF006E' },
            ]),
          },
          emphasis: {
            itemStyle: {
              color: new LinearGradient(0, 0, 0, 1, [
                { offset: 0, color: '#2378f7' },
                { offset: 0.7, color: '#2378f7' },
                { offset: 1, color: '#83bff6' },
              ]),
            },
          },
          data: this.data,
        },
      ],
    };
  }

  getWeightHistory() {
    this.calorieService
      .getWeightHistory({ id: this.userId })
      .subscribe((data: any) => {
        this.weightHistory = data.weights.slice(0, 10);
        this.weightHistory.forEach((element) => {
          element.createAt = new Date(element.createAt);
          element.date = element.createAt.getUTCDate();
          this.dataAxis.push(element.date);
          this.data.push(element.weight);
          this.yMax = Math.max(...this.data) + 10;
        });
      });
  }

  onChartEvent(event, value) {
    if (value === 'chartClick') {
      this.weight = event.value;
    }
    if (value === 'chartMouseOut') {
      this.weight = 0;
    }
  }
}
