import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'filtroArray'
})
export class FiltroArrayPipe implements PipeTransform {

  // Esse é um Pipe Puro, por isso ele não olha as modificações que são feitas no transform
  transform(value: any, args?: any): any {
    
      if (value.length === 0 || args === undefined){
        return value;
      }

      let filters = args.toLowerCase();

      return value.filter(
        v => v.toLowerCase().indexOf(filters) != -1
      );
  }

}
