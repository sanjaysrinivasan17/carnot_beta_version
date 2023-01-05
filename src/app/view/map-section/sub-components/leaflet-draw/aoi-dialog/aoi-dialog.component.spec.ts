import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AoiDialogComponent } from './aoi-dialog.component';

describe('AoiDialogComponent', () => {
  let component: AoiDialogComponent;
  let fixture: ComponentFixture<AoiDialogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AoiDialogComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AoiDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
