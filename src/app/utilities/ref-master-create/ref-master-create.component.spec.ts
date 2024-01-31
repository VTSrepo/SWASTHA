import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RefMasterCreateComponent } from './ref-master-create.component';

describe('RefMasterCreateComponent', () => {
  let component: RefMasterCreateComponent;
  let fixture: ComponentFixture<RefMasterCreateComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RefMasterCreateComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RefMasterCreateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
