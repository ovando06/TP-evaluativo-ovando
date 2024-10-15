import { Injectable } from '@angular/core';
//importamos interfaz
import { Producto } from 'src/app/models/producto';
//importamos angular firestore para ingresar a la BD
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/compat/firestore';
import { map } from 'rxjs';
import { Action } from 'rxjs/internal/scheduler/Action';
//importaciones para manejo de archivos y referencias
import { getDownloadURL, getStorage, ref, UploadResult, uploadString, deleteObject } from 'firebase/storage';

//la primera importacion es para obtener la URL de descarga d euna imagen

//getStorage para obtener la instancia de almav¿cenamiento

//ref es para crear referencias a ubicaciones en el almacenamiento

//uploadResult tipo que representa el resultado de una operación subida

//uploadString para subir imagenes en formato de cadena

//deleteObject para eliminar un espacio en el almacenamiento


@Injectable({
  providedIn: 'root'
})
export class CrudService {
  //definimos coleccion para los productos de la web
  private productoColecction: AngularFirestoreCollection<Producto>
  //definimos VARIABLE RESPUESTA QUE PODRA SUBIR RESULTADOS
  private respuesta!: UploadResult;
  //inicializar servicio de storage 
  private storage = getStorage();



  constructor(private database: AngularFirestore) {
    //
    this.productoColecction = database.collection('producto');
  }

  //crear productos
  crearProducto(producto: Producto, url: string) {
    return new Promise(async (resolve, reject) => {
      try {
        //Creamos numero identificativo para el producto en la Bd
        const idProducto = this.database.createId();
        //asignamos ID creado al atributo idProducto de la inhterfaz Producto
        producto.idProducto = idProducto;
        //asignams URL recibida del parámetro al atributo imagen de interfaz producto.
        producto.imagen = url;

        //
        const resultado = await this.productoColecction.doc(idProducto).set(producto);

        //
        resolve(resultado);
      } catch (error) {
        //
        reject(error);
      }
    })
  }
  //obtener productos
  obtenerProducto() {
    /**
     * snapshotchanges => toma captura del estado de los datos
     * pipe => tutorias que retornan un nuevo arreglo
     * map => "mapea" o recorre esa nueva informacion
     * a => resguarda la nueva informacion y la envia como un documento
     */
    return this.productoColecction.snapshotChanges().pipe(map(action => action.map(a => a.payload.doc.data())))
  }
  //editar productos
  modificarProducto(idProducto: string, nuevaData: Producto) {
    /**
     * accedemos a la coleccion "productos" de la BD, buscamos el ID del producto
     * seleccionado y lo actualizamos con el metodo "update", enviando la nueva informacion
     */
    return this.database.collection('producto').doc(idProducto).update(nuevaData);
  }
  //eliminar productos
  eliminarProducto(idProducto: string, imagenURL: string) {
    //
    return new Promise((resolve, reject) => {
      try {
        //definimos referencias localmente de storage
        const storage = getStorage();
        //obtiene la referencia desde el almacenamiento de storage
        const referenciaImagen = ref(storage, imagenURL);
        //
        deleteObject(referenciaImagen)
          .then((res) => {
            const respuesta = this.productoColecction.doc(idProducto).delete();
            //
            resolve(respuesta);
          })
          .catch(error =>{
            reject("Error al eliminar la imagen: \n"+error);
          } )

      }
      //va a encapsular un error o una falla, por lo tanto lo va a rechazar
      catch (error) {

        reject(error);
      }

    })
  }
  //obtener URL de imagenes
  obtenerURLimagen(respuesta: UploadResult){
    //retorna URL obtenido como referencia
    return getDownloadURL(respuesta.ref);
  }

  //Subir imagenes con sus referencias
  /**
   * 
   * @param {string} nombre //nombre de la imagen
   * @param {any} imagen   //tipo de imagenes que se pueden subir 
   * @param {string} ruta  //ruta de almacenamiento de las imagenes
   * @return //se retorna lo obtenido 
   */
  async subirimagen(nombre: string, imagen: any, ruta: string) {
    try {

      //crear una imagen de referencia
      //accede a storage (almacenamiento), ruta (carpeta) / nombre (nombreImagen)
      let referenciaImagen = ref(this.storage, ruta + '/' + nombre);

      //asignarla a la respuesta la informacion de las imagenes subidas
      this.respuesta = await uploadString(referenciaImagen, imagen, 'data_url')

        .then(resp => {
          return resp;
        })
      return this.respuesta
    }
    catch (error) {
      console.log(error);

      return this.respuesta
    }

}

}
