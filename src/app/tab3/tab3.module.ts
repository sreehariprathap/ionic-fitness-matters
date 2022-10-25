import { IonicModule } from '@ionic/angular';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Tab3Page } from './tab3.page';
import { ExploreContainerComponentModule } from '../explore-container/explore-container.module';

import { Tab3PageRoutingModule } from './tab3-routing.module';
import { StatsPage } from '../features/stats/stats.page';
import { HeaderComponent } from '../core/components/header/header.component';
import { WeightTrackerComponent } from '../features/stats/weight-tracker/weight-tracker.component';
import { NgxEchartsModule } from 'ngx-echarts';

@NgModule({
  imports: [
    IonicModule,
    CommonModule,
    FormsModule,
    ExploreContainerComponentModule,
    Tab3PageRoutingModule,
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
  declarations: [Tab3Page, StatsPage, HeaderComponent, WeightTrackerComponent],
})
export class Tab3PageModule {}
