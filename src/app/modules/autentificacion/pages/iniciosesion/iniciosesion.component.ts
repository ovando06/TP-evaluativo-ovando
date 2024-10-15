import { Component } from '@angular/core';
import { Usuario } from 'src/app/models/usuario';

import { AuthService } from '../../services/auth.service';
import { FirestoreService } from 'src/app/modules/shared/services/firestore.service';
import { Router } from '@angular/router';

import * as CryptoJS from 'crypto-js';

//paqueteria de alertas personalizadas
import Swal from 'sweetalert2';

@Component({
  selector: 'app-iniciosesion',
  templateUrl: './iniciosesion.component.html',
  styleUrls: ['./iniciosesion.component.css']
})
export class IniciosesionComponent {
  //input de contraseña
  hide = true;

  /*
    public coleccionusuariosLocales: Usuario[];
  
    constructor() {
      this.coleccionusuariosLocales = [
        {
          uid: '',
          nombre: 'agostina',
          apellido: 'ovando',
          email: 'agosovando@gmail.com',
          rol: 'vis',
          password: '123456'
        },
        {
          uid: '',
          nombre: 'lucia',
          apellido: 'perez',
          email: 'luciaperez@gmail.com',
          rol: 'vis',
          password: 'abcd12'
        },
        {
          uid: '',
          nombre: 'luciano',
          apellido: 'franco',
          email: 'lucianofranco@gmail.com',
          rol: 'adm',
          password: 'abdce34'
        },
      ]
    }*/
  // ####################### FIN LOCAL


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
    password: '',
    rol: ''
  }
  //funcion para iniciar sesion
  async iniciarsesion() {
    const credenciales = {
      email: this.usuarios.email,
      password: this.usuarios.password
    }

    try{
      // obtenemos usuario de la BD
      const usuarioBD = await this.servicioAuth.obtenerUsuario(credenciales.email);

      //condicional verificaba que ese usuario de BD existiera o que sea igual al de nuestra coleccion
      if (!usuarioBD || usuarioBD.empty) {
        Swal.fire({
          title: "Ups!",
          text: "Correo electronico no está registrado",
          icon: "warning"
        });
        
        this.limpiarInputs();
        return;
      }

      //Vinculaba al primer documento de la coleccion "usuarios" que se obtenia de la BD
      const usuarioDoc = usuarioBD.docs[0];
      //Extrae los datos del documento de forma de objeto y se especifica que va a ser 
      //del tipo "usuario" (se refiere a la interfaz Usuario de nuestros modelos)
      const usuarioData = usuarioDoc.data() as Usuario;
      //encripta la contraseña que el usuario envia mediante "Iniciar sesion"
      const hashedPassword = CryptoJS.SHA256(credenciales.password).toString();
      //condicional que compara la contraseña que acabamos de encriptar
      //y que el usuario envio con la que recibimos del "usuarioData"
      if (hashedPassword !== usuarioData.password) {

        Swal.fire({
          title: "Ups!",
          text: "Contraseña incorrecta",
          icon: "error"
        });
        this.usuarios.password = '';
        return;
      }
      
      const res = await this.servicioAuth.iniciarsesion(credenciales.email, credenciales.password)
      .then(res => {
        Swal.fire({
          title: "Buen trabajo!",
          text: "¡se pudo ingresar con exito!",
          icon: "success"
        });
        
        //Almacenamos y enviamos por parámetro el rol de los datos de usuario obtenido
        this.servicioAuth.setUsuarioRol(usuarioData.rol);  
        
        if(usuarioData.rol === "admin"){
          console.log("Inicio de administrador");

          //Si es administradpr, redirecciona a la vista 'admin'
          this.servicioRutas.navigate(['/admin']);
        } else{
          console.log("Inicio de visitante");

          //Si es otro tipo de usuario, redirecciona al 'inicio'
          this.servicioRutas.navigate(['/inicio']);
        }

       
      })
      .catch(err => {
        Swal.fire({
          title: "Ups!",
          text: "hubo un problema al iniciar sesion" + err,
          icon: "warning"
        });


        this.limpiarInputs();
      })
    }catch(error){
      this.limpiarInputs();
    }

  

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
      password: this.usuarios.password = '',
      rol: this.usuarios.rol=''
    }
  }
}
