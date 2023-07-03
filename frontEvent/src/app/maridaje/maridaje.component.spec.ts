import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MaridajeComponent } from './maridaje.component';

describe('MaridajeComponent', () => {
  let component: MaridajeComponent;
  let fixture: ComponentFixture<MaridajeComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [MaridajeComponent]
    });
    fixture = TestBed.createComponent(MaridajeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
