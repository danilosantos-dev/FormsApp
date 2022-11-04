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
    email: [{tipo: 'required', aviso: 'O campo não pode estar vazio'}, {tipo: 'email', aviso: 'Digite um e-mail'}],
    senha: [{tipo: 'required', aviso: 'O campo não pode estar vazio'}, {tipo: 'minLength', aviso: 'Deve ter no mínimo 6 dígitos'}],
  };

  constructor(private formBuilder: FormBuilder) { }

  ngOnInit() {
  }

}
