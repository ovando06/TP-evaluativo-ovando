import { Component } from '@angular/core';
import { Producto } from 'src/app/models/producto';

//IMPORTAMOS INTERFAZ
import { Servicios } from 'src/app/models/servicios';

import Swal from 'sweetalert2';
@Component({
  selector: 'app-card',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.css']
})
export class CardComponent {
  //propiedad publico (tipo arreglo)
  public info: Servicios[];

  //inicializar la propiedad info 
  constructor(
   
  ){
    //
    this.info=[
      {
        id:"",
        servicio:"Equipos de enganche",
        imagen:"../../../../../assets/equipos de enganche.png",
        alt:"equipos de enganche"

      },
      {
        id:"",
        servicio:"Equipos estacionarios",
        imagen:"../../../../../assets/trabajo en equipos estacionarios.png",
        alt:"equipos estacionarios"

      },
      {
        id:"",
        servicio:"Flota liviana",
        imagen:"../../../../../assets/trabajo en flota liviana.png",
        alt:"flota liviana"

      },
      {
        id:"",
        servicio:"Flota pesada",
        imagen:"../../../../../assets/trabajo en flota pesada1.png",
        alt:"flota pesada"

      },
    ]
  }

  

}
