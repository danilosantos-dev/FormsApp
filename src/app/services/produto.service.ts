import { Injectable } from '@angular/core';
import { Produto } from '../models/Produto.model';
import { StorageService } from './storage.service';

@Injectable({
  providedIn: 'root'
})
export class ProdutoService {

  listaProdutos: Produto[] = [];

  constructor(private storageService: StorageService) { }

  //salvar usurio dentro da lista de usuarios.
  async salvar(produto:Produto){
    await this.buscarTodos();
    this.listaProdutos[produto.id]= produto;
    await this.storageService.set('produtos', this.listaProdutos);
  }

  // Traz todos os usuarios e busca um id especifico
  async buscarUm(id: number){
    await this.buscarTodos();
    return this.listaProdutos[id];
  }

  // "listaUsuarios recebe a busca por "usuarios" / "as unknown as Usuario[]" caso nao tenho nd retorne vazio ou o usuario "
  async buscarTodos(){
    this.listaProdutos = await this.storageService.get('produtos') as unknown as Produto[];
    if(!this.listaProdutos){
      this.listaProdutos = [];
    }
    return this.listaProdutos;
  }

  async deletar(id: number){
   await this.buscarTodos(); // Atualiza a lista de usuarios
    this.listaProdutos.slice(id, 1); // Remove o usuario do array
    await this.storageService.set('produtos',this.listaProdutos); // Salva o array 
  }

  // Armazenamos o idUsuario com o metodo 'set'
  async salvarId(id: number){
    await this.storageService.set('idProduto', id);
  }

  //armazenamos nossa busca dentro de uma constante, e aplicamos uma condição para caso o id exista nos retorne ele.
  async buscarId(){
    const id =  await this.storageService.get('idProduto');
    if(!id){
      return 0;
    }
    return id;
  }

}
