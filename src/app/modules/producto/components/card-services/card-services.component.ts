import { Component } from '@angular/core';
import { Producto } from 'src/app/models/producto';
import { CrudService } from 'src/app/modules/admin/services/crud.service';

@Component({
  selector: 'app-card-services',
  templateUrl: './card-services.component.html',
  styleUrls: ['./card-services.component.css']
})
export class CardServicesComponent {

   //coleccion de todos los productos d eforma local
   coleccionProductos: Producto[] = [];

   //coleccion de productos de una sola categoria
   coleccionServicios: Producto[] = [];

    //variable para seleccionar productos específicos
  productoSeleccionado!: Producto;


     //patentamos de forma local el servicio para acceder en él
  constructor(public servicioCrud: CrudService) { }

   //inicializa al momento que renderiza el componente
   ngOnInit(): void {
    //accedemos a metodo obtenerProducto y nos subscribimos a los cambios
    //recibimos notificacion ante modificaciones
    this.servicioCrud.obtenerProducto().subscribe(producto => {
      this.coleccionProductos = producto;

      //mostrará la coleccion de esa categoria hasta el momento
      this.mostrarProductoServicio();
    })
  }

  //funcion para filtrar los productos de tipo "accesorios"
  mostrarProductoServicio() {
    //iteramos coleccion de productos con un forEach
    this.coleccionProductos.forEach(producto => {
      // si es d etipo "accesorio" -> condicional
      if (producto.categoria === "servicios") {
        //lo sube/guarda en la coleccion de productos tipo "servicio"
        this.coleccionServicios.push(producto);
      }
    })
  }

  mostrarVer(info: Producto){

    this.productoSeleccionado = info;              
  }






}
