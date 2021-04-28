import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RequestHttpComponent } from './request-http.component';

describe('RequestHttpComponent', () => {
  let component: RequestHttpComponent;
  let fixture: ComponentFixture<RequestHttpComponent>;

  beforeEach(async(() => {
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
