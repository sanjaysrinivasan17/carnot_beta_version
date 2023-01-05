import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GradinggraphComponent } from './gradinggraph.component';

describe('GradinggraphComponent', () => {
  let component: GradinggraphComponent;
  let fixture: ComponentFixture<GradinggraphComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GradinggraphComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GradinggraphComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
