import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { InsulinComponent } from './insulin.component';

describe('InsulinComponent', () => {
  let component: InsulinComponent;
  let fixture: ComponentFixture<InsulinComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ InsulinComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(InsulinComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
