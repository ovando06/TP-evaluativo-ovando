import { Injectable } from '@angular/core';

//cloud firestore -> accedemos a las colecciones
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/compat/firestore';

import { Usuario } from 'src/app/models/usuario';

@Injectable({
  providedIn: 'root'
})
export class FirestoreService {
  /*definimos de forma privada la coleccion de usuarios para que no sea accesible en toda 
  la aplicacion. Lo definimos como una coleccion d efirestore que respete la estructura de nuestra interfaz 'Usuario'*/
  private usuariosCollection: AngularFirestoreCollection<Usuario>

  constructor(private database: AngularFirestore) {
    /*
    usuariosCollection va a deifnir la nueva coleccion 'usuarios' que estra en nuestra
     base de datos
    */
    this.usuariosCollection = this.database.collection<Usuario>('usuarios');
  }

  agregarusuario(usuario: Usuario, id: string){
    /*
    creamos una nueva PROMESA junto los metodos:
    RESOLVE: promesa reuselota -> funciona correctamente
    REJECT: promesa rechazada -> ocurrió una falla
   */
    return new Promise(async (resolve,reject) => {
      //bloque TRY encapsula la logica RESUELTA
      try {
        usuario.uid = id

        /*
        const reusltado = coleccion de usuarios, envia como numero de documento el UID
        y setea la informacion que ingresamosn en el formulario REGISTRO
        */
        const resultado = await this.usuariosCollection.doc(id).set(usuario);

        resolve (resultado);

        //bloque CATCH encapsula la logica RECHAZADA 
      } catch(error) {
        //captura una falla y la vuelve un 'error'
        reject (error);
      }
    })

  }
}

