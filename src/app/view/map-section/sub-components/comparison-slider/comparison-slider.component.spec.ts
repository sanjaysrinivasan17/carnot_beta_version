import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ComparisonSliderComponent } from './comparison-slider.component';

describe('ComparisonSliderComponent', () => {
  let component: ComparisonSliderComponent;
  let fixture: ComponentFixture<ComparisonSliderComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ComparisonSliderComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ComparisonSliderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
