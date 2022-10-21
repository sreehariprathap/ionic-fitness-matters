import { IonicModule } from '@ionic/angular';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Tab1Page } from './tab1.page';
import { ExploreContainerComponentModule } from '../explore-container/explore-container.module';

import { Tab1PageRoutingModule } from './tab1-routing.module';
import { HeaderComponent } from '../core/components/header/header.component';
import { HomePage } from '../features/home/home.page';
import { TodosComponent } from '../features/home/todos/todos.component';
import { StatsComponent } from '../features/home/stats/stats.component';

import { NgCircleProgressModule } from 'ng-circle-progress';

@NgModule({
  imports: [
    IonicModule,
    CommonModule,
    FormsModule,
    ExploreContainerComponentModule,
    Tab1PageRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    // Specify ng-circle-progress as an import
    NgCircleProgressModule.forRoot(),
  ],
  exports: [ReactiveFormsModule],
  declarations: [
    Tab1Page,
    HeaderComponent,
    HomePage,
    TodosComponent,
    StatsComponent,
  ],
})
export class Tab1PageModule {}
