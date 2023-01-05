import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ComparisionAssetComponent } from './comparision-asset.component';

describe('ComparisionAssetComponent', () => {
  let component: ComparisionAssetComponent;
  let fixture: ComponentFixture<ComparisionAssetComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ComparisionAssetComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ComparisionAssetComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
