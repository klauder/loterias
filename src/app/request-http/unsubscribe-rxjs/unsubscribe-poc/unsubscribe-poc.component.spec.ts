import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { UnsubscribePocComponent } from './unsubscribe-poc.component';

describe('UnsubscribePocComponent', () => {
  let component: UnsubscribePocComponent;
  let fixture: ComponentFixture<UnsubscribePocComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ UnsubscribePocComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UnsubscribePocComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
