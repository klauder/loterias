import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { ExemplosComponent } from './exemplos.component';

describe('ExemplosComponent', () => {
  let component: ExemplosComponent;
  let fixture: ComponentFixture<ExemplosComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ ExemplosComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ExemplosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
