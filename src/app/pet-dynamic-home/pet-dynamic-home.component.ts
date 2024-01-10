import { Component, EventEmitter, Output } from '@angular/core';
import { Router } from '@angular/router';
import { AptStatus } from '../apt-booking/apt-booking.component';
import { aptModel } from '../apt-booking/apt-booking.service';
import { DocConsultationService } from '../doc-consultation/doc-consultation.service';

@Component({
  selector: 'app-pet-dynamic-home',
  templateUrl: './pet-dynamic-home.component.html',
  styleUrls: ['./pet-dynamic-home.component.scss'],
})
export class PetDynamicHomeComponent {
  patientHeader: any;
  visit_no: any;
  headerDetail: any;
  aptObj: aptModel | undefined;
  currentHeading = '';
  vetMetaData = [];
metaDataRoute=false;
  constructor(
    private docService: DocConsultationService,
    private router: Router
  ) {}

  ngOnInit(): void {
    if (history.state && history.state) {
      this.visit_no = history.state.visit_no;
      this.currentHeading = history.state.heading;
      this.aptObj = history.state.aptObj;
    }
    this.patientHeader = JSON.parse(localStorage.getItem('header')!);
    this.metaDataRoute = this.metaHeadings.includes(this.currentHeading);
    if(this.metaDataRoute){
      this.getPetMetaData();
    }
   
  }
  gotoConsultHome(val?:any) {
    if(val && val[1] && this.aptObj){
      this.aptObj.visit_no = val[1];
      if(this.currentHeading == 'History') {
        this.aptObj.petHistoryBoolean = val[0];
      }
      if(this.currentHeading == 'Vital Parameters') {
        this.aptObj.petVitalBoolean = val[0];
      }
      if(this.currentHeading == 'Vision Assesment') {
        this.aptObj.petVisionBoolean = val[0];
      }
      if(this.currentHeading == 'Examination of Adnexa') {
        this.aptObj.petAdnexaBoolean = val[0];
      }
      if(this.currentHeading == 'Cornea and Sclera') {
        this.aptObj.petCorneaBoolean = val[0];
      }
      if(this.currentHeading == 'IOP and AC') {
        this.aptObj.petIOPBoolean = val[0];
      }
      if(this.currentHeading == 'Posterior Segment After pupillary Dilation') {
        this.aptObj.petPosteriorBoolean = val[0];
      }
      if(this.currentHeading == 'Antirior Segment After pupillary Dilation') {
        this.aptObj.petAntiriorBoolean = val[0];
      }
      if(this.currentHeading == 'Fundus') {
        this.aptObj.petFundusBoolean = val[0];
      }
      if(this.currentHeading == 'Diagnosis') {
        this.aptObj.petDiagnosisBoolean = val[0];
      }
      if(this.currentHeading == 'Treatment') {
        this.aptObj.petTreatmentBoolean = val[0];
      }
      if(this.currentHeading == 'Medicine') {
        this.aptObj.petMedicineBoolean = val[0];
      }
      if(this.currentHeading == 'Lab') {
        this.aptObj.petLabBoolean = val[0];
      }
    }    
    this.router.navigate(['/pet-consultation-home'], { state: this.aptObj });
  }
  getPetMetaData() {    
    if (this.visit_no) {
      this.docService
        .getPetMetaData(
          this.patientHeader.patient_id,
          this.visit_no,
          this.currentHeading
        )
        .subscribe((data) => {
          this.vetMetaData = data.results;
        });
    }
  }
metaHeadings = ['Fundus','Antirior Segment After pupillary Dilation','Posterior Segment After pupillary Dilation','IOP and AC','Examination of Adnexa','Vision Assesment','Cornea and Sclera']
  checkMetaDataHeading(){
   // if(this.metaHeadings.includes(this.currentHeading))
  }

  patientHeaderData(data: any) {
    this.headerDetail = { ...data };
    localStorage.setItem('header', JSON.stringify(this.headerDetail));
  }
}
