import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { StatsPageRoutingModule } from './stats-routing.module';

import { StatsPage } from './stats.page';
import { ExploreContainerComponentModule } from 'src/app/explore-container/explore-container.module';
import { NgxEchartsModule } from 'ngx-echarts';
import { HeaderComponent } from 'src/app/core/components/header/header.component';
import { WeightTrackerComponent } from './weight-tracker/weight-tracker.component';

@NgModule({
  imports: [
    IonicModule,
    CommonModule,
    FormsModule,
    ExploreContainerComponentModule,
    StatsPageRoutingModule,
    ReactiveFormsModule,
    NgxEchartsModule.forRoot({
      /**
       * This will import all modules from echarts.
       * If you only need custom modules,
       * please refer to [Custom Build] section.
       */
      echarts: () => import('echarts'), // or import('./path-to-my-custom-echarts')
    }),
  ],
  exports: [ReactiveFormsModule],
  declarations: [StatsPage, HeaderComponent, WeightTrackerComponent],
})
export class StatsPageModule {}
