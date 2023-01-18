import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RawImageComponent } from './raw-image.component';

describe('RawImageComponent', () => {
  let component: RawImageComponent;
  let fixture: ComponentFixture<RawImageComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RawImageComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RawImageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
