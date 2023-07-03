import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BackendServiceComponent } from './backend-service.component';

describe('BackendServiceComponent', () => {
  let component: BackendServiceComponent;
  let fixture: ComponentFixture<BackendServiceComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [BackendServiceComponent]
    });
    fixture = TestBed.createComponent(BackendServiceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
