import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';

import { HomePageRoutingModule } from './home-routing.module';
import { TodosComponent } from './todos/todos.component';
import { NgCircleProgressModule } from 'ng-circle-progress';
import { ExploreContainerComponentModule } from 'src/app/explore-container/explore-container.module';
import { HeaderComponent } from 'src/app/core/components/header/header.component';
import { HomePage } from './home.page';
import { StatsComponent } from './stats/stats.component';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';

@NgModule({
  imports: [
    IonicModule,
    CommonModule,
    FormsModule,
    ExploreContainerComponentModule,
    HomePageRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    // Specify ng-circle-progress as an import
    NgCircleProgressModule.forRoot(),
    FontAwesomeModule
  ],
  exports: [ReactiveFormsModule],
  declarations: [
    HomePage,
    TodosComponent,
    StatsComponent,
    HeaderComponent
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class HomePageModule {}
