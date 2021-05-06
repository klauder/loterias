import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { RequestHttpComponent } from './request-http.component';

describe('RequestHttpComponent', () => {
  let component: RequestHttpComponent;
  let fixture: ComponentFixture<RequestHttpComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ RequestHttpComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RequestHttpComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
