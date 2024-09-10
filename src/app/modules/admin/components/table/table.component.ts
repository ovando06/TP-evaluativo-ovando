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
    imagen: new FormControl('', Validators.required),
    alt: new FormControl('', Validators.required)

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
        imagen: this.producto.value.imagen!,
        alt: this.producto.value.alt!

      }
      await this.servicioCrud.crearProducto(nuevoProducto)
        .then(producto => {
          alert("Ha agregado un nuevo producto con exito!");
        })
        .catch(error => {
          alert("Ha ocurrido un error al cargar un producto")
        })
    }

  }
  
  //
  mostrarBorrar(productoSeleccionado: Producto){
    //
    this.modalVisibleProducto = true;

    this.productoSeleccionado = productoSeleccionado;
  }

  borrarProducto(){
    this.servicioCrud.eliminarProducto(this.productoSeleccionado.idProducto)
    .then(respuesta => {
      alert("Se ha podido eliminar con exito!");
    })
    .catch(error => {
      alert ("Ha ocurrido un error al eliminar el producto :( \n"+error);
    })
  }

    // EDITAR PRODUCTOS
  // Se envía y llama al momento que tocamos botón "Editar" de la tabla
  mostrarEditar(productoSeleccionado: Producto){
    this.productoSeleccionado = productoSeleccionado;
    /*
      Toma los valores del producto seleccionado y los va a
      autocompletar en el formulario del modal (menos el ID)
    */
    this.producto.setValue({
      nombre: productoSeleccionado.nombre,
      descripcion: productoSeleccionado.descripcion,
      categoria: productoSeleccionado.categoria,
      imagen: productoSeleccionado.imagen,
      alt: productoSeleccionado.alt
    })
  }

editarProducto(){
  let datos: Producto = {
    //solo id producto no se modifica por el usuario
    idProducto: this.productoSeleccionado.idProducto,
    //los demas atributos reciben nueva informacion desde el usuario
    nombre: this.producto.value.nombre!,
    descripcion: this.producto.value.descripcion!,
    categoria: this.producto.value.categoria!,
    imagen: this.producto.value.imagen!,
    alt: this.producto.value.alt!,
  }
  this.servicioCrud.modificarProducto(this.productoSeleccionado.idProducto, datos)
  .then(articulo =>{
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

}
