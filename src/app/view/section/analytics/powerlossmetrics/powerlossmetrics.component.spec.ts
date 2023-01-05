import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PowerlossmetricsComponent } from './powerlossmetrics.component';

describe('PowerlossmetricsComponent', () => {
  let component: PowerlossmetricsComponent;
  let fixture: ComponentFixture<PowerlossmetricsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PowerlossmetricsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PowerlossmetricsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
