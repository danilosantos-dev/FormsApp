import { Component, OnInit } from '@angular/core';
import {FormBuilder, Validators} from '@angular/forms'
import { Router } from '@angular/router';
import { StorageService } from '../services/storage.service';

@Component({
  selector: 'app-produto',
  templateUrl: './produto.page.html',
  styleUrls: ['./produto.page.scss'],
})
export class ProdutoPage implements OnInit {

  produto: Produto = new Produto();

  produtoForm = this.formBuilder.group({
    nome: ['', Validators.required],
    descricao: ['', Validators.compose([Validators.required, Validators.email])],
    datavalidade: ['',Validators.compose([Validators.required, Validators.minLength(11), Validators.maxLength(11)])],
    preco: ['',Validators.compose([Validators.required, Validators.minLength(6)])],    
  });

  mensagensErro = {
    nome: [{tipo: 'required', aviso: 'O campo não pode estar vazio'}],
    descricao: [{tipo: 'required', aviso: 'O campo não pode estar vazio'}, {tipo: 'email', aviso: 'Digite um e-mail válido'}],
    datavalidade: [{tipo: 'required', aviso: 'O campo não pode estar vazio'}, {tipo: 'minlength', aviso: 'O campo deve conter 11 dígitos'}, {tipo: 'maxlength', aviso: 'O campo deve conter 11 dígitos'}],
    preco: [{tipo: 'required', aviso: 'O campo não pode estar vazio'}, {tipo: 'minlength', aviso: 'O campo deve ter no mínimo 6 dígitos'}],    
  };
  
  constructor(private formBuilder: FormBuilder, private bd: StorageService, private route: Router) {}
  
  async salvar(){
    if (this.produtoForm.valid){
 
       this.produto.nome = this.produtoForm.get('nome').value;
       this.produto.email = this.produtoForm.get('email').value;
       this.produto.cpf = this.produtoForm.get('cpf').value;
       this.produto.senha = this.produtoForm.get('senha').value;
 
       const id = await this.produtoService.buscarId() as number;
 
       this.produto.id = id;
 
       this.produtoService.salvar(this.produto);
 
       this.produtoService.salvarId(id + 1);
       alert('Sucesso !!');
       this.route.navigateByUrl('/login');
 
    }else{
      alert('Formulario inválido!');
    }
   }
 
   get nome(){
     return this.produtoForm.get('nome');
   }
 
   get descricao(){
     return this.produtoForm.get('descricao');
   }
 
   get datavalidade(){
     return this.produtoForm.get('datavalidade');
   }
 
   get preco(){
     return this.produtoForm.get('preco');
   }
 
    ngOnInit() {
  }

}
