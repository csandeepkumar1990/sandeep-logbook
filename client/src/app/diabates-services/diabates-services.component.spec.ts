import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DiabatesServicesComponent } from './diabates-services.component';

describe('DiabatesServicesComponent', () => {
  let component: DiabatesServicesComponent;
  let fixture: ComponentFixture<DiabatesServicesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DiabatesServicesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DiabatesServicesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
