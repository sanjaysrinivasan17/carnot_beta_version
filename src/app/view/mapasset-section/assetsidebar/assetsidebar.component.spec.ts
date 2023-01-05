import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AssetsidebarComponent } from './assetsidebar.component';

describe('AssetsidebarComponent', () => {
  let component: AssetsidebarComponent;
  let fixture: ComponentFixture<AssetsidebarComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AssetsidebarComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AssetsidebarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
