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
  private labourStats$: Observable<LabourStats>;
  tableData: Stats[] = [];
  total: Stats[] = [];
  fixedTableRows: Stats[] = [];
  sortedColumn = 1;

  constructor(private backendService: BackendService) {
    this.labourStats$ = this.backendService.getLabourStats();
  }

  ngOnInit(): void {
    this.labourStats$.subscribe(() => this.sortByPayrollProvider(SortDirection.DESCENDING))
  }

  sortByPayrollProvider(sortDirection: string) {
    const sortFn = (a: Stats, b: Stats) => sortDirection === SortDirection.ASCENDING ? a.name.localeCompare(b.name) : b.name.localeCompare(a.name);
    this.labourStats$.subscribe(stats => {
      this.fixedTableRows = stats.directContractors;
      this.tableData = stats.providers.sort(sortFn);
      this.total = stats.total;
      this.sortedColumn = 1;
    });
  }

  sortByWorker(sortDirection: string) {
    const sortFn = (a: Stats, b: Stats) => sortDirection === SortDirection.ASCENDING ? a.workerCount - b.workerCount : b.workerCount - a.workerCount;
    this.labourStats$.subscribe(stats => {
      this.fixedTableRows = [];
      this.tableData = [...stats.directContractors, ...stats.providers].sort(sortFn);
      this.sortedColumn = 2;
    });
  }

  sortByComplianceScore(sortDirection: string) {
    const sortFn = (a: Stats, b: Stats) => sortDirection === SortDirection.ASCENDING ? this.computeComplianceScore(a) - this.computeComplianceScore(b) : this.computeComplianceScore(b) - this.computeComplianceScore(a);
    this.labourStats$.subscribe(stats => {
      this.fixedTableRows = [];
      this.tableData = [...stats.directContractors, ...stats.providers].sort(sortFn);
      this.sortedColumn = 3;
    });
  }

  sortByGrossPay(sortDirection: string) {
    const sortFn = (a: Stats, b: Stats) => sortDirection === SortDirection.ASCENDING ? a.grossPayTotal - b.grossPayTotal : b.grossPayTotal - a.grossPayTotal;
    this.labourStats$.subscribe(stats => {
      this.fixedTableRows = [];
      this.tableData = [...stats.directContractors, ...stats.providers].sort(sortFn);
      this.sortedColumn = 4;
    });
  }

  sortByPayrollAdmin(sortDirection: string) {
    const sortFn = (a: Stats, b: Stats) => sortDirection === SortDirection.ASCENDING ? a.payrollAdminTotal - b.payrollAdminTotal : b.payrollAdminTotal - a.payrollAdminTotal;
    this.labourStats$.subscribe(stats => {
      this.fixedTableRows = [];
      this.tableData = [...stats.directContractors, ...stats.providers].sort(sortFn);
      this.sortedColumn = 5;
    });
  }

  sortByLabourCost(sortDirection: string) {
    const sortFn = (a: Stats, b: Stats) => sortDirection === SortDirection.ASCENDING ? a.labourCostTotal - b.labourCostTotal : b.labourCostTotal - a.labourCostTotal;
    this.labourStats$.subscribe(stats => {
      this.fixedTableRows = [];
      this.tableData = [...stats.directContractors, ...stats.providers].sort(sortFn);
      this.sortedColumn = 6;
    });
  }

  sortByWorkForce(sortDirection: string) {
    const sortFn = (a: Stats, b: Stats) => sortDirection === SortDirection.ASCENDING ? this.computeWorkForce(a) - this.computeWorkForce(b) : this.computeWorkForce(b) - this.computeWorkForce(a);
    this.labourStats$.subscribe(stats => {
      this.fixedTableRows = [];
      this.tableData = [...stats.directContractors, ...stats.providers].sort(sortFn);
      this.sortedColumn = 7;
    });
  }

  computeComplianceScore(stats: Stats) {
    return stats.complianceStats ? stats.complianceStats.Total / 100 : 0;
  }

  computeWorkForce(stats: Stats) {
    return (stats.workerCount / this.total[0].workerCount);
  }

  getClassesForColumn(columnIndex: number, borderRight = false, textBig = false, textRight = false) {
    return {
      'border-right': borderRight,
      'text-darker': this.sortedColumn === columnIndex,
      'text-big': textBig,
      'text-right': textRight
    };
  }
}
