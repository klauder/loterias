import { EventEmitter, Injectable } from "@angular/core";

import { LogService } from './../../shared/log.service';

@Injectable()
export class CursosService {

    emitirCursoCriado = new EventEmitter<string>();

    static criouNovoCurso = new EventEmitter<string>(); //Dessa forma não preciso da instância para acessar a variável, assim posso enviar informações para instâncias diferentes. 

    private cursos: string[]=['Angular 2', 'Java', 'Phonegap'];;

    constructor(private logService: LogService){
        console.log('CursosService');
    }

    getCursos(){
        this.logService.consoleLog('Obtendo lista de cursos ...');
        return this.cursos
    }

    addCurso(curso: string){
        this.logService.consoleLog(`Criando o curso: ${curso}` );
        this.cursos.push(curso);
        this.emitirCursoCriado.emit(curso);
        CursosService.criouNovoCurso.emit(curso);
    }

}