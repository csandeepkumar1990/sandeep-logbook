import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CarbsComponent } from './carbs.component';

describe('InsulinComponent', () => {
  let component: CarbsComponent;
  let fixture: ComponentFixture<CarbsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CarbsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CarbsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
