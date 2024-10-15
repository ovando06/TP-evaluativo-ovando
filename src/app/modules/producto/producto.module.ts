import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import {MatTabsModule} from '@angular/material/tabs';

import { ProductoRoutingModule } from './producto-routing.module';
import { AcercaComponent } from './pages/acerca/acerca.component';
import { ContactoComponent } from './pages/contacto/contacto.component';
import { MantenimientoComponent } from './pages/servicios/mantenimiento/mantenimiento.component';


@NgModule({
  declarations: [
    AcercaComponent,
    ContactoComponent,
    MantenimientoComponent,
    
  ],
  imports: [
    CommonModule,
    ProductoRoutingModule,
    MatTabsModule
  ],
  exports:[
    MatTabsModule,
    AcercaComponent,
    ContactoComponent,
    MantenimientoComponent
  ]
})
export class ProductoModule { }
