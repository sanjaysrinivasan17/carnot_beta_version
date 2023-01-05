import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MapassetSectionComponent } from './mapasset-section.component';

describe('MapassetSectionComponent', () => {
  let component: MapassetSectionComponent;
  let fixture: ComponentFixture<MapassetSectionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MapassetSectionComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MapassetSectionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
