import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { GoalsPageRoutingModule } from './goals-routing.module';

import { GoalsPage } from './goals.page';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { ExploreContainerComponentModule } from 'src/app/explore-container/explore-container.module';
import { HeaderComponent } from 'src/app/core/components/header/header.component';
import { DailyGoalsComponent } from './daily-goals/daily-goals.component';

@NgModule({
  imports: [
    IonicModule,
    CommonModule,
    FormsModule,
    ExploreContainerComponentModule,
    ReactiveFormsModule,
    FontAwesomeModule,
    GoalsPageRoutingModule
  ],
  declarations: [ GoalsPage, DailyGoalsComponent,HeaderComponent],
})
export class GoalsPageModule {}
