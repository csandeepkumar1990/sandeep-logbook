import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DiabetesGraphComponent } from './diabetes-graph.component';

describe('DiabetesGraphComponent', () => {
  let component: DiabetesGraphComponent;
  let fixture: ComponentFixture<DiabetesGraphComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DiabetesGraphComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DiabetesGraphComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
