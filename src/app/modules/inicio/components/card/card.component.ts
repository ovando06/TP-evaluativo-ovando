import { Component } from '@angular/core';

//IMPORTAMOS INTERFAZ
import { Servicios } from 'src/app/models/servicios';
@Component({
  selector: 'app-card',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.css']
})
export class CardComponent {
  //propiedad publico (tipo arreglo)
  public info: Servicios[];

  //inicializar la propiedad info 
  constructor(){
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
        servicio:"Trabajo equipos estacionarios",
        imagen:"../../../../../assets/trabajo en equipos estacionarios.png",
        alt:"equipos estacionarios"

      },
      {
        id:"",
        servicio:"Trabajo en flota liviana",
        imagen:"../../../../../assets/trabajo en flota liviana.png",
        alt:"flota liviana"

      },
      {
        id:"",
        servicio:"Trabajo en flota pesada",
        imagen:"../../../../../assets/trabajo en flota pesada1.png",
        alt:"flota pesada"

      },
    ]
  }

}
