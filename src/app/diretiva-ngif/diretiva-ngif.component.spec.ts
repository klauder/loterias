import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { DiretivaNgifComponent } from './diretiva-ngif.component';

describe('DiretivaNgifComponent', () => {
  let component: DiretivaNgifComponent;
  let fixture: ComponentFixture<DiretivaNgifComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ DiretivaNgifComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DiretivaNgifComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
