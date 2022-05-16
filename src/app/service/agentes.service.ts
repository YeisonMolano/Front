import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Agente } from '../models/agente';

@Injectable({
  providedIn: 'root'
})
export class AgentesService {
  ruta: string = 'http://localhost:8080/agente/'
  constructor(private http: HttpClient) { }

  updateAgente(agente: Agente) {
    return this.http.put<Agente>(this.ruta, agente, {
      observe: 'response'
    })
  }
  createAgente(agente: Agente) {
    return this.http.post<Agente>(this.ruta, agente, {
      observe: 'response'
    })
  }
  getAgentes() {
    return this.http.get<Agente[]>(this.ruta + 'agentes')
  }

  deleteAgentes(idAgente: number) {
    return this.http.post<any>(this.ruta + '' + idAgente,{
      observe: 'response'
    })
  }
}
