import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VotComponent } from './vot.component';

describe('VotComponent', () => {
  let component: VotComponent;
  let fixture: ComponentFixture<VotComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ VotComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(VotComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
