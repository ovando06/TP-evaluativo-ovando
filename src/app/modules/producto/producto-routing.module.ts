import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

//importamos componentes de seccion
import { AcercaComponent } from './pages/acerca/acerca.component';
import { ServiciosComponent } from './pages/servicios/servicios.component';
import { ContactoComponent } from './pages/contacto/contacto.component';
const routes: Routes = [
  {
    path:"acerca",component: AcercaComponent
  },
  {
    path:"servicios",component: ServiciosComponent
  },
  {
    path:"contacto",component: ContactoComponent
  }

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ProductoRoutingModule { 

}
