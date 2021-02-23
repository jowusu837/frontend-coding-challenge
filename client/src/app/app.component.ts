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
    const sortFn = (a: Stats, b: Stats) => sortDirection === SortDirection.ASCENDING ? a.name.localeCompare(b.name) : b.name.localeCompare(a.name);
    this.data$.subscribe(stats => {
      this.fixedTableRows = stats.directContractors;
      this.tableData = stats.providers.sort(sortFn);
      this.total = stats.total;
      this.sortColumn = 1;
    });
  }

  sortByWorker(sortDirection: string) {
    const sortFn = (a: Stats, b: Stats) => sortDirection === SortDirection.ASCENDING ? a.workerCount - b.workerCount : b.workerCount - a.workerCount;
    this.data$.subscribe(stats => {
      this.fixedTableRows = [];
      this.tableData = [...stats.directContractors, ...stats.providers].sort(sortFn);
      this.sortColumn = 2;
    });
  }

  sortByComplianceScore(sortDirection: string) {
    const sortFn = (a: Stats, b: Stats) => sortDirection === SortDirection.ASCENDING ? this.computeComplianceScore(a) - this.computeComplianceScore(b) : this.computeComplianceScore(b) - this.computeComplianceScore(a);
    this.data$.subscribe(stats => {
      this.fixedTableRows = [];
      this.tableData = [...stats.directContractors, ...stats.providers].sort(sortFn);
      this.sortColumn = 3;
    });
  }

  sortByGrossPay(sortDirection: string) {
    const sortFn = (a: Stats, b: Stats) => sortDirection === SortDirection.ASCENDING ? a.grossPayTotal - b.grossPayTotal : b.grossPayTotal - a.grossPayTotal;
    this.data$.subscribe(stats => {
      this.fixedTableRows = [];
      this.tableData = [...stats.directContractors, ...stats.providers].sort(sortFn);
      this.sortColumn = 4;
    });
  }

  sortByPayrollAdmin(sortDirection: string) {
    const sortFn = (a: Stats, b: Stats) => sortDirection === SortDirection.ASCENDING ? a.payrollAdminTotal - b.payrollAdminTotal : b.payrollAdminTotal - a.payrollAdminTotal;
    this.data$.subscribe(stats => {
      this.fixedTableRows = [];
      this.tableData = [...stats.directContractors, ...stats.providers].sort(sortFn);
      this.sortColumn = 5;
    });
  }

  sortByLabourCost(sortDirection: string) {
    const sortFn = (a: Stats, b: Stats) => sortDirection === SortDirection.ASCENDING ? a.labourCostTotal - b.labourCostTotal : b.labourCostTotal - a.labourCostTotal;
    this.data$.subscribe(stats => {
      this.fixedTableRows = [];
      this.tableData = [...stats.directContractors, ...stats.providers].sort(sortFn);
      this.sortColumn = 6;
    });
  }

  sortByWorkForce(sortDirection: string) {
    const sortFn = (a: Stats, b: Stats) => sortDirection === SortDirection.ASCENDING ? this.computeWorkForce(a) - this.computeWorkForce(b) : this.computeWorkForce(b) - this.computeWorkForce(a);
    this.data$.subscribe(stats => {
      this.fixedTableRows = [];
      this.tableData = [...stats.directContractors, ...stats.providers].sort(sortFn);
      this.sortColumn = 7;
    });
  }

  computeComplianceScore(stats: Stats) {
    return stats.complianceStats ? stats.complianceStats.Total / 100 : 0;
  }

  computeWorkForce(stats: Stats) {
    return (stats.workerCount / this.total[0].workerCount);
  }
}
