import { Component } from '@angular/core';
import { aptModel } from '../apt-booking/apt-booking.service';
import { DocConsultationService } from '../doc-consultation/doc-consultation.service';
import { ReferenceService } from '../utilities/services/reference.service';
import { PetHistoryService } from '../pet-history/pet-history.service';
import { InfoDialogComponent } from '../utilities/info-dialog/info-dialog.component';
import { MatDialog } from '@angular/material/dialog';
import { UtilityService } from '../utilities/services/utility.service';

@Component({
  selector: 'app-pet-consulation',
  templateUrl: './pet-consulation.component.html',
  styleUrls: ['./pet-consulation.component.scss'],
})
export class PetConsulationComponent {
  aptObj = {} as aptModel;
  headerDetail: any;
  visit_no: any;
  constructor(
    private docService: DocConsultationService,
    private ref: ReferenceService,
    private petHistoryService: PetHistoryService,
    private dialog: MatDialog,
    private utility: UtilityService,
  ) {}

  ngOnInit(): void {
    if (history.state && history.state.patient_id) {
      this.aptObj = history.state;
      this.ref.fetchHeader(history.state.patient_id).subscribe((data) => {
        this.patientHeader(data);
      });
    }
    if(history.state && history.state.visit_no){
      this.visit_no = history.state.visit_no;
    }
  }

  patientHeader(data: any) {
    this.headerDetail = { ...data };
    localStorage.setItem('header', JSON.stringify(this.headerDetail));
  }

  generateVisit() {
    let params = {
      'org_id': localStorage.getItem('org_id'),
      'branch_id': localStorage.getItem('branch_id'),
      'patient_id': this.headerDetail.patient_id,
      'visit_date': this.utility.convertTodayTostr(),
      'doctor_id': localStorage.getItem('user_id'),
      'business_id': this.aptObj.dept_id, //dept id appoint_no
    }
    this.petHistoryService.submitHistory(params).subscribe((data) => {
      console.log(data);
      this.visit_no = data.visit_no;
      history.state.visit_no = data.visit_no;
      // this.visit_date = data.visit_date;
      this.dialog.open(InfoDialogComponent, {
        width: '500px',
        data: 'Generated Saved Successfully',
      });
    });
  }
}
