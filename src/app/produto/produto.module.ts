import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ProdutoPageRoutingModule } from './produto-routing.module';

import { ProdutoPage } from './produto.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule, ReactiveFormsModule,
    IonicModule,
    ProdutoPageRoutingModule
  ],
  declarations: [ProdutoPage]
})
export class ProdutoPageModule {}
