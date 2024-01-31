import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { ReferenceService } from '../services/reference.service';

@Component({
  selector: 'app-ref-master-create',
  templateUrl: './ref-master-create.component.html',
  styleUrls: ['./ref-master-create.component.scss'],
})
export class RefMasterCreateComponent implements OnInit {
  
  ref_desc: string = '';
  ref_type: string = '';
  constructor(
    public dialogRef: MatDialogRef<RefMasterCreateComponent>,
    private router: Router,
    private ref: ReferenceService,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {}

  onNoClick() {
    this.dialogRef.close();
  }
  ngOnInit(): void {
    this.ref_type = this.data;
  }

  updateRefMaster() {
    let params = {
      ref_type: '',
      ref_desc: '',
      ref_code: '',
    };
    params.ref_type = this.ref_type;
    params.ref_desc = this.ref_desc;
    params.ref_code = this.ref_desc;
    this.ref.createUpdateRefDesc(params).subscribe(data=>{
      this.dialogRef.close(true);
    })
  }
}
