import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { DiretivaNgforComponent } from './diretiva-ngfor.component';

describe('DiretivaNgforComponent', () => {
  let component: DiretivaNgforComponent;
  let fixture: ComponentFixture<DiretivaNgforComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ DiretivaNgforComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DiretivaNgforComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
