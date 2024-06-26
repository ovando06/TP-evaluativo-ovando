import { Component } from '@angular/core';
//IMPORTAMOS INTERFACE
import { Usuario } from 'src/app/models/usuario';

import { AuthService } from '../../services/auth.service';
import { FirestoreService } from 'src/app/modules/shared/services/firestore.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-iniciosesion',
  templateUrl: './iniciosesion.component.html',
  styleUrls: ['./iniciosesion.component.css']
})
export class IniciosesionComponent {
//input de contraseña
hide = true;




constructor(
  public servicioAuth: AuthService,
  public servicioFirestore: FirestoreService,
  public servicioRutas: Router

) { }


//########################### INGRESADO
//definimos la interfaz de usuario
usuarios: Usuario = {
  uid: '',
  nombre: '',
  apellido: '',
  email: '',
  rol: '',
  password: ''
}
//funcion para iniciar sesion
async iniciarsesion() {
  //recibe la informacion ingresada desde el navegador
  /* const credenciales = {
     uid: this.usuarios.uid,
     nombre: this.usuarios.nombre,
     apellido: this.usuarios.apellido,
     email: this.usuarios.email,
     rol: this.usuarios.rol,
     password: this.usuarios.password,
   }

   //repetitiva para recorrer todos los usuarios locales
   for(let i = 0; i<this.coleccionusuariosLocales.length; i++){
     //usuarioLocal corresponde 
     const usuariolocal= this.coleccionusuariosLocales[i];

     if(usuariolocal.nombre===credenciales.nombre&&usuariolocal.apellido===credenciales.apellido&&usuariolocal.email===
       credenciales.email&&usuariolocal.rol===credenciales.rol&&usuariolocal.password===credenciales.password){
         //notificamos al usuario que pudo ingresar
       alert("ingresaste con exito");
       //paramos a la funcion
       break;
     }
     else{
       alert("Ocurrio un error al iniciar sesion");
       break;
     }
   }*/

  const credenciales = {
    email: this.usuarios.email,
    password: this.usuarios.password
  }

  const res = await this.servicioAuth.iniciarsesion(credenciales.email, credenciales.password)
    .then(res => {
      alert('¡se pudo ingresar con exito!');

      this.servicioRutas.navigate(['/inicio']);
    })
    .catch(err => {
      alert('hubo un problema al iniciar sesion' + err);

      this.limpiarInputs();
    })

}
limpiarInputs() {
  /*
  en constante "inputs" llamamos a los atributos y lo inicializamos como vaios (string= '',number=0)
  */
  const inputs = {
    uid: this.usuarios.uid = '',
    nombre: this.usuarios.nombre = '',
    apellido: this.usuarios.apellido = '',
    email: this.usuarios.email = '',
    rol: this.usuarios.rol = '',
    password: this.usuarios.password = '',
  }
}
}
