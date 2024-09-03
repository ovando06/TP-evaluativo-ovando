import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AdminRoutingModule } from './admin-routing.module';

//vista
import { AdminComponent } from './pages/admin/admin.component';

//componente
import { TableComponent } from './components/table/table.component';

//paqueteria para formularios y formularios reactivos
import { FormsModule,ReactiveFormsModule } from '@angular/forms';

//componentes de material
import { MatIconModule } from '@angular/material/icon';
@NgModule({
  declarations: [
    AdminComponent,
    TableComponent
  ],
  imports: [
    CommonModule,
    AdminRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    MatIconModule
    
  ],
  exports:[
    AdminComponent,
    TableComponent,
    FormsModule,
    ReactiveFormsModule
  ]
})
export class AdminModule { }

