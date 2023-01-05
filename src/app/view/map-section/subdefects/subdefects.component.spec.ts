import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SubdefectsComponent } from './subdefects.component';

describe('SubdefectsComponent', () => {
  let component: SubdefectsComponent;
  let fixture: ComponentFixture<SubdefectsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SubdefectsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SubdefectsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
