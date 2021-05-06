import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { CicloComponent } from './ciclo.component';

describe('CicloComponent', () => {
  let component: CicloComponent;
  let fixture: ComponentFixture<CicloComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ CicloComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CicloComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
