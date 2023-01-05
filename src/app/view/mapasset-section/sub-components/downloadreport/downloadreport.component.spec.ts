import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DownloadreportComponent } from './downloadreport.component';

describe('DownloadreportComponent', () => {
  let component: DownloadreportComponent;
  let fixture: ComponentFixture<DownloadreportComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DownloadreportComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DownloadreportComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
