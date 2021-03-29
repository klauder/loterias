import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanDeactivate, RouterStateSnapshot } from '@angular/router';
import { Observable } from 'rxjs';

import { IFormCanDeactivate } from './iform-candeactivate';
//import { AlunoFormComponent } from '../alunos/aluno-form/aluno-form.component';


@Injectable({providedIn: 'root'})
export class AlunosDesactivateGuard implements CanDeactivate<IFormCanDeactivate> {
    
    canDeactivate( 
        component: IFormCanDeactivate,
        currentRoute: ActivatedRouteSnapshot, 
        currentState: RouterStateSnapshot
    ): Observable<boolean>|Promise<boolean>|boolean {

        console.log('guarda de desativação.');

        //return component.podeMudarRota();
        return component.podeDesativar();
    }

    
}