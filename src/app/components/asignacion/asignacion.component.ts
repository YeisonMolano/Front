import { Component, OnInit } from '@angular/core';
import { Agente } from 'src/app/models/agente';
import { Via } from 'src/app/models/via';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { AgentesService } from 'src/app/service/agentes.service';
import { ViasService } from 'src/app/service/vias.service';
import { Asignacion } from 'src/app/models/asignacion';
import { AsignacionesService } from 'src/app/service/asignaciones.service';
import { ThrowStmt } from '@angular/compiler';

@Component({
  selector: 'app-asignacion',
  templateUrl: './asignacion.component.html',
  styleUrls: ['./asignacion.component.css']
})
export class AsignacionComponent implements OnInit {
  agentes: Agente[]
  vias: Via[]
  asignaciones: Asignacion[]
  formularioVia: FormGroup
  formularioAgente: FormGroup
  dialogo : boolean
  dialogo1 : boolean


  constructor(private agenteService: AgentesService, private viaService: ViasService, private asignacionService: AsignacionesService, private formBuilder: FormBuilder,) {
    this.agentes = []
    this.vias = []
    this.asignaciones = []
    this.formularioVia = this.formBuilder.group({
      via: new FormControl('', [Validators.required]),
    })
    this.formularioAgente = this.formBuilder.group({
      agente: new FormControl('', [Validators.required]),
    })
    this.dialogo = false
    this.dialogo1 = false
  }

  ngOnInit(): void {
    this.formularioAgente.reset()
    this.formularioVia.reset()
    this.getVias()
    this.getAgentes()
    this.getAsignaciones()
  }

  getAsignaciones() {
    this.asignacionService.getAsignacion().subscribe(res => {
      this.asignaciones = res
      console.log(res);

    })
  }

  getVias() {
    this.viaService.getVia().subscribe(res => {
      this.vias = res
    })
  }

  getAgentes(): void {
    this.agenteService.getAgentes().subscribe(res => {
      this.agentes = res
    })
  }

  crearAsignacion() {
    if (this.formularioVia.valid && this.formularioAgente.valid) {
      let asignacion = new Asignacion()
      let nivel: any
      asignacion.agente = this.formularioAgente.get('agente')?.value
      asignacion.via = this.formularioVia.get('via')?.value
      nivel = asignacion.via?.nivel

        if (nivel > 30) {
          this.asignacionService.createAsignacion(asignacion).subscribe(res => {
            this.getAsignaciones()
            this.formularioAgente.reset()
            this.formularioVia.reset()
          })
        }else{
          this.abrir()
        }
    }
  }

  abrir(){
    this.dialogo = true
  }

  cerrar(){
    this.dialogo = false
  }

  abrir1(){
    this.dialogo1 = true
  }

  cerrar1(){
    this.dialogo1 = false
  }

  getPorAgente() {
    if (this.formularioAgente.valid) {
      console.log(this.formularioAgente.get('buscar1')?.value.idAgente + ' soy');

      this.asignacionService.getAsignacionPorAgente(this.formularioAgente.get('agente')?.value.idAgente).subscribe(res => {
        this.asignaciones = res
        this.formularioAgente.reset()
        this.formularioVia.reset()
      })
    }
  }

  getPorVia() {
    if (this.formularioVia.valid) {
      this.asignacionService.getAsignacionPorVias(this.formularioVia.get('via')?.value.identificador).subscribe(res => {
        this.asignaciones = res
        this.formularioAgente.reset()
        this.formularioVia.reset()
      })
    }
  }
}
