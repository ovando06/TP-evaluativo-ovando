import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

//importamos componentes de seccion
import { AcercaComponent } from './pages/acerca/acerca.component';
import { MantenimientoComponent } from './pages/servicios/mantenimiento/mantenimiento.component';
import { ContactoComponent } from './pages/contacto/contacto.component';
const routes: Routes = [
  {
    path:"acerca",component: AcercaComponent
  },
  {
    path:"servicios/mantenimiento",component: MantenimientoComponent
  },
  {
    path:"contacto",component: ContactoComponent
  },

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ProductoRoutingModule { 

}
