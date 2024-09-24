import { Component } from '@angular/core';
import { AuthService } from 'src/app/modules/autentificacion/services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent {
  logueado = true; // booleana para manejo de registro y el inicio sesion
  deslogueado = false; // booleana para manejo de cierre de sesion

  constructor(public servicioAuth: AuthService,
  public servicioRutas: Router
){}
// funcion "ingresar" para invertir los valores
ingresar(){
  this.logueado = false;
  this.deslogueado = true;
}
//funcion "cerrar sesion" devuelve los valores originales
cerrarSesion(){
this.deslogueado=false;
this.logueado= true;

//llamamaos al metodo de "cerrar sesion" para limpiar el "token"
this.servicioAuth.cerrarsesion();

//redirigimos a la raiz del sitio web
this.servicioRutas.navigate(['/']);
}

  //funcion cambiar fondo
cambiarfondo(){
  let toggle: HTMLInputElement | null = document.getElementById('toggle') as HTMLInputElement;
  let label_toggle:HTMLElement | null = document.getElementById('label_toggle') as HTMLElement;

  if(toggle){
    let checked: boolean = toggle.checked;
    document.body.classList.toggle('dark',checked)

    if(checked){
      label_toggle!.innerHTML = '<i class="fa-solid fa-sun"></i>';
    }else{
      label_toggle!.innerHTML = '<i class="fa-solid fa-moon icono1"></i>'
    }
  }
}

}
