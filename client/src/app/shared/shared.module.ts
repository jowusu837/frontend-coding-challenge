import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {HttpClientModule} from "@angular/common/http";
import {BackendService} from "./services/backend.service";
import {SortableComponent} from './components/sortable/sortable.component';


@NgModule({
  declarations: [
    SortableComponent
  ],
  imports: [
    CommonModule,
    HttpClientModule
  ],
  providers: [BackendService],
  exports: [
    SortableComponent
  ]
})
export class SharedModule {
}
