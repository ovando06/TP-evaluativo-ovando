import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

//importacion de componentes locales y globales
import { FooterComponent } from './footer/footer.component'; 
import { NavbarComponent } from './navbar/navbar.component'; 

//componentes material
import {MatIconModule} from '@angular/material/icon';
import {MatButtonModule} from '@angular/material/button';
import {MatToolbarModule} from '@angular/material/toolbar';
import {MatMenuModule} from '@angular/material/menu';

//importamos para acceder a todas las rutas
import { AppRoutingModule } from 'src/app/app-routing.module';

@NgModule({
  declarations: [
    NavbarComponent,
    FooterComponent
  ],
  imports: [
    CommonModule,
    AppRoutingModule,
    MatIconModule,
    MatButtonModule,
    MatToolbarModule,
    MatMenuModule
  ],
  exports: [
    NavbarComponent,
    FooterComponent,
    MatIconModule,
    MatButtonModule,
    MatToolbarModule,
    MatMenuModule
  ]
})
export class SharedModule { }
