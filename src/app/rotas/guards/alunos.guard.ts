import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivateChild, RouterStateSnapshot } from '@angular/router';
import { Observable } from 'rxjs';

@Injectable({providedIn: 'root'})
export class AlunosGuard implements CanActivateChild {
    constructor() { }

    canActivateChild(
        route: ActivatedRouteSnapshot, 
        state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {

        console.log(route);
        console.log(state);

        if (state.url.includes('editar')){
            alert('Usuário não tem permissão para acessar essa página.')
            return false;
            //return Observable.call(false);
        }
        return true;
    }
}