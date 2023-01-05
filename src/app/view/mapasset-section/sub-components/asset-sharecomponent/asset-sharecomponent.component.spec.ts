import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AssetSharecomponentComponent } from './asset-sharecomponent.component';

describe('AssetSharecomponentComponent', () => {
  let component: AssetSharecomponentComponent;
  let fixture: ComponentFixture<AssetSharecomponentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AssetSharecomponentComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AssetSharecomponentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
