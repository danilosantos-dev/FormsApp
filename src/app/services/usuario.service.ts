import { Injectable } from '@angular/core';
import { identity } from 'rxjs';
import { Usuario } from '../models/Usuario.model';
import { StorageService } from './storage.service';

@Injectable({
  providedIn: 'root'
})
export class UsuarioService {

  listaUsuarios: Usuario[] = [

  ];

  // Sempre declarar o servico no construtor "variavel: NomeDaClasse"
  constructor(private storageService : StorageService) {}

  //salvar usurio dentro da lista de usuarios.
  async salvar(usuario:Usuario){
    this.listaUsuarios[usuario.id]= usuario;
    await this.storageService.set('usuarios', this.listaUsuarios);
  }

  async buscarUm(){}

  // "listaUsuarios recebe a busca por "usuarios" / "as unknown as Usuario[]" caso nao tenho nd retorne vazio ou o usuario "
  async buscarTodos(){
    this.listaUsuarios = await this.storageService.get('usuarios') as unknown as Usuario[];
    if(!this.listaUsuarios){
      return [];
    }
    return this.listaUsuarios;
  }

  async deletar(){}

  // Armazenamos o idUsuario 
  async salvarId(id: number){
    await this.storageService.set('idUsuario', id);
  }
  //armazenamos nossa busca dentro de uma constante, e aplicamos uma condição para caso o id exista nos retorne ele.
  async buscarId(){
    const id =  await this.storageService.get('idUsuario');
    if(!id){
      return 0;
    }
    return id;
  }

}

