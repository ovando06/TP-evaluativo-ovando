import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

//ruta padre -> modulo raiz
import { AppRoutingModule } from './app-routing.module';

//archivo component general
import { AppComponent } from './app.component';

import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatIconModule } from '@angular/material/icon';
import { MatListModule } from '@angular/material/list';

//solo importamos componentes globales
import { SharedModule } from './modules/shared/shared.module'; 

//firebase -> importamos herramientas de la base de datos
import { environment } from 'src/enviroment/enviroment';//vincula a la BD con la app
import { AngularFireModule } from '@angular/fire/compat';// trabaja con las colecciones de infomarcion
import { AngularFireAuthModule } from '@angular/fire/compat/auth';// trabaja con la autentificacion
import { AngularFireStorageModule } from '@angular/fire/compat/storage';
import { PedidoComponent } from './modules/components/pedido/pedido.component';
@NgModule({ 
  declarations: [
    AppComponent,
    PedidoComponent,
    
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    //MATERIAL
    MatToolbarModule,
    MatButtonModule,
    MatSidenavModule,
    MatIconModule,
    MatListModule,
    //COMPONENTES GLOBALES
    SharedModule,
    //VINCULACION CON FIREBASE
    AngularFireModule.initializeApp(environment.firebaseConfig),//inicializar firebase dentro del proyecto
    AngularFireAuthModule,
    AngularFireStorageModule


  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
