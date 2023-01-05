import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SummaryAnalyticsComponent } from './summary-analytics.component';

describe('SummaryAnalyticsComponent', () => {
  let component: SummaryAnalyticsComponent;
  let fixture: ComponentFixture<SummaryAnalyticsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SummaryAnalyticsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SummaryAnalyticsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
