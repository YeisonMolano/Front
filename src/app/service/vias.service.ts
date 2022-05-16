import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Via } from '../models/via';

@Injectable({
  providedIn: 'root'
})
export class ViasService {
  ruta: string = 'http://localhost:8080/via/'
  // Inicializacion
  constructor(private http: HttpClient) { }

  // Metodos que se conectan al back
    updateVia(via: Via) {
      return this.http.put<Via>(this.ruta, via, {
        observe: 'response'
      })
    }
    createVia(via: Via) {
      return this.http.post<Via>(this.ruta, via, {
        observe: 'response'
      })
    }
    getVia() {
      return this.http.get<Via[]>(this.ruta + 'vias')
    }

    deleteVia(idVia: number) {
      return this.http.post<any>(this.ruta + '' + idVia,{
        observe: 'response'
      })
    }
  }
