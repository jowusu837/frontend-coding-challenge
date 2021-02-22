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
  providers: Array<any>,
  directContractors: Array<any>,
  total: Array<any>
}
