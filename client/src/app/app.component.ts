import {Component, OnInit} from '@angular/core';
import {Observable} from "rxjs";
import {BackendService, LabourStats, Stats} from "./shared/services/backend.service";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  private data$: Observable<LabourStats>;
  tableData: Stats[] = [];
  total: Stats[] = [];
  fixedTableRows: Stats[] = [];

  constructor(private backendService: BackendService) {
    this.data$ = this.backendService.getLabourStats();
  }

  ngOnInit(): void {
    this.data$.subscribe(res => this.sortByPayrollProvider(res))
  }

  sortByPayrollProvider(stats: LabourStats) {
    this.fixedTableRows = stats.directContractors;
    this.tableData = stats.providers;
    this.total = stats.total;
  }
}
