import { Component, OnInit } from '@angular/core';
import {FormBuilder, Validators} from '@angular/forms'
import { Router } from '@angular/router';
import { Usuario } from '../models/Usuario.model';
import { StorageService } from '../services/storage.service';
import { UsuarioService } from '../services/usuario.service';

@Component({
  selector: 'app-registro',
  templateUrl: './registro.page.html',
  styleUrls: ['./registro.page.scss'],
})
export class RegistroPage implements OnInit {
  
  usuario: Usuario = new Usuario();

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

  constructor(private formBuilder: FormBuilder, private bd: StorageService, private usuarioService: UsuarioService, private route: Router) {}

  async salvar(){
   if (this.registerForm.valid){

      this.usuario.nome = this.registerForm.get('nome').value;
      this.usuario.email = this.registerForm.get('email').value;
      this.usuario.cpf = this.registerForm.get('cpf').value;
      this.usuario.senha = this.registerForm.get('senha').value;

      const id = await this.usuarioService.buscarId() as number;

      this.usuario.id = id;

      this.usuarioService.salvar(this.usuario);

      this.usuarioService.salvarId(id + 1);
      alert('Sucesso !!');
      this.route.navigateByUrl('/login');

   }else{
     alert('Formulario inválido!');
   }
  }

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

}
