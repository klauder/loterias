import { FormArray } from '@angular/forms';

export class FormValations {
 
    static requiredMinCheckbox(min = 1){
        const validator = (formArray: FormArray) => {
         
          /*
           let totalCheck = 0;
          const values = formArray.controls;
    
          for(let i = 0; i < values.length; i++){
            totalCheck += (values[i].value) ? 1 : 0;
          }
          */
    
          const totalCheck = formArray.controls
            .map(v => v.value)
            .reduce(
                (total, current) => current ? total + current : total,
                0 
              );
    
          return totalCheck >= min ? null : { required: true };
    
        };
    
        return validator;                                                                                                                                                                                                                                                                  
        
      }
}