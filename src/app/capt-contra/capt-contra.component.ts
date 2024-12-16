import { Component } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-capt-contra',
  templateUrl: './capt-contra.component.html',
  styleUrls: ['./capt-contra.component.css']
})
export class CaptContraComponent {
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
