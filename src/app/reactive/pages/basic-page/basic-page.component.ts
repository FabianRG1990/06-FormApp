import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

// simulacion de producto de backend
const txt5090 = {
  name:'RXT5090',
  price: 2500,
  inStorage: 6,
}

@Component({
  templateUrl: './basic-page.component.html',
  styles: [
  ]
})
export class BasicPageComponent implements OnInit {

  // public myForm: FormGroup = new FormGroup({
  //   name: new FormControl(''),
  //   price: new FormControl(0),
  //   inStorage: new FormControl(0),
  // });
// acontinuacion voy a crear el mismo formulario pero usando FormBuilder

 public myForm: FormGroup = this.fb.group({
  name: ['', [Validators.required, Validators.minLength(3)]],
  price: [0, [Validators.required, Validators.min(0)]],
  inStorage: [0, [Validators.required, Validators.min(0)]],
 })

constructor(private fb: FormBuilder){}

  ngOnInit(): void {
  //  this.myForm.reset(txt5090)
  }

  isValidField (field: string): boolean | null{
    return this.myForm.controls[field].errors //esto busca los errores y los devuelve
    && this.myForm.controls[field].touched; //este detecta si a sido utilisado
  }

  getFieldError(field: string): string | null{

    if (!this.myForm.controls[field]) return null;

    const errors = this.myForm.controls[field].errors || {};

    for (const key of Object.keys(errors)) {
      switch(key){
        case 'required':
          return 'Campo requerido';

          case 'minlength':
            return `Mínimo ${errors['minlength'].requiredLength} carateres`;
      }
    }
    return '';
  }

onSave():void{

  if (this.myForm.invalid) {
    this.myForm.markAllAsTouched();
    return;
  }

  console.log(this.myForm.value);

  this.myForm.reset({price: 10, inStorage: 0});//resetea el formulario

}

}
