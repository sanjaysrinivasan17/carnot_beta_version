import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InverterwiseAnalyticsComponent } from './inverterwise-analytics.component';

describe('InverterwiseAnalyticsComponent', () => {
  let component: InverterwiseAnalyticsComponent;
  let fixture: ComponentFixture<InverterwiseAnalyticsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ InverterwiseAnalyticsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(InverterwiseAnalyticsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
