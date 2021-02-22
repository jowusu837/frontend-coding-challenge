import {Injectable} from "@angular/core";
import {HttpClient} from "@angular/common/http";
import {map} from 'rxjs/operators';

@Injectable()
export class BackendService {
  constructor(private http: HttpClient) {}

  getLabourStats() {
    return this.http.get<Array<LabourStats>>('http://localhost:6502/application/labourstats')
      .pipe(map(response => response[0]));
  }

}

export interface LabourStats {
  providers: Array<Stats>,
  directContractors: Array<Stats>,
  total: Array<Stats>
}

export interface ComplianceStats {
  OpsEmpStatusChecked: number,
  Total: number,
  TaxStatus: number,
  Identification: number,
  RightToWork: number,
  OpsChecked: number,
  Contract: number,
  EmpStatusReview: number
}

export interface Stats {
  rebatesTotal: number,
  grossPayTotal: number,
  workerCount: number,
  complianceStats: ComplianceStats,
  payrollAdminTotal: number,
  labourCostTotal: number,
  providerId: number,
  name: string
}
