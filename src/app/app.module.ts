import { NgModule } from '@angular/core';
import { BrowserModule,  } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';

import { AngularFireModule } from '@angular/fire';
import { AngularFireDatabaseModule } from '@angular/fire/database';
import { AngularFireStorageModule } from '@angular/fire/storage';
import { environment } from '../environments/environment';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';
import { LoginComponent } from './login/login.component';
import { LandingComponent } from './landing/landing.component';
import { AptBookingComponent } from './apt-booking/apt-booking.component';
import { PatientRegistrationComponent } from './patient-registration/patient-registration.component';
import { AuthService } from './services/auth.service';
import { DocConsultationComponent } from './doc-consultation/doc-consultation.component';
import { BillingComponent } from './billing/billing.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MaterialModule } from './material.module';
import { PaymentComponent } from './payment/payment.component';
import { DialogOverviewExampleDialog } from './payment/payment.component';
import { DialogPatientList } from './apt-booking/apt-booking.component';
import { InvoiceComponent } from './invoice/invoice.component';
import { ManageDialogComponent } from './manage-dialog/manage-dialog.component';
import { InfoDialogComponent } from './utilities/info-dialog/info-dialog.component';
import { PatientListDialogComponent } from './utilities/patient-list-dialog/patient-list-dialog.component';
import { SupplierListDialogComponent } from './utilities/supplier-list-dialog/supplier-list-dialog.component';
import { PreviousPriceListDialogComponent } from './utilities/previousprice-list-dialog/previousprice-list-dialog.component';
import { BillingEditComponent } from './billing-edit/billing-edit.component';
import { PromptDialogComponent } from './utilities/prompt-dialog/prompt-dialog.component';
import { PatientHeaderComponent } from './patient-header/patient-header.component';
import { LabPrescriptionComponent } from './lab-prescription/lab-prescription.component';
import { MedPrescriptionComponent } from './med-prescription/med-prescription.component';
import { ManageAppointmentComponent } from './manage-appointment/manage-appointment.component';
import { AdvancePaymentComponent } from './advance-payment/advance-payment.component';
import { InvoicePrintComponent } from './invoice-print/invoice-print.component';
import { PreviousMedComponent } from './previous-med/previous-med.component';
import { BaseDetailComponent } from './base-detail/base-detail.component';
import { ManagePatientComponent } from './manage-patient/manage-patient.component';
import { InsuranceComponent } from './insurance/insurance.component';
import { PatientwiseReportComponent } from './patientwise-report/patientwise-report.component';
import { CollectionwiseReportComponent } from './collectionwise-report/collectionwise-report.component';
import { OutstantingInvwiseComponent } from './outstanting-invwise/outstanting-invwise.component';
import { OutstantingPtwiseComponent } from './outstanting-ptwise/outstanting-ptwise.component';
import { SupplierMasterComponent } from './supplier/supplier-master/supplier-master.component';
import { SupplierProductComponent } from './supplier-product/supplier-product.component';
import { FilterPipe } from './supplier/supplier-master/filter';
import { EodComponent } from './eod/eod.component';
import { CancelInvoiceDialogComponent } from './utilities/cancel-invoice-dialog/cancel-invoice-dialog.component'
import { ViewProductDialogComponent } from './utilities/view-product-dialog/view-product-dialog.component';
import { CollectionPaymentwiseReportComponent } from './collection-payment-report/collection-payment-report.component';
import { PoComponent } from './po/po.component';
import { InsuranceSummaryComponent } from './insurance-summary/insurance-summary.component';
import { PatientScheduleComponent } from './patient-schedule/patient-schedule.component';
import { PatientListingReportComponent } from './patient-listing-report/patient-listing-report.component';
import { ListTable } from './patient-listing-report/list-table/list-table.component';
import { PoSubmissionComponent } from './po-submission/po-submission.component';
import { GoodsReceiptComponent } from './goods-receipt/goods-receipt.component';
import { SupplierPaymentComponent } from './supplier-payment/supplier-payment.component';
import { PaymentReceiptsComponent } from './payment-receipts/payment-receipts.component';
import { UpdatePayreceiptsComponent } from './update-payreceipts/update-payreceipts.component';
import { PrTableComponent } from './update-payreceipts/pr-table/pr-table.component';
import { ProductMasterComponent } from './product-master/product-master.component';
import { ProductMasterListingComponent } from './product-master-listing/product-master-listing.component'
import { PMTableComponent } from './product-master-listing/pr-table/pr-table.component';
import { NormalPricingComponent } from './product-master-listing/normal-pricing/normal-pricing.component';
import { InsurancePricingComponent } from './product-master-listing/insurance-pricing/insurance-pricing.component'
import { PoReportsComponent } from './po-reports/po-reports.component'
import { DatePipe } from '@angular/common';
import { GoodsReportsComponent } from './goods-reports/goods-reports.component';
import { SupplierReportsComponent } from './supplier-reports/supplier-reports.component';
import { SrTableComponent } from './supplier-reports/sr-table/sr-table.component';
import { GrTableComponent } from './goods-reports/gr-table/gr-table.component';
import { ReceiptPaymentReportComponent } from './receipt-payment-report/receipt-payment-report.component';
import { RpTableComponent } from './receipt-payment-report/rp-table/rp-table.component';
import { StockRegisterReportComponent } from './stock-register-report/stock-register-report.component';
import { SRegTableComponent } from './stock-register-report/s-reg-table/s-reg-table.component';
import { FileUploadComponent } from './file-upload/file-upload.component';
import { AccountMasterComponent } from './account-master/account-master.component';
import { DoctorMasterComponent } from './doctor-master/doctor-master.component';
import { InventoryConfigComponent } from './inventory-config/inventory-config.component';
import { SuppProdMapComponent } from './supp-prod-map/supp-prod-map.component';
import { UserMasterComponent } from './user-master/user-master.component';
import { userFilterPipe } from './user-master/user-filter';
import { LoginUserComponent } from './login-user/login-user.component';
import { InfoObjDialogComponent } from './utilities/info-obj-dialog/info-obj-dialog.component';
import { PatientHealthComponent } from './patient-health/patient-health.component';
import { DoctorReportComponent } from './doctor-report/doctor-report.component';
import { doctorMasterFilter } from './doctor-master/doctorMasterFilter';
import { ExportReportComponent } from './export-report/export-report.component';
import { InvoicePaymentReportComponent } from './invoice-payment-report/invoice-payment-report.component';
import { InvoiceProductReportComponent } from './invoice-product-report/invoice-product-report.component';
import { InvoiceProductTable } from './invoice-product-report/invoice-product-table/invoice-product-table.component';
import { PrevVistDetailsComponent } from './prev-vist-details/prev-vist-details.component';
import { PatientVisit360ViewComponent } from './patient-visit360-view/patient-visit360-view.component';
import { OpthalBasicComponent } from './opthal-basic/opthal-basic.component';
import { OpthalRefractionComponent } from './opthal-refraction/opthal-refraction.component';
import { OpthalSpectacleComponent } from './opthal-spectacle/opthal-spectacle.component';
import { SlitLampComponent } from './slit-lamp/slit-lamp.component';
import { AppointmentTableComponent } from './landing/appoinment-table/appointment-table.component';
import { PatientScheduleTableComponent } from './landing/patient-schedule-table/patient-schedule-table.component';
import { PreviousLabComponent } from './previous-lab/previous-lab.component';
import { PreviousVitalComponent } from './previous-vital/previous-vital.component';
import { VisualAcuityComponent } from './visual-acuity/visual-acuity.component';
import { ObjectiveRefractionComponent } from './objective-refraction/objective-refraction.component';
import { PresentGlassPowerComponent } from './present-glass-power/present-glass-power.component';
import { SubjectAcceptanceComponent } from './subject-acceptance/subject-acceptance.component';
import { GlassPrescriptionComponent } from './glass-prescription/glass-prescription.component';
import { IntraOcularPressureComponent } from './intra-ocular-pressure/intra-ocular-pressure.component';
import { DiagnosisAndAdviceComponent } from './diagnosis-and-advice/diagnosis-and-advice.component';
import { ExaminationComponent } from './examination/examination.component';
import { VetConsultSectionComponent } from './vet-consult-section/vet-consult-section.component';
import { MultiselectComponent } from './multiselect/multiselect.component';
import { PetRegistrationComponent } from './pet-registration/pet-registration.component';
import { PetHistoryComponent } from './pet-history/pet-history.component';
import { PetTreatmentComponent } from './pet-treatment/pet-treatment.component';
import { PetDiagnosisComponent } from './pet-diagnosis/pet-diagnosis.component';
import { PetVisit360ViewComponent } from './pet-visit360-view/pet-visit360-view.component';
import {ViewPetFieldImage} from './utilities/pet-section-field-image-view/pet-section-field-image-view.component';
import { ImageDrawingModule } from 'ngx-image-drawing';
import { PetConsulationComponent } from './pet-consulation/pet-consulation.component';
import { PetDynamicHomeComponent } from './pet-dynamic-home/pet-dynamic-home.component';
import { PetVitalParameterComponent } from './pet-vital-parameter/pet-vital-parameter.component';
import { ManagePetComponent } from './manage-pet/manage-pet.component';
import { PetHealthComponent } from './pet-health/pet-health.component';
import { AppInterceptor } from './app.interceptor';
import { AppService } from './app.service';
import { RefMasterCreateComponent } from './utilities/ref-master-create/ref-master-create.component';
//import { InvoicePaymentTable } from './invoice-payment-report/invoice-payment-table/invoice-payment-table.component';
//import { InvoiceProductTable } from './invoice-product-report/invoice-product-table/invoice-product-table.component';
@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    LoginComponent,
    LandingComponent,
    AptBookingComponent,
    PatientRegistrationComponent,
    DocConsultationComponent,
    BillingComponent,
    PaymentComponent,
    DialogOverviewExampleDialog,
    InvoiceComponent,
    DialogPatientList,
    ManageDialogComponent,
    InfoDialogComponent,
    PatientListDialogComponent,
    DoctorReportComponent,
    BillingEditComponent,
    PromptDialogComponent,
    PatientHeaderComponent,
    LabPrescriptionComponent,
    MedPrescriptionComponent,
    ManageAppointmentComponent,
    AdvancePaymentComponent,
    InvoicePrintComponent,
    PreviousMedComponent,
    BaseDetailComponent,
    ManagePatientComponent,
    InsuranceComponent,
    PatientwiseReportComponent,
    CollectionwiseReportComponent,
    OutstantingInvwiseComponent,
    OutstantingPtwiseComponent,
    SupplierMasterComponent,
    SupplierProductComponent,
    FilterPipe,
    EodComponent,
    CancelInvoiceDialogComponent,
    ViewProductDialogComponent,
    PoComponent,
    CollectionPaymentwiseReportComponent,
    InsuranceSummaryComponent,
    PatientScheduleComponent,
    PatientListingReportComponent,
    ListTable,
    PoSubmissionComponent,
    GoodsReceiptComponent,
    SupplierPaymentComponent,
    PaymentReceiptsComponent,
    UpdatePayreceiptsComponent,
    PrTableComponent,
    ProductMasterComponent,
    ProductMasterListingComponent,
    PMTableComponent,
    NormalPricingComponent,
    InsurancePricingComponent,
    SupplierListDialogComponent,
    PreviousPriceListDialogComponent,

    PoReportsComponent,
    GoodsReportsComponent,
    SupplierReportsComponent,
    SrTableComponent,
    GrTableComponent,
    ReceiptPaymentReportComponent,
    RpTableComponent,
    StockRegisterReportComponent,
    SRegTableComponent,
    FileUploadComponent,
    AccountMasterComponent,
    DoctorMasterComponent,
    InventoryConfigComponent,
    SuppProdMapComponent,
    UserMasterComponent,
    userFilterPipe,
    LoginUserComponent,
    PatientHealthComponent,
    doctorMasterFilter,
    ExportReportComponent,
    InvoicePaymentReportComponent,
    InvoiceProductReportComponent,
    InvoiceProductTable,
    PrevVistDetailsComponent,
    PatientVisit360ViewComponent,
    OpthalBasicComponent,
    OpthalRefractionComponent,
    OpthalSpectacleComponent,
    SlitLampComponent,
    AppointmentTableComponent,
    PatientScheduleTableComponent,
    PreviousLabComponent,
    PreviousVitalComponent,
    VisualAcuityComponent,
    ObjectiveRefractionComponent,
    PresentGlassPowerComponent,
    SubjectAcceptanceComponent,
    GlassPrescriptionComponent,
    IntraOcularPressureComponent,
    DiagnosisAndAdviceComponent,
    ExaminationComponent,
    VetConsultSectionComponent,    
    MultiselectComponent,
    PetRegistrationComponent,
    PetHistoryComponent,
    PetTreatmentComponent,
    PetDiagnosisComponent,
    PetVisit360ViewComponent,
    ViewPetFieldImage,
    PetDynamicHomeComponent,
    PetConsulationComponent,
    PetVitalParameterComponent,
    ManagePetComponent,
    PetHealthComponent,
    RefMasterCreateComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MaterialModule,
    AngularFireModule.initializeApp(environment.firebaseConfig),
    AngularFireDatabaseModule,
    AngularFireStorageModule,
    ImageDrawingModule
  ],
  providers: [AuthService, DatePipe,AppService, {
    provide: HTTP_INTERCEPTORS,
    useClass: AppInterceptor,
    multi: true
  }],
  bootstrap: [AppComponent]
})
export class AppModule { }
