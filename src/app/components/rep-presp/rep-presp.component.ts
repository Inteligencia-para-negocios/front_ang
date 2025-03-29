import { Component } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-rep-presp',
  templateUrl: './rep-presp.component.html',
  styleUrls: ['./rep-presp.component.css']
})
export class RepPrespComponent {
  registerForm = new FormGroup({
    sucursal: new FormControl('', [Validators.required, Validators.minLength(10)]),
    state: new FormControl('', [Validators.required]),
    sede: new FormControl('', [Validators.required]),
    route: new FormControl('', [Validators.required]),
    address: new FormControl('', [Validators.required]),
  })



  registroSucursal(){
    console.log("Contratista ===>",this.registerForm.value)
  }
}
