import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { HotToastModule } from '@ngneat/hot-toast';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';



@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    HttpClientModule,
    HotToastModule.forRoot(),
    BrowserAnimationsModule,
  ],
  exports: [CommonModule, BrowserAnimationsModule, HttpClientModule],
})
export class CoreModule { }
