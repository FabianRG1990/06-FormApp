import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

@Component({
  templateUrl: './switches-page.component.html',

})
export class SwitchesPageComponent implements OnInit{

  public myForm: FormGroup = this.fb.group({
    gender: ['M', Validators.required],
    wantNotifications: [true, Validators.required],
    termsAndConditions: [false, Validators.requiredTrue],
  });

  public person = {
    gender: 'F',
    wantNotifications: false,
  }


  constructor(private fb: FormBuilder) {}

  ngOnInit(): void {
  this.myForm.reset(this.person);
  }

      isValidField (field: string): boolean | null{
      return this.myForm.controls[field].errors //esto busca los errores y los devuelve
      && this.myForm.controls[field].touched; //este detecta si a sido utilisado
    }


  //ngsubmit
  onSave(){

    if(this.myForm.invalid){
      this.myForm.markAllAsTouched();
      return;

    }
    console.log(this.myForm.value);
    this.person = this.myForm.value;


  }

}
