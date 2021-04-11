import { FormArray, FormControl, FormGroup } from '@angular/forms';

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
            const validacep = /^[0-9]{2}[.]?[0-9]{3}[-]?[0-9]{3}$/; // Aceita cep: 00.000-000, 00000-000,00000000

            return validacep.test(cep) ? null : { cepInvalido: true };
        }

        return null;
    }

    static equalsTo(otherField: string){
        const validator = (formControl: FormControl) => {
            const formGrop = (<FormGroup>formControl.root);

            if(otherField == null) {
                throw new Error('É necessário informar um campo');
            }

            //console.log(formGrop);

            // Isso é para verificar se o campo e o formalário já estão prontos para serem validados
            if (!formControl.root || !formGrop.controls){
                return null;
            }

            const field = formGrop.get(otherField);
 
            if(!field){
                throw new Error('É necessário informar um campo válido')
            }

            if(field.value !== formControl.value){
                return { equalsTo: otherField };
            }

            return null; //caso os valores sejam iguais
        };

        return validator;
    }

    static getErrorMsg(fieldName: string, validatorName: string, validatorValue?: any){
        const config = {
           'required':`O campo ${fieldName} é obrigatório.`,
           'email':`Email ${fieldName} inválido.`,
           'emailCadastrado':`Email já cadastrado.`,
           'minlength':`O campo ${fieldName} precisa ter no mínimo ${validatorValue.requiredLength} caracteres.`, 
           'maxlength':`O campo ${fieldName} precisa ter no máximo ${validatorValue.requiredLength} caracteres.`,
           'cepInvalido':`CEP inválido.`,
           'equalsTo':`Os campos não são iguais.`,
           'checkRequired': 'Favor marcar o check.'
        };
        
        return config[validatorName];
    }
}