import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AnalomyclassificationComponent } from './analomyclassification.component';

describe('AnalomyclassificationComponent', () => {
  let component: AnalomyclassificationComponent;
  let fixture: ComponentFixture<AnalomyclassificationComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AnalomyclassificationComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AnalomyclassificationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
