import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Router } from '@angular/router';
import { BehaviorSubject, Observable, ObservedValueOf, Subject } from 'rxjs';
import { environment } from 'src/environments/environment';
import { UtilityService } from './utility.service';
@Injectable({
  providedIn: 'root',
})
export class ReferenceService {
  public eodDDMMYYY: string = '';
  public eod: BehaviorSubject<string> = new BehaviorSubject<string>('');
  public eodDate = this.eod.asObservable();

  public getEod() {
    return this.eodDate;
  }
  setEodDate(date: any) {
    this.eodDDMMYYY = this.us.convertTodayTostrDDMMYYYY(date);
    this.eod.next(date);
  }

  //to return the dd-MM-YYYY format of EOD
  getEODDDMMYYYY() {
    return this.eodDDMMYYY;
  }

  constructor(private http: HttpClient, private us: UtilityService) {}

  getPaymentModes(mode: string): Observable<any> {
    let headers = new HttpHeaders();
    headers.append('Content-Type', 'application/json');
    // return this.http.get(environment.apiUrl + 'billing/'+inv_no,
    //   { headers: headers })
    return this.http.get(environment.apiUrl + 'references/' + mode, {
      headers: headers,
    });
  }

  getBranchList(): Observable<any> {
    let org_id = localStorage.getItem('org_id');
    let headers = new HttpHeaders();
    headers.append('Content-Type', 'application/json');
    return this.http.get(environment.apiUrl + 'branches/'+org_id, {
      headers: headers,
    });
  }

  public getEodDetailData(): Observable<any> {
    let org_id = localStorage.getItem('org_id');
    let branch_id = localStorage.getItem('branch_id');
    let headers = new HttpHeaders();
    headers.append('Content-Type', 'application/json');
    return this.http.get(
      environment.apiUrl + 'eodinfo/' + org_id + '/' + branch_id,
      { headers: headers }
    );
  }

  fetchBuList(): Observable<any> {
    let org_id = localStorage.getItem('org_id');
    let headers = new HttpHeaders();
    headers.append('Content-Type', 'application/json');
    return this.http.get(environment.apiUrl + 'business/' + org_id, {
      headers: headers,
    });
  }

  // fetch doctot list from branch id
  fetchDoctors(): Observable<any> {
    let branch_id = localStorage.getItem('branch_id');
    let headers = new HttpHeaders();
    headers.append('Content-Type', 'application/json');
    return this.http.get(environment.apiUrl + 'doctors/' + branch_id, {
      headers: headers,
    });
  }

  // fetch Acc master
  fetchAcMaster(): Observable<any> {
    let org = localStorage.getItem('org_id');
    let headers = new HttpHeaders();
    headers.append('Content-Type', 'application/json');
    return this.http.get(environment.apiUrl + 'accounts/' + org, {
      headers: headers,
    });
  }
  //http://192.46.215.71:4003/v1/users/KRC/KRC0001
  // fetch emp list
  fetchUsers(): Observable<any> {
    let org_id = localStorage.getItem('org_id');
    let branch_id = localStorage.getItem('branch_id');
    let headers = new HttpHeaders();
    headers.append('Content-Type', 'application/json');
    return this.http.get(
      environment.apiUrl + 'users/' + org_id + '/' + branch_id,
      { headers: headers }
    );
  }

  fetchProducts(bu: any): Observable<any> {
    let org_id = localStorage.getItem('org_id');
    let branch_id = localStorage.getItem('branch_id');
    let headers = new HttpHeaders();
    headers.append('Content-Type', 'application/json');
    return this.http.get(
      environment.apiUrl + 'productmaster/' + org_id + '?bu_id=' + bu,
      { headers: headers }
    );
  }

  getPatientTypes(): Observable<any> {
    let org_id = localStorage.getItem('org_id');
    let headers = new HttpHeaders();
    headers.append('Content-Type', 'application/json');
    return this.http.get(environment.apiUrl + 'references/PATTYP');
  }

  getBillingTypes(): Observable<any> {
    let org_id = localStorage.getItem('org_id');
    let headers = new HttpHeaders();
    headers.append('Content-Type', 'application/json');
    return this.http.get(environment.apiUrl + 'references/PRDTYP');
  }

  getSupplierDetails(prod_id: string): Observable<any> {
    let org_id = localStorage.getItem('org_id');
    let headers = new HttpHeaders();
    headers.append('Content-Type', 'application/json');
    return this.http.get(
      environment.apiUrl + 'supplierproductdetail/' + prod_id
    );
  }
  fetchHeader(patient_id: string): Observable<any> {
    let headers = new HttpHeaders();
    headers.append('Content-Type', 'application/json');
    return this.http.get(environment.apiUrl + 'patientheader/' + patient_id, {
      headers: headers,
    });
  }


  getSchedule(): Observable<any> {   
    let headers = new HttpHeaders();
    headers.append('Content-Type', 'application/json');
    return this.http.get(environment.apiUrl + 'references/Schedule');
  }

  public getFiles(pid: string, heading: string): Observable<any> {
    let org_id = localStorage.getItem('org_id');
    let branch_id = localStorage.getItem('branch_id');
    let headers = new HttpHeaders();
    headers.append('Content-Type', 'application/json');

    let url =
      environment.apiUrl +
      'fetchfiles/' +
      org_id +
      '/' +
      branch_id +
      '/' +
      pid +
      '?heading=' +
      heading;

    return this.http.get(url, {
      headers: headers,
    });
  }

  
  createUpdateRefDesc(params: any):Observable<any> {
    let headers= new HttpHeaders();
    headers.append('content-Type', 'application/json');
    return this.http.post(environment.apiUrl + 'createreference', params,
    { headers: headers })
}
}
