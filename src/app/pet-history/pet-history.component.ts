import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { UtilityService } from '../utilities/services/utility.service';
import { ReferenceService } from '../utilities/services/reference.service';
import { PetHistoryService } from './pet-history.service';
import { InfoDialogComponent } from '../utilities/info-dialog/info-dialog.component';

@Component({
  selector: 'app-pet-history',
  templateUrl: './pet-history.component.html',
  styleUrls: ['./pet-history.component.scss']
})
export class PetHistoryComponent {

  @Input() headerDetail: any;
  @Input() visit_no: string = '';
  @Input() visit_date: any;
  @Input() aptObj: any = {};
  @Output() isActivePet = new EventEmitter();
  petHistoryForm!: FormGroup;
  patientHistory: any;
  patientDialysisHistory: any;
  primaryComplaintList: any = [];
  complaintStatusList: any = [];
  concurrentDiseaseList: any = [];
  petBoolean: boolean = false;
  lacrimationList: any = [];
  painList: any = [];
  presentAbsentList: any = [];
  showPreviousTable:boolean = false;
  historyDetailData: any = [];
  prevCounter = 0;
  recordIndex: number | undefined;
  showVisitDate: any;
  showVisitNo: any;

  constructor(private router: Router,
              private dialog: MatDialog,
              private formBuilder: FormBuilder,
              private utility: UtilityService,
              private ref: ReferenceService,
              private petHistoryService: PetHistoryService) {}

  ngOnInit(): void {

    this.ref.getPaymentModes('HIST-PRICOMP').subscribe(data => {
      this.primaryComplaintList = data.results;
    })
    this.ref.getPaymentModes('HIST-COMPSTA').subscribe(data => {
      this.complaintStatusList = data.results;
    })
    this.ref.getPaymentModes('HIST-CONDIS').subscribe(data => {
      this.concurrentDiseaseList = data.results;
    })
    this.ref.getPaymentModes('HIST-LACRI').subscribe(data => {
      this.lacrimationList = data.results;
    })
    this.ref.getPaymentModes('HIST-PAIN').subscribe(data => {
      this.painList = data.results;
    })
    this.ref.getPaymentModes('COM-PA').subscribe(data => {
      this.presentAbsentList = data.results;
    })
    this.petHistoryForm = this.formBuilder.group({
      attitude: [],
      restraint_dtl: [],
      main_complaint: [],
      main_complaint_from: [],
      curr_treatment: [],
      curr_treatment_dtl: [],
      concurrent_disease: [],
      concurrent_disease_dtl: [],
      medication_dtl: [],
      lacrimation_right: [],
      lacrimation_left: [],
      pain_right: [],
      pain_left: [],
      blepharospasm_right: [],
      blepharospasm_left: [],
      photophobia_right: [],
      photophobia_left: []
    })
    this.checkGenerateVisit();
  }

  saveHistory() {
    const historyForm = this.petHistoryForm.controls;
    let params;
    if (this.visit_no) {
      params = {
        org_id: localStorage.getItem('org_id'),
        branch_id: localStorage.getItem('branch_id'),
        patient_id: this.headerDetail.patient_id,
        doctor_id: localStorage.getItem('user_id'),
        user_id: localStorage.getItem('user_id'),
        appoint_no: this.aptObj.appoint_no,
        business_id: this.aptObj.dept_id, //dept id appoint_no
        visit_no: this.visit_no,
        visit_date: this.utility.convertTodayTostr(),
        prev_visit_date: '',
        prev_history: '',
        attitude: historyForm.attitude.value,
        restraint_dtl: historyForm.restraint_dtl.value,
        main_complaint: historyForm.main_complaint.value,
        main_complaint_from: historyForm.main_complaint_from.value,
        curr_treatment: historyForm.curr_treatment.value,
        curr_treatment_dtl: historyForm.curr_treatment_dtl.value,
        concurrent_disease: historyForm.concurrent_disease.value,
        concurrent_disease_dtl: historyForm.concurrent_disease_dtl.value,
        medication_dtl: historyForm.medication_dtl.value,
        lacrimation_right: historyForm.lacrimation_right.value,
        lacrimation_left: historyForm.lacrimation_left.value,
        pain_right: historyForm.pain_right.value,
        pain_left: historyForm.pain_left.value,
        blepharospasm_right: historyForm.blepharospasm_right.value,
        blepharospasm_left: historyForm.blepharospasm_left.value,
        photophobia_right: historyForm.photophobia_right.value,
        photophobia_left: historyForm.photophobia_left.value
      };
    } else {
      params = {
        org_id: localStorage.getItem('org_id'),
        branch_id: localStorage.getItem('branch_id'),
        patient_id: this.headerDetail.patient_id,
        doctor_id: localStorage.getItem('user_id'),
        user_id: localStorage.getItem('user_id'),
        appoint_no: this.aptObj.appoint_no,
        business_id: this.aptObj.dept_id, //dept id appoint_no
        visit_date: this.utility.convertTodayTostr(),
        prev_visit_date: '',
        prev_history: '',
        attitude: historyForm.attitude.value,
        restraint_dtl: historyForm.restraint_dtl.value,
        main_complaint: historyForm.main_complaint.value,
        main_complaint_from: historyForm.main_complaint_from.value,
        curr_treatment: historyForm.curr_treatment.value,
        curr_treatment_dtl: historyForm.curr_treatment_dtl.value,
        concurrent_disease: historyForm.concurrent_disease.value,
        concurrent_disease_dtl: historyForm.concurrent_disease_dtl.value,
        medication_dtl: historyForm.medication_dtl.value,
        lacrimation_right: historyForm.lacrimation_right.value,
        lacrimation_left: historyForm.lacrimation_left.value,
        pain_right: historyForm.pain_right.value,
        pain_left: historyForm.pain_left.value,
        blepharospasm_right: historyForm.blepharospasm_right.value,
        blepharospasm_left: historyForm.blepharospasm_left.value,
        photophobia_right: historyForm.photophobia_right.value,
        photophobia_left: historyForm.photophobia_left.value
      };
    }
    this.petHistoryService.submitHistory(params).subscribe((data) => {
      console.log(data);

      this.visit_no = data.visit_no;
      this.visit_date = data.visit_date;
      this.petBoolean = true;
      this.emitHistory();
      this.dialog.open(InfoDialogComponent, {
        width: '500px',
        data: 'History Saved Successfully',
      });
    });
  }

  emitHistory() {
    let petHistory;
    this.isActivePet.emit(
      petHistory = [this.petBoolean, this.visit_no, this.visit_date]
    );
  }

  getHistoryDetail() {
    const patient_id = this.headerDetail.patient_id;
    this.petHistoryService.fetchPrevDeatils(patient_id).subscribe(data => {
      console.log('getHistory',data);
      this.historyDetailData = data.results;
      this.setCurrentObjectData();
    })
  }

  setCurrentObjectData() {
    this.petHistoryForm.patchValue(this.historyDetailData[this.getLastRecordIndex()]);
    const mainComplaintFrom = this.utility.convertDate(
      this.historyDetailData[this.getLastRecordIndex()].main_complaint_from
    );
    this.petHistoryForm.controls.main_complaint_from.setValue(mainComplaintFrom);
    this.showVisitNo = this.historyDetailData[this.getLastRecordIndex()].visit_no;
    this.showVisitDate = this.utility.convertDate(
      this.historyDetailData[this.getLastRecordIndex()].visit_date
    );
    if (this.getLastRecordIndex() <= 0) {
      this.recordIndex = 0;
    }
  }

  getLastRecordIndex() {
    return this.historyDetailData.length - 1;
  }

  prevItem() {
    this.prevCounter++;
    this.setCurrentNotesAfterChange();
  }

  nextItem() {
    this.prevCounter--;
    this.setCurrentNotesAfterChange();
  }

  setCurrentNotesAfterChange() {
    this.recordIndex = this.getLastRecordIndex() - this.prevCounter;
    this.petHistoryForm.patchValue(this.historyDetailData[this.recordIndex]);
    const mainComplaintFrom = this.utility.convertDate(
      this.historyDetailData[this.getLastRecordIndex()].main_complaint_from
    );
    this.petHistoryForm.controls.main_complaint_from.setValue(mainComplaintFrom);
    this.showVisitNo = this.historyDetailData[this.recordIndex].visit_no;
    this.showVisitDate = this.historyDetailData[this.recordIndex].visit_date;
  }

  displayPrevious() {
    this.showPreviousTable = true;
    this.getHistoryDetail();
    this.checkGenerateVisit();
  }

  back() {
    this.showPreviousTable = false;
    this.resetRecord();
    this.checkGenerateVisit();
  }

  resetRecord() {
    this.petHistoryForm.reset();
  }
  checkGenerateVisit() {
    if(!this.visit_no || this.showPreviousTable) {
      this.petHistoryForm.disable();
      if(!this.visit_no && !this.showPreviousTable) {
        this.dialog.open(InfoDialogComponent, {
          width: '500px',
          data: 'Please generate visit',
        });
      }
    }else {
      this.petHistoryForm.enable();
    }
  }

  convertToStr(event: any, formName: any) {
    console.log(event);
    let value = event.value.toString();
    this.petHistoryForm.controls[formName].setValue(value);
  }
}
