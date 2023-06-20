import { FormControl, ValidationErrors } from "@angular/forms";


export const firstNameAndLastnamePattern: string = '([a-zA-Z]+) ([a-zA-Z]+)';
export const emailPattern: string = "^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$";

//manejo de error de username
export const cantBeStrider = (control: FormControl): ValidationErrors | null => {

  const value: string = control.value.trim().toLowerCase();

if (value === 'strider'){
  return{
    noStriker: true,
  }
}

  return null;

}
