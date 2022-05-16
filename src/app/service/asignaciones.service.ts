import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Asignacion } from '../models/asignacion';

@Injectable({
  providedIn: 'root'
})
export class AsignacionesService {
  ruta: string = 'http://localhost:8080/asignacion/'
  constructor(private http: HttpClient) { }

  createAsignacion(asignacion: Asignacion) {
    return this.http.post<Asignacion>(this.ruta, asignacion, {
      observe: 'response'
    })
  }
  getAsignacion() {
    return this.http.get<Asignacion[]>(this.ruta + 'asignaciones')
  }

  getAsignacionPorAgente(idAgente : number){
    return this.http.get<Asignacion[]>(this.ruta + 'agentes/' + idAgente)
  }

  getAsignacionPorVias(identificador : number){
    return this.http.get<Asignacion[]>(this.ruta + 'vias/' + identificador)
  }
}
