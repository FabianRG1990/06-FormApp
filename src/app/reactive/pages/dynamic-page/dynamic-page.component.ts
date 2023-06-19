import { Component } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  templateUrl: './dynamic-page.component.html',
  styles: [
  ]
})
export class DynamicPageComponent {



  public myForm: FormGroup = this.fb.group({
    name: ['', [Validators.required, Validators.minLength(3) ] ],
    favoriteGames: this.fb.array([
      ['Metal Gear', Validators.required],
      ['Resident', Validators.required]

    ])
  });

  public newFavorite: FormControl = new FormControl('', Validators.required);

  constructor(private fb: FormBuilder){}

  get favoriteGamesControl(){
    return this.myForm.get('favoriteGames') as FormArray;
  }

  isValidField (field: string): boolean | null{
    return this.myForm.controls[field].errors //esto busca los errores y los devuelve
    && this.myForm.controls[field].touched; //este detecta si a sido utilisado
  }

  isValidFieldInArray(formArray: FormArray, index: number){
    return formArray.controls[index].errors
    && formArray.controls[index].touched;
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

//insertar varios elementos a nuestro formArray
  addToFavorites(){
    if (this.newFavorite.invalid) return;
    const newGame = this.newFavorite.value;

    //this.favoriteGamesControl.push (new FormControl(newGame, Validators.required));
    this.favoriteGamesControl.push(
      this.fb.control(newGame, Validators.required)
    );

    this.newFavorite.reset();
  }

  onDeleteFavorite(index: number){
    this.favoriteGamesControl.removeAt(index);
  }

  onSubmit():void{

    if(this.myForm.invalid){
      this.myForm.markAllAsTouched();
      return;
    }

    console.log(this.myForm.value);
    //esto me inicilisa el formulario en blanco
    (this.myForm.controls['favoriteGames'] as FormArray) = this.fb.array([])
    this.myForm.reset();


  }

}
