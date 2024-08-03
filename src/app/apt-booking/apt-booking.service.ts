import { Injectable } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Router } from '@angular/router';
import { BehaviorSubject, Observable, Subject } from 'rxjs';
import { environment } from '../../environments/environment';

export type aptModel = {
  org_id: string;
  branch_id: string;
  patient_id: string;
  phone_no: string;
  patient_name: string;
  doctor_id: string;
  ailment: string;
  appoint_date: string;
  appoint_time: string;
  appoint_no: string;
  appoint_status: string;
  updated_by: string;
  updated_on: string;
  department_id: string;
  created_by: string;
  created_on: string;
  doctor_name: string;
  dept_id: string;
  dept_name: string;
  visit_no?:any;
  petHistoryBoolean: boolean;
  petVitalBoolean: boolean;
  petVisionBoolean: boolean;
  petAdnexaBoolean: boolean;
  petCorneaBoolean: boolean;
  petIOPBoolean: boolean;
  petPosteriorBoolean: boolean;
  petAntiriorBoolean: boolean;
  petAnteriorChamberBoolean: boolean;
  petFundusBoolean: boolean;
  petDiagnosisBoolean: boolean;
  petTreatmentBoolean: boolean;
  petMedicineBoolean: boolean;
  petLabBoolean: boolean;
};

@Injectable({
  providedIn: 'root',
})
export class AptBookingService {
  constructor(
    private authService: AuthService,
    private route: Router,
    private http: HttpClient
  ) {}

  //fetch patient details from mobile number
  fetchUserData(mobile_no: string): Observable<any> {
    let headers = new HttpHeaders();
    headers.append('Content-Type', 'application/json');
    return this.http.get(
      environment.apiUrl +
        'patients/' +
        localStorage.getItem('branch_id') +
        '?mobile_no=' +
        mobile_no,
      { headers: headers }
    );
  }

  bookApt(aptObj: any) {
    let headers = new HttpHeaders();
    headers.append('Content-Type', 'application/json');
    return this.http.post(environment.apiUrl + 'bookappointments', aptObj, {
      headers: headers,
    });
  }

  updateApt(updateObj: any) {
    let headers = new HttpHeaders();
    headers.append('Content-Type', 'application/json');
    return this.http.put(
      environment.apiUrl + 'updateappointment/' + updateObj.appoint_no,
      updateObj,
      { headers: headers }
    );
  }

  getCurrentAppointments(appointDate: string): any {
    let branch_id = localStorage.getItem('branch_id');
    let headers = new HttpHeaders();
    headers.append('Content-Type', 'application/json');
    return this.http.get(
      environment.apiUrl +
        'appointments/' +
        branch_id +
        '?appoint_date=' +
        appointDate,
      { headers: headers }
    );
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

  fetchDepartments(): Observable<any> {
    let headers = new HttpHeaders();
    headers.append('Content-Type', 'application/json');
    return this.http.get(
      environment.apiUrl +
        'fetchbranchdept/' +
        localStorage.getItem('org_id') +
        '/' +
        localStorage.getItem('branch_id'),
      {
        headers: headers,
      }
    );
  }

  // fetch doctot list from branch id
  fetchDoctorsByDept(dept: string | undefined): Observable<any> {
    let headers = new HttpHeaders();
    headers.append('Content-Type', 'application/json');
    return this.http.get(
      environment.apiUrl +
        'fetchdeptdoctor/' +
        localStorage.getItem('org_id') +
        '/' +
        localStorage.getItem('branch_id') +
        '/' +
        dept,
      {
        headers: headers,
      }
    );
  }

  getAppointments(payload: any): Observable<any> {
    let headers = new HttpHeaders();
    headers.append('Content-Type', 'application/json');
    // if (payload.field === 'phone_no') {
    //   return this.http.get(environment.apiUrl + 'appointments/' +localStorage.getItem('branch_id') +'?'+ payload.field + '=' + payload[payload.field], { headers: headers })
    // } else
    return this.http.get(
      environment.apiUrl +
        'appointments/' +
        localStorage.getItem('branch_id') +
        '?' +
        payload.field +
        '=' +
        payload[payload.field],
      { headers: headers }
    );
  }

  getAppointmentStatus(): Observable<any> {
    let headers = new HttpHeaders();
    headers.append('Content-Type', 'application/json');
    return this.http.get(environment.apiUrl + 'references/APTSTA', {
      headers: headers,
    });
  }
}
