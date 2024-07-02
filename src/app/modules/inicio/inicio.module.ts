import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { InicioRoutingModule } from './inicio-routing.module';

//VISTA
import { InicioComponent } from './components/inicio/inicio.component';


//COMPONENTES MATERIAL
import {MatButtonModule} from '@angular/material/button';

@NgModule({
  declarations: [
    InicioComponent,
   
  ],
  imports: [
    // IMPORTAMOS DESDE LA WEB Y TRAEMOS AL MÓDULO
    CommonModule,
    InicioRoutingModule,
    MatButtonModule,

  ],
  exports: [
    //EXPORTAMOS AL RESTO DE LA PÁGINA
    MatButtonModule,
    InicioComponent
  ]
})
export class InicioModule { }
