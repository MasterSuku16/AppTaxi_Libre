import { vector } from "./vector";
import { User } from "./user";


export class trip_data {
    origin:vector;
    destiny:vector;
    usuario_viajero:User;
    usuario_conductor:User;
    price:number;
    bitacora:[];
}

export class event_bitacora{
  type:string;
  texto:string;
  time:Date;
}