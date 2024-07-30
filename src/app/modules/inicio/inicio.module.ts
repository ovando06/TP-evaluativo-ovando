import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { InicioRoutingModule } from './inicio-routing.module';

//VISTA
import { InicioComponent } from './components/inicio/inicio.component';


//COMPONENTES MATERIAL
import {MatButtonModule} from '@angular/material/button';
import { CardComponent } from './components/card/card.component';

//COMPONENTES MATERIAL

import {MatCardModule} from '@angular/material/card';

@NgModule({
  declarations: [
    InicioComponent,
    CardComponent
   
  ],
  imports: [
    // IMPORTAMOS DESDE LA WEB Y TRAEMOS AL MÓDULO
    CommonModule,
    InicioRoutingModule,
    MatButtonModule,
    MatCardModule

  ],
  exports: [
    //EXPORTAMOS AL RESTO DE LA PÁGINA
    MatButtonModule,
    InicioComponent,
    MatCardModule
  ]
})
export class InicioModule { }
