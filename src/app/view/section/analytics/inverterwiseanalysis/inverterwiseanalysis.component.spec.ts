import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { InverterwiseanalysisComponent } from './inverterwiseanalysis.component';

describe('InverterwiseanalysisComponent', () => {
  let component: InverterwiseanalysisComponent;
  let fixture: ComponentFixture<InverterwiseanalysisComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ InverterwiseanalysisComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(InverterwiseanalysisComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
