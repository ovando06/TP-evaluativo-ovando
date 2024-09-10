import { Injectable } from '@angular/core';
//importamos interfaz
import { Producto } from 'src/app/models/producto';
//importamos angular firestore para ingresar a la BD
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/compat/firestore';
import { map } from 'rxjs';
import { Action } from 'rxjs/internal/scheduler/Action';

@Injectable({
  providedIn: 'root'
})
export class CrudService {
  //definimos coleccion para los productos de la web
  private productoColecction: AngularFirestoreCollection<Producto>



  constructor(private database: AngularFirestore) {
    //
    this.productoColecction= database.collection('producto');
   }

   //crear productos
   crearProducto(producto: Producto){
    return new Promise(async(resolve,reject)=>{
      try{
        //Creamos numero identificativo para el producto en la Bd
        const idProducto = this.database.createId();
        //asignamos ID creado al atributo idProducto de la inhterfaz Producto
        producto.idProducto = idProducto;

        //
        const resultado = await this.productoColecction.doc(idProducto).set(producto);

        //
        resolve(resultado);
      }catch(error){
        //
        reject(error);
      }
    })
   }
   //obtener productos
   obtenerProducto(){
    /**
     * snapshotchanges => toma captura del estado de los datos
     * pipe => tutorias que retornan un nuevo arreglo
     * map => "mapea" o recorre esa nueva informacion
     * a => resguarda la nueva informacion y la envia como un documento
     */
    return this.productoColecction.snapshotChanges().pipe(map(action => action.map(a => a.payload.doc.data())))
   }
   //editar productos
  modificarProducto(idProducto: string, nuevaData: Producto){
    /**
     * accedemos a la coleccion "productos" de la BD, buscamos el ID del producto
     * seleccionado y lo actualizamos con el metodo "update", enviando la nueva informacion
     */
    return this.database.collection('producto').doc(idProducto).update(nuevaData);
  }
   //eliminar productos
   eliminarProducto(idProducto: string){
    //
    return new Promise((resolve, reject) => {
      try{
        const respuesta = this.productoColecction.doc(idProducto).delete();
        //
        resolve (respuesta);
      }
      //va a encapsular un error o una falla, por lo tanto lo va a rechazar
      catch(error){

        reject(error);
      }

    })
   }

}
