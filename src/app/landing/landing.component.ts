import { Component, OnDestroy, OnInit, ViewEncapsulation } from '@angular/core';
import { loginUserData, LoginService } from '../login/login.service';
import {
  AptBookingService,
  aptModel,
} from '../apt-booking/apt-booking.service';
import { Router } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { ManageAppointmentComponent } from '../manage-appointment/manage-appointment.component';
import { ManagePatientService } from '../manage-patient/manage-patient.service';
import { ReferenceService } from '../utilities/services/reference.service';
import { UtilityService } from '../utilities/services/utility.service';
import { Subscription } from 'rxjs';

type doctor = {
  doctor_id: string;
  org_id: string;
  branch_id: string;
  doctor_status: string;
  doctor_name: string;
  doctor_contact_no: string;
  doctor_email_id: string;
  doctor_assistant_name: string;
  doctor_assistant_contact_no: string;
  updated_by: string;
  created_by: string;
  created_date: string;
  updated_date: string;
  doctor_asst_emailid: string;
};
type PatientSchedule = {
  patient_id: number;
  patient_name: string;
  schedule_purpose: string;
  schedule_date: string;
  planned_date: string;
};
@Component({
  selector: 'app-landing',
  templateUrl: './landing.component.html',
  styleUrls: ['./landing.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class LandingComponent implements OnInit, OnDestroy {
  doctorList: doctor[] = [];
  userData: loginUserData | undefined;
  aptData: aptModel[] = [];
  patientScheduleData: PatientSchedule[] = [];
  eodDate: string = '';
  eodSubscrition: Subscription | undefined;
  displayedColumns: string[] = ['patient_id', 'patient_name', 'phone_no', 'appoint_date', 'appoint_no', 'doctor_name', 'action', 'consult', 'schedule_purpose', 'schedule_date', 'planned_date'];
  constructor(
    private login: LoginService,
    private dialog: MatDialog,
    private aptService: AptBookingService,
    private router: Router,
    private mp: ManagePatientService,
    private ref: ReferenceService,
    private us: UtilityService
  ) {}
  ngOnDestroy(): void {
    this.eodSubscrition?.unsubscribe();
  }

  ngOnInit(): void {
    this.userData = this.login.userData;
    this.fetchAppointments();
    this.fetchDoctorsByBranchId();

    this.eodSubscrition = this.ref.getEod().subscribe((data) => {
      this.eodDate = data;
      if (this.eodDate !== '') {
        this.fetchPatientSchedule();
        this.fetchAppointments();
      }
    });
  }

  fetchPatientSchedule() {
    this.mp.fetchPatientSchedule(this.eodDate).subscribe((data) => {
      this.patientScheduleData = data.results;
    });
  }

  fetchAppointments() {
    // this.us.convertTodayTostr()
    this.aptService
      .getCurrentAppointments(this.eodDate)
      .subscribe((response: { results: any }) => {
        this.aptData = response.results;
      });
  }

  edit_apt(value: any) {
    this.router.navigate(['/apt-booking'], { state: value });
  }

  retrieveAppointments(data: any) {
    this.aptService.getAppointments(data).subscribe((response) => {
      this.aptData = response.results;
    });
  }

  fetchDoctorsByBranchId() {
    this.aptService.fetchDoctors().subscribe((data) => {
      this.doctorList = data.results;
    });
  }

  goToConsult(apt: any) {
    this.router.navigate(['/doc-consult'], { state: apt });
  }
}
