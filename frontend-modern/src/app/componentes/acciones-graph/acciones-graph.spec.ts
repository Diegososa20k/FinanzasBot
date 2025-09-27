import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AccionesGraph } from './acciones-graph';

describe('AccionesGraph', () => {
  let component: AccionesGraph;
  let fixture: ComponentFixture<AccionesGraph>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AccionesGraph]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AccionesGraph);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
