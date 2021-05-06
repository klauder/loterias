import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { AlunoDetalheComponent } from './aluno-detalhe.component';

describe('AlunoDetalheComponent', () => {
  let component: AlunoDetalheComponent;
  let fixture: ComponentFixture<AlunoDetalheComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ AlunoDetalheComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AlunoDetalheComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
