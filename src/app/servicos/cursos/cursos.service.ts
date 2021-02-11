
import { EventEmitter, Injectable } from "@angular/core";

@Injectable()
export class CursosService {

    emitirCursoCriado = new EventEmitter<string>();

    static criouNovoCurso = new EventEmitter<string>(); //Dessa forma não preciso da instância para acessar a variável, assim posso enviar informações para instâncias diferentes. 

    private cursos: string[]=['Angular 2', 'Java', 'Phonegap'];;

    constructor(){
        console.log('CursosService');
    }

    getCursos(){
        return this.cursos
    }

    addCurso(curso: string){
        this.cursos.push(curso);
        this.emitirCursoCriado.emit(curso);
        CursosService.criouNovoCurso.emit(curso);
    }

}