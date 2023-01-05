import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DefectrectificationComponent } from './defectrectification.component';

describe('DefectrectificationComponent', () => {
  let component: DefectrectificationComponent;
  let fixture: ComponentFixture<DefectrectificationComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DefectrectificationComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DefectrectificationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
