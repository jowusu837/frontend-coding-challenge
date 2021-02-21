import {Component, OnInit} from '@angular/core';
import {map} from 'rxjs/operators';
import {BackendService} from "../services/backend.service";
import {Observable} from "rxjs";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  data$: Observable<{ total: any; items: any[] }> | undefined;

  constructor(private backendService: BackendService) {
  }

  ngOnInit(): void {
    this.data$ = this.backendService.getLabourStats()
      .pipe(
        map(res => ({
          items: [...res.directContractors, ...res.providers],
          total: res.total[0]
        }))
      )
  }
}
