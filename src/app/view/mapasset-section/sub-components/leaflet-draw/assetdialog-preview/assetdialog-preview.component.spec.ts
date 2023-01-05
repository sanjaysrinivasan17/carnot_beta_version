import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AssetdialogPreviewComponent } from './assetdialog-preview.component';

describe('AssetdialogPreviewComponent', () => {
  let component: AssetdialogPreviewComponent;
  let fixture: ComponentFixture<AssetdialogPreviewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AssetdialogPreviewComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AssetdialogPreviewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
