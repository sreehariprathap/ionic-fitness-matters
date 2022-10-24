import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { StatsPageRoutingModule } from './stats-routing.module';

import { StatsPage } from './stats.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    StatsPageRoutingModule,
    ReactiveFormsModule,
  ],
  exports: [ReactiveFormsModule],
  declarations: [],
})
export class StatsPageModule {}
