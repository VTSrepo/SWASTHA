import { Component } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { PetRegistrationService } from './pet-registration.service';
import { MatDialog } from '@angular/material/dialog';
import { InfoDialogComponent } from '../utilities/info-dialog/info-dialog.component';
import { UtilityService } from '../utilities/services/utility.service';
import { ReferenceService } from '../utilities/services/reference.service';
import { Router } from '@angular/router';
import { RefMasterCreateComponent } from '../utilities/ref-master-create/ref-master-create.component';

@Component({
  selector: 'app-pet-registration',
  templateUrl: './pet-registration.component.html',
  styleUrls: ['./pet-registration.component.scss'],
})
export class PetRegistrationComponent {
  petRegistrationForm!: FormGroup;
  updatePet: boolean = false;
  sterilizedList: any = [];
  animalList: any = [];
  animalBreedList: any = [];
  livingConditionList: any = [];
  petRegObj: any;
  patient_id: any;
  petCategoryList: any = [];

  constructor(
    private router: Router,
    private dialog: MatDialog,
    private formBuilder: FormBuilder,
    private utility: UtilityService,
    private ref: ReferenceService,
    private petRegService: PetRegistrationService
  ) {}

  ngOnInit(): void {
    this.petRegistrationForm = this.formBuilder.group({
      patient_id: [],
      dob: [],
      sex: [],
      age: [],
      father_name: [],
      mobile_no: [],
      address: [],
      animal_type: [],
      animal_breed: [],
      sterilized: [],
      last_steril_date: [],
      vaccinated: [],
      last_vaccinated_date: [],
      deworming_status: [],
      living_condition: [],
      family_history: [],
      eating_habit: [],
      drinking_habit: [],
      urination: [],
      defecation: [],
      ref_by_doctor: [],
      patient_name: [],
      patient_type_name: [],
      alt_mobile_no: [],
      pet_category: [],
    });

    if (history.state && history.state.patient_id) {
      this.getBreedList(history.state.animal_type);
      this.petRegistrationForm.patchValue(history.state);
      this.patient_id = history.state.patient_id;
      // this.petRegistrationForm.controls.last_steril_date.setValue(this.utility.convertTodayTostrDDMMYYYY(history.state.last_steril_date));
      // this.petRegistrationForm.controls.dob.setValue(this.utility.convertTodayTostrDDMMYYYY(history.state.dob));
      this.petRegObj = this.petRegistrationForm.value;
      this.updatePet = true;
    }

    this.ref.getPaymentModes('STERIL').subscribe((data) => {
      this.sterilizedList = data.results;
    });
    this.ref.getPaymentModes('ANITYPE').subscribe((data) => {
      this.animalList = data.results;
    });
    this.ref.getPaymentModes('LIVCOND').subscribe((data) => {
      this.livingConditionList = data.results;
    });
    this.ref.getPaymentModes('Pet_Cat').subscribe((data) => {
      this.petCategoryList = data.results;
    });
  }
  retrieveReferenceData(ref_type:string){
    switch(ref_type){
      case 'ANITYPE':{
        this.ref.getPaymentModes('ANITYPE').subscribe((data) => {
          this.animalList = data.results;
        });
        break;
      }
      case 'Pet_Cat':{
        this.ref.getPaymentModes('Pet_Cat').subscribe((data) => {
          this.petCategoryList = data.results;
        });
        break;
      }
      case 'LIVCOND':{
        this.ref.getPaymentModes('LIVCOND').subscribe((data) => {
          this.livingConditionList = data.results;
        });
        break;
      }
      case 'STERIL':{
        this.ref.getPaymentModes('STERIL').subscribe((data) => {
          this.sterilizedList = data.results;
        });
        break;
      }
    }
  }
  showLOVinsert(type: string, custom?:boolean) {
    //console.log(this.petRegistrationForm.controls.animal_type.value);
    const dialogRef = this.dialog.open(RefMasterCreateComponent, {
      width: '250px',
      data: type,
    });
    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        this.dialog.open(InfoDialogComponent, {
          width: '400px',
          data: 'Item Saved Successfully!!!',
        });
        if(custom){
          this.getBreedList(type);
        } else {
          this.retrieveReferenceData(type);
        }        
      }
    });
  }

  savePetReg() {
    const prForm = this.petRegistrationForm.controls;
    let params = {
      org_id: localStorage.getItem('org_id'),
      branch_id: localStorage.getItem('branch_id'),
      user_id: localStorage.getItem('user_id'),
      patient_id: prForm.patient_id.value,
      dob: prForm.dob.value,
      sex: prForm.sex.value,
      age: prForm.age.value,
      father_name: prForm.father_name.value,
      mobile_no: prForm.mobile_no.value,
      address: prForm.address.value,
      animal_type: prForm.animal_type.value,
      animal_breed: prForm.animal_breed.value,
      sterilized: prForm.sterilized.value,
      last_steril_date: prForm.last_steril_date.value,
      vaccinated: prForm.vaccinated.value,
      last_vaccinated_date: prForm.last_vaccinated_date.value,
      deworming_status: prForm.deworming_status.value,
      living_condition: prForm.living_condition.value,
      family_history: prForm.family_history.value,
      eating_habit: prForm.eating_habit.value,
      drinking_habit: prForm.drinking_habit.value,
      urination: prForm.urination.value,
      defecation: prForm.defecation.value,
      ref_by_doctor: prForm.ref_by_doctor.value,
      patient_name: prForm.patient_name.value,
      patient_type_name: prForm.patient_name.value,
      alt_mobile_no: prForm.alt_mobile_no.value,
      pet_category: prForm.pet_category.value,
    };
    this.petRegService.createPetReg(params).subscribe(
      (data) => {
        this.dialog.open(InfoDialogComponent, {
          width: '400px',
          data: 'Pet Registration Saved Successfully!!!',
        });
        this.router.navigate(['landing']);
      },
      (error) => {
        if (error.error.status === 404) {
          this.dialog.open(InfoDialogComponent, {
            width: '400px',
            data: error.error.message,
          });
        }
      }
    );
  }

  goBack() {
    if (this.updatePet) {
      this.router.navigate(['/manage-pet'], { state: this.petRegObj });
    } else {
      this.router.navigate(['/landing']);
    }
  }

  updatePetDetails() {
    const prForm = this.petRegistrationForm.controls;
    let params = {
      org_id: localStorage.getItem('org_id'),
      branch_id: localStorage.getItem('branch_id'),
      user_id: localStorage.getItem('user_id'),
      patient_id: prForm.patient_id.value,
      dob: prForm.dob.value,
      sex: prForm.sex.value,
      age: prForm.age.value,
      father_name: prForm.father_name.value,
      mobile_no: prForm.mobile_no.value,
      address: prForm.address.value,
      animal_type: prForm.animal_type.value,
      animal_breed: prForm.animal_breed.value,
      sterilized: prForm.sterilized.value,
      last_steril_date: prForm.last_steril_date.value,
      vaccinated: prForm.vaccinated.value,
      last_vaccinated_date: prForm.last_vaccinated_date.value,
      deworming_status: prForm.deworming_status.value,
      living_condition: prForm.living_condition.value,
      family_history: prForm.family_history.value,
      eating_habit: prForm.eating_habit.value,
      drinking_habit: prForm.drinking_habit.value,
      urination: prForm.urination.value,
      defecation: prForm.defecation.value,
      ref_by_doctor: prForm.ref_by_doctor.value,
      patient_name: prForm.patient_name.value,
      patient_type_name: prForm.patient_name.value,
      alt_mobile_no: prForm.alt_mobile_no.value,
      pet_category: prForm.pet_category.value,
    };
    this.petRegService.updatePetReg(params).subscribe((data) => {
      this.dialog.open(InfoDialogComponent, {
        width: '300px',
        data: 'Data Updated Successfully',
      });
      this.router.navigate(['/landing']);
    });
  }

  getBreedList(breedType: any) {
    this.animalBreedList = [];
    this.petRegistrationForm.controls.animal_breed.setValue(null);
    this.ref.getPaymentModes(breedType).subscribe((data) => {
      this.animalBreedList = data.results;
    });
  }

  isRequiredAnimalBreed() {
    return this.animalBreedList.length > 0
      ? this.petRegistrationForm.controls.animal_breed.disable()
      : this.petRegistrationForm.controls.animal_breed.enable();
  }
}
