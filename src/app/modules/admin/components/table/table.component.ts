import { Component } from '@angular/core';

import { Producto } from 'src/app/models/producto';

import { CrudService } from '../../services/crud.service';

import { FormControl, FormGroup, Validators } from '@angular/forms';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.css']
})
export class TableComponent {
  //creamos coleccion local de productos -> la definimos como array
  coleccionProductos: Producto[] = [];

  // el signo de exclamacion sirve para tomar valores vacios
  productoSeleccionado!: Producto;

  modalVisibleProducto: boolean = false;

  nombreImagen!: string;

  imagen!: string;

  //definimos formulario para los productos 
  /**
   * atributos alfanumericos (string) se inicializan con comillas simples
   * atributos numericos (number) se inicializan con cero
   */
  producto = new FormGroup({
    //
    nombre: new FormControl('', Validators.required),
    descripcion: new FormControl('', Validators.required),
    categoria: new FormControl('', Validators.required),
    //imagen: new FormControl('', Validators.required),
    alt: new FormControl('', Validators.required),

  })
  constructor(public servicioCrud: CrudService) { }
  ngOnInit(): void {
    this.servicioCrud.obtenerProducto().subscribe(producto => {
      this.coleccionProductos = producto;
    })
  }

  async agregarProducto() {
    //
    if (this.producto.valid) {
      let nuevoProducto: Producto = {
        idProducto: '',
        nombre: this.producto.value.nombre!,
        descripcion: this.producto.value.descripcion!,
        categoria: this.producto.value.categoria!,
        imagen: "",
        alt: this.producto.value.alt!,

      }
      await this.servicioCrud.subirimagen(this.nombreImagen, this.imagen, "productos")
        .then(res => {
          this.servicioCrud.obtenerURLimagen(res)
            .then(url => {
              this.servicioCrud.crearProducto(nuevoProducto, url)
                .then(producto => {
                  Swal.fire({
                    title: "bien!",
                    text: "ha agregado un nuevo prodcuto con éxito",
                    icon: "success"
                  });
                })
                .catch(error => {
                  Swal.fire({
                    title: "oh no!",
                    text: "ha ocurrido un error al cargar un nuevo producto \n" + error,
                    icon: "error"
                  });
                })
            })
        })

    }

  }

  //cargar imagenes
  cargarimagen(event: any) {
    //variable para obtener el archivo subido desde el html
    let archivo = event.target.files[0];

    //variable para crear un nuevo objeto de tipo "archivo" o "file" y leerlo
    let reader = new FileReader();

    if (archivo != undefined) {
      //llamammos a método readeAsdaraURL para leer toda la información recibida
      //enviamos como parámetro el archivo.
      //porque será el encargador de tener la info ingresada por el usuario
      reader.readAsDataURL(archivo);

      reader.onloadend = () => {
        let url = reader.result;

        if (url != null) {
          this.nombreImagen = archivo.name;

          this.imagen = url.toString();
        }
      }
    }
  }

  //
  mostrarBorrar(productoSeleccionado: Producto) {
    //
    this.modalVisibleProducto = true;

    this.productoSeleccionado = productoSeleccionado;
  }

  borrarProducto() {
    this.servicioCrud.eliminarProducto(this.productoSeleccionado.idProducto, this.productoSeleccionado.imagen)
      .then(respuesta => {
        Swal.fire({
          title: "bien!",
          text: "se ha eliminado correctamente!",
          icon: "success"
        });
      })
      .catch(error => {
        Swal.fire({
          title: "oh no!",
          text: "ha ocurrido un error al cargar un nuevo producto \n" + error,
          icon: "error"
        });
      })
  }

  // EDITAR PRODUCTOS
  // Se envía y llama al momento que tocamos botón "Editar" de la tabla
  mostrarEditar(productoSeleccionado: Producto) {
    this.productoSeleccionado = productoSeleccionado;
    /*
      Toma los valores del producto seleccionado y los va a
      autocompletar en el formulario del modal (menos el ID)
    */
    this.producto.setValue({
      nombre: this.producto.value.nombre!,
      descripcion: this.producto.value.descripcion!,
      categoria: this.producto.value.categoria!,
      //imagen: productoSeleccionado.imagen,
      alt: this.producto.value.alt!,
    })
  }

  editarProducto() {
    let datos: Producto = {
      //solo id producto no se modifica por el usuario
      idProducto: this.productoSeleccionado.idProducto,
      //los demas atributos reciben nueva informacion desde el usuario
      nombre: this.producto.value.nombre!,
      descripcion: this.producto.value.descripcion!,
      categoria: this.producto.value.categoria!,
      imagen: this.productoSeleccionado.imagen,
      alt: this.producto.value.alt!,
    }

    //vamos a verificar si el usuario ingresa o no, una nueva imagen
    if (this.imagen) {
      this.servicioCrud.subirimagen(this.nombreImagen, this.imagen, "productos")
        .then(res => {
          this.servicioCrud.obtenerURLimagen(res)
            .then(url => {
              datos.imagen = url; //actualizamos la url de la imagen en los datos del formulario

              this.actualizarProducto(datos);//actualizamos los datos

              this.producto.reset();//vaciar las casillas del formulario
            })
            .catch(error => {
              Swal.fire({
                title: "Oh no!",
                text: "Hubo un problema al subir la imagen :( \n" + error,
                icon: "error",
              })
            })
        })
    } else {
      //actualizamos formulario con los dats recibidos del usuario pero sin modificar la imagen que ya
      //existe en firestore y storage.
      this.actualizarProducto(datos);
    }



    this.servicioCrud.modificarProducto(this.productoSeleccionado.idProducto, datos)
      .then(articulo => {
        Swal.fire({
          title: "bien!",
          text: "se edito el producto con éxito!",
          icon: "success",
        });
        this.producto.reset();
      })
      .catch(error => {
        Swal.fire({
          title: "error!",
          text: "error al editar el producto",
          icon: "error"
        });
        this.producto.reset();
      })
  }

  //ACTUALIZAR la información ya existente de los productos
  actualizarProducto(datos: Producto) {
    //enviamos al método el id jdel prodcuto seleccionado y los datos actualizads
    this.servicioCrud.modificarProducto(this.productoSeleccionado.idProducto, datos)
      .then(articulo => {
        Swal.fire({
          title: "bien!",
          text: "se edito el producto con éxito!",
          icon: "success",
        });
        this.producto.reset();
      })
      .catch(error => {
        Swal.fire({
          title: "error!",
          text: "error al editar el producto \n" + error,
          icon: "error"
        });
        this.producto.reset();
      })
  }

}
