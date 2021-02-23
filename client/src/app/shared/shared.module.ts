import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {HttpClientModule} from "@angular/common/http";
import {BackendService} from "./services/backend.service";
import {SortableComponent} from './components/sortable/sortable.component';
import {Over100Pipe} from "./pipes/over100/over100.pipe";
import {Dash0Pipe} from './pipes/dash0/dash0.pipe';


@NgModule({
  declarations: [
    SortableComponent,
    Over100Pipe,
    Dash0Pipe
  ],
  imports: [
    CommonModule,
    HttpClientModule
  ],
  providers: [BackendService],
  exports: [
    SortableComponent,
    Over100Pipe,
    Dash0Pipe
  ]
})
export class SharedModule {
}
