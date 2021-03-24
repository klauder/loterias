import { AuthService } from './rotas/login/auth.service';
import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'loterias';
  valor = 5;
  deletarCiclo = false;

  mostrarMenu: boolean = false;

  mudarValor(): void {
    this.valor++;
  }

  destruirCiclo(): void {
    this.deletarCiclo = true;
  }

  constructor(private authService: AuthService){

  }

  ngOnInit(): void {
    this.authService.mostrarMenuEmitter.subscribe(
      mostrar => this.mostrarMenu = mostrar
    );

  }

}
