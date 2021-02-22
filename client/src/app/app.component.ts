import {Component, OnInit} from '@angular/core';
import {Observable} from "rxjs";
import {BackendService, LabourStats, Stats} from "./shared/services/backend.service";
import {SortDirection} from "./shared/components/sortable/sortable.component";

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
  sortColumn = 1;

  constructor(private backendService: BackendService) {
    this.data$ = this.backendService.getLabourStats();
  }

  ngOnInit(): void {
    this.data$.subscribe(() => this.sortByPayrollProvider(SortDirection.DESCENDING))
  }

  sortByPayrollProvider(sortDirection: string) {
    const sortFn = (a: Stats, b: Stats) => sortDirection === SortDirection.DESCENDING ? a.name.localeCompare(b.name) : b.name.localeCompare(a.name);
    this.data$.subscribe(stats => {
      this.fixedTableRows = stats.directContractors;
      this.tableData = stats.providers.sort(sortFn);
      this.total = stats.total;
    });
  }
}
