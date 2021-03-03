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

export class LabourStats {
  constructor(
    public providers: Array<Stats> = [],
    public directContractors: Array<Stats> = [],
    public total: Array<Stats> = []
  ) {
  }
}

export class ComplianceStats {
  constructor(
    public OpsEmpStatusChecked = 0,
    public Total = 0,
    public TaxStatus = 0,
    public Identification = 0,
    public RightToWork = 0,
    public OpsChecked = 0,
    public Contract = 0,
    public EmpStatusReview = 0
  ) {
  }

}

export class Stats {
  constructor(
    public rebatesTotal = 0,
    public grossPayTotal = 0,
    public workerCount = 0,
    public complianceStats = new ComplianceStats(),
    public payrollAdminTotal = 0,
    public labourCostTotal = 0,
    public providerId = 0,
    public name = ''
  ) {
  }

}
