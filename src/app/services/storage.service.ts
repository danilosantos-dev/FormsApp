/* eslint-disable no-underscore-dangle */ 
import { Injectable } from '@angular/core';
import { Storage } from '@ionic/storage-angular';

@Injectable({
  providedIn: 'root'
})
export class StorageService {
  //variavel "_storage" é o gerenciador do banco de dados;
  private _storage: Storage | null = null;

  constructor(private storage: Storage) {
    this.init();
  }

  //init vai na variavel local "storage" e cria o banco de dados e armazena na "_storage";
  async init() {
    const storage = await this.storage.create();
    this._storage = storage;
  }

  //O metodo "set" armazena nossos dados atraves de uma chave e valor; 
  public async set(key: string, value: any) {
    await this._storage?.set(key, value);
  }
  //O metodo "get" busca retorna a informação para nós, o "return" é essencial;
  public async get(key: string ){
    return await this._storage.get(key);
  }
  //O metodo "delete" exclui uma informação;
  public async delete(key:string){
    await  this._storage.remove(key);
  }
}