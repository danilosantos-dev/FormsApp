import { Component, OnInit } from '@angular/core';
import {FormBuilder, Validators} from '@angular/forms'
import { Router } from '@angular/router';
import { Produto } from '../models/Produto.model';
import { ProdutoService } from '../services/produto.service';
import { StorageService } from '../services/storage.service';

@Component({
  selector: 'app-produto',
  templateUrl: './produto.page.html',
  styleUrls: ['./produto.page.scss'],
})
export class ProdutoPage implements OnInit {

  produto: Produto = new Produto();

  produtoForm = this.formBuilder.group({
    nome: ['', Validators.compose([Validators.required,Validators.maxLength(30)])],
    descricao: ['', Validators.compose([Validators.required, Validators.maxLength(50)])],
    dataValidade: ['',Validators.required],
    preco: ['',Validators.required],    
  });

  mensagensErro = {
    nome: [{tipo: 'required', aviso: 'O campo não pode estar vazio'}, {tipo: 'maxlength', aviso: 'O campo deve conter no máximo 30 caracteres'}],
    descricao: [{tipo: 'required', aviso: 'O campo não pode estar vazio'}, {tipo: 'maxlength', aviso: 'O campo deve conter no máximo 50 caracteres'}],
    dataValidade: [{tipo: 'required', aviso: 'O campo não pode estar vazio'}],
    preco: [{tipo: 'required', aviso: 'O campo não pode estar vazio'}],    
  };
  
  constructor(private formBuilder: FormBuilder, private bd: StorageService, private route: Router, private produtoService: ProdutoService ) {}
  
  async salvar(){
    if (this.produtoForm.valid){
 
       this.produto.nome = this.produtoForm.get('nome').value;
       this.produto.descricao = this.produtoForm.get('descricao').value;
       this.produto.dataValidade = this.produtoForm.get('dataValidade').value;
       this.produto.preco = this.produtoForm.get('preco').value;
 
       const id = await this.produtoService.buscarId() as number;
 
       this.produto.id = id;
 
       this.produtoService.salvar(this.produto);
 
       this.produtoService.salvarId(id + 1);
       alert('Sucesso !!');
       this.route.navigateByUrl('/tabs/tab2');
 
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
     return this.produtoForm.get('dataValidade');
   }
 
   get preco(){
     return this.produtoForm.get('preco');
   }
 
    ngOnInit() {
  }

}
