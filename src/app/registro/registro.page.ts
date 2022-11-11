import { Component, OnInit } from '@angular/core';
import {FormBuilder, Validators} from '@angular/forms'
import { StorageService } from '../services/storage.service';

@Component({
  selector: 'app-registro',
  templateUrl: './registro.page.html',
  styleUrls: ['./registro.page.scss'],
})
export class RegistroPage implements OnInit {

  registerForm = this.formBuilder.group({
    nome: ['', Validators.required],
    email: ['', Validators.compose([Validators.required, Validators.email])],
    cpf: ['',Validators.compose([Validators.required, Validators.minLength(11), Validators.maxLength(11)])],
    senha: ['',Validators.compose([Validators.required, Validators.minLength(6)])],
    confirmeSenha: ['',Validators.compose([Validators.required, Validators.minLength(6)])],
  });

  mensagensErro = {
    nome: [{tipo: 'required', aviso: 'O campo não pode estar vazio'}],
    email: [{tipo: 'required', aviso: 'O campo não pode estar vazio'}, {tipo: 'email', aviso: 'Digite um e-mail válido'}],
    cpf: [{tipo: 'required', aviso: 'O campo não pode estar vazio'}, {tipo: 'minlength', aviso: 'O campo deve conter 11 dígitos'}, {tipo: 'maxlength', aviso: 'O campo deve conter 11 dígitos'}],
    senha: [{tipo: 'required', aviso: 'O campo não pode estar vazio'}, {tipo: 'minlength', aviso: 'O campo deve ter no mínimo 6 dígitos'}],
    confirmeSenha: [{tipo: 'required', aviso: 'O campo não pode estar vazio'}, {tipo: 'minlength', aviso: 'O campo deve ter no mínimo 6 dígitos'}],
  };
  pessoa = {};

  constructor(private formBuilder: FormBuilder, private bd: StorageService) { }

  get nome(){
    return this.registerForm.get('nome');
  }

  get email(){
    return this.registerForm.get('email');
  }

  get cpf(){
    return this.registerForm.get('cpf');
  }

  get senha(){
    return this.registerForm.get('senha');
  }

  get confirmeSenha(){
    return this.registerForm.get('confirmeSenha');
  }

  ngOnInit() {
  }

  async salvar(){
    this.bd.set('email', this.pessoa);
  }
}
