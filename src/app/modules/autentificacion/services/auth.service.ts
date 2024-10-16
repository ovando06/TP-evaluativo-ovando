import { Injectable } from '@angular/core';
//servicio en la nube de autentificacion de firebase
import { AngularFireAuth} from '@angular/fire/compat/auth';
//accedemos directamente al servicio de firebase
import { AngularFirestore } from '@angular/fire/compat/firestore';
//Observables para oobtener cambios
import { Observable } from 'rxjs';
//Itera colección leyendo información actual
import { map } from 'rxjs/operators';




@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private rolUsuario: string | null = null;

// referenciar auth de firebase en el servicio
  constructor(
    private auth: AngularFireAuth,
    private servicioFirestore: AngularFirestore) { }

  //FUNCION PARA REGISTRO
  registrar(email:string, password:string){
    //retorna el valor que es creado con el metodo "createEmail..."
     return this.auth.createUserWithEmailAndPassword(email, password);

  }
  //FUNCION PARA INICIAR SESION
  iniciarsesion(email:string, password:string){
    //validar la informaicon del usuario -> saber si existe en la coleccion
    return this.auth.signInWithEmailAndPassword(email,password);
  }


  //FUNCION PARA CERRAR SESION
  cerrarsesion(){
    //devuelve una promesa vacia -> quita token
    return this.auth.signOut();
  }

  //FUNCION PARA TOMAR EL UID
  async obtenerUid(){
    //nos va a generar una promesa y la constante la va a capturar
    const user = await this.auth.currentUser;

    /*
    si el usuario no respeta la estructura de la interfaz/
    si tuvo porblemas para el registro --> ej: mal internet
    */    
    if (user == null) {
      return null;
    } else{
      return user.uid;
    }

  }

  obtenerUsuario(email: string){
    /**
     * retornaamos del servicioFirestore la coleccion de 'usuarios', buscamos una referencia en los email regustrados
     * y los comparamos con los que ingrese el usuario al INICIAR SESION
     * lo vuelve una promesa => 
     */
    return this.servicioFirestore.collection('usuarios', ref => ref.where('email','==',email)).get().toPromise();
  }

  //FUNCIÓN PARA OBTENER EL ROL DEL USUARIO
  obtenerRol(uid: string): Observable <string | null>{
    //Accedemos a colección de usuarios, buscando por UID, obteniendo cambios
    //en valores al enviar info, por tubería, "mapeamos" la colección, obtenemos un usuario específico y
    //buscamos su atributo "rol", aún si este es 2nulo
    return this.servicioFirestore.collection("usuarios").doc(uid).valueChanges()
    .pipe(map((usuario: any) => usuario ? usuario.rol:null));

  }
  //Enviar el rol obtenido
  setUsuarioRol(rol: string){
    this.rolUsuario= rol;
  }

  //obtener el rol y asignarlo al rol de la variable local
  getUsuarioRol(): string | null {
    return this.rolUsuario;
  }
}