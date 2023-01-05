import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InverterAnalyticsComponent } from './inverter-analytics.component';

describe('InverterAnalyticsComponent', () => {
  let component: InverterAnalyticsComponent;
  let fixture: ComponentFixture<InverterAnalyticsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ InverterAnalyticsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(InverterAnalyticsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
