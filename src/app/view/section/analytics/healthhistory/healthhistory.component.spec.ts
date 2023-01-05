import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { HealthhistoryComponent } from './healthhistory.component';

describe('HealthhistoryComponent', () => {
  let component: HealthhistoryComponent;
  let fixture: ComponentFixture<HealthhistoryComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ HealthhistoryComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HealthhistoryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
