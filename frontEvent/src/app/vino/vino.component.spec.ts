import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VinoComponent } from './vino.component';

describe('VinoComponent', () => {
  let component: VinoComponent;
  let fixture: ComponentFixture<VinoComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [VinoComponent]
    });
    fixture = TestBed.createComponent(VinoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
