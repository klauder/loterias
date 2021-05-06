import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { CriarCursoComponent } from './criar-curso.component';

describe('CriarCursoComponent', () => {
  let component: CriarCursoComponent;
  let fixture: ComponentFixture<CriarCursoComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ CriarCursoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CriarCursoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
