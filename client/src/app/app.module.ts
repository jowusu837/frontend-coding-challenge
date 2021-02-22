import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';

import {AppComponent} from './app.component';
import {HttpClientModule} from "@angular/common/http";
import {BackendService} from "../services/backend.service";
import { SortableDirective } from './sortable.directive';

@NgModule({
  declarations: [
    AppComponent,
    SortableDirective
  ],
  imports: [
    BrowserModule,
    HttpClientModule
  ],
  providers: [BackendService],
  bootstrap: [AppComponent]
})
export class AppModule {
}
