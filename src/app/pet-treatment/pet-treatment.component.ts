import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { UtilityService } from '../utilities/services/utility.service';
import { ReferenceService } from '../utilities/services/reference.service';
import { InfoDialogComponent } from '../utilities/info-dialog/info-dialog.component';
import { PetTreatmentService } from './pet-treatment.service';

@Component({
  selector: 'app-pet-treatment',
  templateUrl: './pet-treatment.component.html',
  styleUrls: ['./pet-treatment.component.scss']
})
export class PetTreatmentComponent {

  @Input() headerDetail: any;
  @Input() visit_no: string = '';
  @Input() visit_date: any;
  @Input() aptObj: any = {};
  @Output() isActiveTreatment = new EventEmitter();
  treatmentForm!: FormGroup;
  treatmentBoolean: boolean = false;
  showPreviousTable:boolean = false;
  treatmentDetailData: any = [];
  prevCounter = 0;
  recordIndex: number | undefined;
  showVisitDate: any;
  showVisitNo: any;

  filesList: any = [];
  showFiles = false;
  imageSrc: any = '';
  videoSrc: any = '';

  constructor(private router: Router,
    private dialog: MatDialog,
    private formBuilder: FormBuilder,
    private utility: UtilityService,
    private ref: ReferenceService,
    private treatmentService: PetTreatmentService) {}

  ngOnInit(): void {
    
    this.treatmentForm = this.formBuilder.group({
      medical_reco: [],
      medi_review_on: [],
      surgical: [],
      postop_medi: [],
      op_review_on: [],
      discharge_summary: []
    })
    this.checkGenerateVisit();
  }

  saveTreatment() {
    const treatmentForm = this.treatmentForm.controls;
    let params = {
        org_id: localStorage.getItem('org_id'),
        branch_id: localStorage.getItem('branch_id'),
        patient_id: this.headerDetail.patient_id,
        user_id: localStorage.getItem('user_id'),
        dept_id: this.aptObj.dept_id,
        visit_no: this.visit_no,
        visit_date: this.visit_date,
        medical_reco: treatmentForm.medical_reco.value,
        medi_review_on: treatmentForm.medi_review_on.value,
        surgical: treatmentForm.surgical.value,
        postop_medi: treatmentForm.postop_medi.value,
        op_review_on: treatmentForm.op_review_on.value,
        discharge_summary: treatmentForm.discharge_summary.value
      };
    this.treatmentService.submitTreatment(params).subscribe((data) => {
      console.log(data);
      this.treatmentBoolean = true;
      this.emitTreatment();
      this.dialog.open(InfoDialogComponent, {
        width: '500px',
        data: 'Treatment Saved Successfully',
      });
    });
  }

  emitTreatment() {
    this.isActiveTreatment.emit(
      [this.treatmentBoolean,this.visit_no]
    );
  }

  back() {
    this.showPreviousTable = false;
    this.resetTreatment();
    this.recordIndex = undefined;
    this.checkGenerateVisit();
  }

  resetTreatment() {
    this.treatmentForm.reset();
  }

  getTreatmentDetail() {
    const patient_id = this.headerDetail.patient_id;
    this.treatmentService.getTreatment(patient_id).subscribe(data => {
      console.log('Treatment Data',data);
      this.treatmentDetailData = data.results;
      this.treatmentDetailData = this.treatmentDetailData.reverse();
      this.setCurrentObjectData();
    })
  }

  setCurrentObjectData() {
    this.treatmentForm.patchValue(this.treatmentDetailData[this.getLastRecordIndex()]);
    const mediReview = this.utility.convertDate(
      this.treatmentDetailData[this.getLastRecordIndex()].medi_review_on
    );
    this.treatmentForm.controls.medi_review_on.setValue(mediReview);
    const opReview = this.utility.convertDate(
      this.treatmentDetailData[this.getLastRecordIndex()].op_review_on
    );
    this.treatmentForm.controls.op_review_on.setValue(opReview);
    this.showVisitNo = this.treatmentDetailData[this.getLastRecordIndex()].visit_no;
    this.showVisitDate = this.utility.convertDate(
      this.treatmentDetailData[this.getLastRecordIndex()].visit_date
    );
    if (this.getLastRecordIndex() <= 0) {
      this.recordIndex = 0;
    }
  }

  getLastRecordIndex() {
    return this.treatmentDetailData.length - 1;
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
    this.treatmentForm.patchValue(this.treatmentDetailData[this.recordIndex]);
    const mediReview = this.utility.convertDate(
      this.treatmentDetailData[this.recordIndex].medi_review_on
    );
    this.treatmentForm.controls.medi_review_on.setValue(mediReview);
    const opReview = this.utility.convertDate(
      this.treatmentDetailData[this.recordIndex].op_review_on
    );
    this.treatmentForm.controls.op_review_on.setValue(opReview);
    this.showVisitNo = this.treatmentDetailData[this.recordIndex].visit_no;
    this.showVisitDate = this.treatmentDetailData[this.recordIndex].visit_date;
  }

  displayPrevious() {
    this.showPreviousTable = true;
    this.getTreatmentDetail();
    this.checkGenerateVisit();
  }

  view(path: any) {
    this.videoSrc = '';
    this.imageSrc = '';
    if (path.indexOf('pdf') >= 0) {
      window.open(path, '_blank');
    }
    if (path.indexOf('.mp4') >= 0) {
      this.videoSrc = path;
    } else {
      this.imageSrc = path;      
    }
  }
  retrieveFiles() {
    this.showFiles = true;
    this.filesList = [];
    this.ref
      .getFiles(this.headerDetail.patient_id, 'Treatment')
      .subscribe((data:any) => {
        let temp = data;
        for (let i = 0; i < temp.length; i++) {
          let tempObj = { fileName: '', filePath: '' };
          tempObj.fileName = temp[i].split('/')[4];
          tempObj.filePath = temp[i];
          this.filesList.push(tempObj);
        }
      });
  }

  checkGenerateVisit() {
    if(!this.visit_no || this.showPreviousTable) {
      this.treatmentForm.disable();
      if(!this.visit_no && !this.showPreviousTable) {
        this.dialog.open(InfoDialogComponent, {
          width: '500px',
          data: 'Please generate visit',
        });
      }
    }else {
      this.treatmentForm.enable();
    }
  }
}
