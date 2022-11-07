import { Component, OnInit } from '@angular/core';
import {FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {

  loginForm = this.formBuilder.group({
    email: ['', Validators.compose([Validators.required, Validators.email])],
    senha: ['',Validators.compose([Validators.required, Validators.minLength(6)])],
  });

  mensagensErro = {
    email: [{tipo: 'required', aviso: 'O campo não pode estar vazio'}, {tipo: 'email', aviso: 'Digite um e-mail válido'}],
    senha: [{tipo: 'required', aviso: 'O campo não pode estar vazio'}, {tipo: 'minlength', aviso: 'O campo deve ter no mínimo 6 dígitos'}],
  };

  constructor(private formBuilder: FormBuilder) { }

  get email(){
    return this.loginForm.get('email');
  }

  get senha(){
    return this.loginForm.get('senha');
  }

  ngOnInit() {
  }

 
}
