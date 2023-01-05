import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AssetdrawComponent } from './assetdraw.component';

describe('AssetdrawComponent', () => {
  let component: AssetdrawComponent;
  let fixture: ComponentFixture<AssetdrawComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AssetdrawComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AssetdrawComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
