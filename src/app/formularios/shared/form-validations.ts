import { FormArray, FormControl } from '@angular/forms';

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

    static requiredCheckbox(control: FormControl){
        
        if (control.value){
            return control.value ? null : { checkRequired: true };
        }

        return { checkRequired: true };
        
    }

    static cepValidator(control: FormControl){

        const cep = control.value;
        
        if (cep && cep !==''){
            const validacep = /^[0-9]{5}-[0-9]{3}$/;

            return validacep.test(cep) ? null : { cepInvalido: true };
        }

        return null;
    }

}