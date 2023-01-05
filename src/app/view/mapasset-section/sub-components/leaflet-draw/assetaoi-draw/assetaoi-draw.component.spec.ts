import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AssetaoiDrawComponent } from './assetaoi-draw.component';

describe('AssetaoiDrawComponent', () => {
  let component: AssetaoiDrawComponent;
  let fixture: ComponentFixture<AssetaoiDrawComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AssetaoiDrawComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AssetaoiDrawComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
