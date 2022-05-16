import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Agente } from 'src/app/models/agente';
import { AgentesService } from 'src/app/service/agentes.service';

@Component({
  selector: 'app-agnte',
  templateUrl: './agnte.component.html',
  styleUrls: ['./agnte.component.css']
})
export class AgnteComponent implements OnInit {
  formGroup: FormGroup
  agentes: Array<Agente>
  dialog: boolean
  dialogModify: boolean
  constructor(private agenteService: AgentesService, private formBuilder: FormBuilder,) {
    this.agentes = new Array<Agente>()
    this.formGroup = this.formBuilder.group({
      idAgente: new FormControl('', []),
      nombreAgente: new FormControl('', [Validators.required]),
      codigo: new FormControl('', [Validators.required]),
      codigoSecretaria: new FormControl('', [Validators.required]),
      fechaInicio: new FormControl('', [Validators.required])
    })
    this.dialog = false
    this.dialogModify = false
  }

  ngOnInit(): void {
    this.getAgentes()
  }

  getAgentes(): void {
    this.agenteService.getAgentes().subscribe(res => {
      this.agentes = res
    })
  }
  open(): void {
    this.formGroup.reset()
    this.dialog = true
  }
  openModify(agente : Agente): void {
    this.formGroup.reset()
    this.formGroup.get('idAgente')?.setValue(agente.idAgente)
    this.formGroup.get('nombreAgente')?.setValue(agente.nombreAgente)
    this.formGroup.get('codigo')?.setValue(agente.codigo)
    this.formGroup.get('codigoSecretaria')?.setValue(agente.codigoSecretaria)
    let date = new Date()
    date.setTime(agente?.fechaInicio? agente.fechaInicio:0)
    this.formGroup.get('fechaInicio')?.setValue(date)
    this.dialogModify = true
  }
  cerrar(): void {
    this.dialog = false
  }
  cerrarModificar(): void {
    this.dialogModify = false
  }
  guardar(): void {
    if (this.formGroup.valid) {
      let agente = new Agente()
      agente.codigo = this.formGroup.get('codigo')?.value
      agente.nombreAgente = this.formGroup.get('nombreAgente')?.value
      agente.codigoSecretaria = this.formGroup.get('codigoSecretaria')?.value
      agente.fechaInicio = this.formGroup.get('fechaInicio')?.value.getTime()
      this.agenteService.createAgente(agente).subscribe(res => {
        this.getAgentes()
        this.cerrar()
      }, err => {
        console.log('Error servicio agente');
        console.log(err);
        this.cerrar()

      })
    }
  }

  actualizar(){
    if(this.formGroup.valid){
      let agente = new Agente()
      agente.idAgente = this.formGroup.get('idAgente')?.value
      agente.codigo = this.formGroup.get('codigo')?.value
      agente.nombreAgente = this.formGroup.get('nombreAgente')?.value
      agente.codigoSecretaria = this.formGroup.get('codigoSecretaria')?.value
      agente.fechaInicio = this.formGroup.get('fechaInicio')?.value.getTime()
      this.agenteService.updateAgente(agente).subscribe(res =>{
        console.log(res);
        this.agentes.forEach((element,pos) => {
          if(element.idAgente == res.body?.idAgente){
            this.agentes[pos] = res.body? res.body: new Agente()
          }
        });
        this.cerrarModificar()
      })
    }
  }

  eliminar(id: number){
    this.agenteService.deleteAgentes(id).subscribe(res =>{
      console.log(res);
      this.agentes.forEach((element,pos) => {
        if(element.idAgente == id){
          this.agentes.splice(pos, 1)
        }
      });
    })
  }

  getDate(fecha: number) {
    let date = new Date()
    let date2 = new Date()
    date2.setTime(fecha)
    return date.getFullYear() - date2.getFullYear();

  }
}
