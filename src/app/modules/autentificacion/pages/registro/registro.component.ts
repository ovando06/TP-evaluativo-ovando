import { Component } from '@angular/core';
import { Usuario } from 'src/app/models/usuario';
//importamos serviico de autentificacion
import { AuthService } from '../../services/auth.service';
//importamos servicio de firestore
import { FirestoreService } from 'src/app/modules/shared/services/firestore.service';
//importamos componente de rutas de angular
import { Router } from '@angular/router';
@Component({
  selector: 'app-registro',
  templateUrl: './registro.component.html',
  styleUrls: ['./registro.component.css']
})
export class RegistroComponent {
  //input de contraseña
  hide = true;
  //importaciones de interfaz 'usuario'

  //importar interface de usuario -> inicializar
  usuarios: Usuario = {
    uid: '',//--> inicializamos con comillas vacias porque es string
    nombre: '',
    apellido: '',
    email: '',
    rol: '',
    password: '',
  }

  //creamos coleccion de usuarios, tipo 'usuario' para arrays
  coleccionUsuario: Usuario[] = [];
  //fin de importaciones
  constructor(
    public servicioAuth: AuthService,
    public servicioFirestore: FirestoreService,
    public servicioRutas: Router
  ){}




  //funcion para el registro de nuevos usuarios
   async registrar() {
    //constante credenciales va a resguardar la informacion que ingrese el usuario
    /*REGISTRO LOCAL
    const credenciales = {
      uid: this.usuarios.uid,
      nombre: this.usuarios.nombre,
      apellido: this.usuarios.apellido,
      email: this.usuarios.email,
      rol: this.usuarios.rol,
      password: this.usuarios.password,

    }*/

      //REGISTRO CON SERVICIO
      const credenciales={
        email: this.usuarios.email,
        password: this.usuarios.password
      }

      const res = await this.servicioAuth.registrar(credenciales.email,credenciales.password)
      //el metodo THEN es una promesa que devuelve el mismo valor si todo sale bien
      .then(res => {
        alert("se pudo registrar con exito");
        
        //el metodo NAVIGATE nos redirecciona a otra vista
        this.servicioRutas.navigate(['/inicio']);
      })
      //el metodo CATCH captura una falla y la vuelve un error cuando la promesa salga mal
      .catch(error =>{
        alert("Hubo un error al registrar un nuevo usuario \n"+error);
      })

      const uid = await this.servicioAuth.obtenerUid();

      this.guardarusuario();

   
      


    //enviamos la nueva informacion como un nuevo objeto a la coleccion de usuarios
    //this.coleccionUsuario.push(credenciales)

    //notificamos al usuario que se registro bien
    //alert("¡te registraste con exito!");

    //
    this.limpiarInputs();

    //mostramos credenciales por consola
    //console.log(credenciales);
    //console.log(this.coleccionUsuario);
  }
  
  /*funcion que accede a servicio FIREBASE y envia la informacion
  agrega junto al UID
  */
  async guardarusuario(){
    this.servicioFirestore.agregarusuario(this.usuarios, this.usuarios.uid)
    .then(res => {
      console.log(this.usuarios);
    })
    .catch(err => {
      console.log('error =>', err);
    })
  }
  //funcion para vaciar los inputs del formulario
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