import { invalid } from '@angular/compiler/src/render3/view/util';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Via } from 'src/app/models/via';
import { ViasService } from 'src/app/service/vias.service';

@Component({
  selector: 'app-via',
  templateUrl: './via.component.html',
  styleUrls: ['./via.component.css']
})
export class ViaComponent implements OnInit {
  formGroup : FormGroup
  vias : Array<Via>
  dialogo : boolean
  dialogoModify : boolean
  dialogoError : boolean

  constructor(private viaService: ViasService, private formBuilder: FormBuilder,) {
    this.formGroup = this.formBuilder.group({
      identificador: new FormControl('', []),
      tipo: new FormControl('', [Validators.required]),
      tipoVia: new FormControl('', [Validators.required]),
      numero: new FormControl('', [Validators.required]),
      nivel: new FormControl('', [Validators.required])
    })
    this.vias = new Array<Via>()
    this.dialogo = false
    this.dialogoModify = false
    this.dialogoError = false
   }

  ngOnInit(): void {
    this.getVias()
  }

  getVias(){
    this.viaService.getVia().subscribe(res => {
      this.vias = res
    })
  }

  crearVia(){
    if(this.formGroup.valid){
      let via = new Via()
      let nivel : any
      via.identificador = this.formGroup.get('identificador')?.value
      via.nivel = this.formGroup.get('nivel')?.value
      via.numero = this.formGroup.get('numero')?.value
      via.tipo = this.formGroup.get('tipo')?.value
      via.tipoVia = this.formGroup.get('tipoVia')?.value
      nivel = via.nivel = this.formGroup.get('nivel')?.value
      if(nivel >= 0 && nivel <= 100){
        this.viaService.createVia(via).subscribe(res =>{
          this.getVias()
          this.cerrar()
        })
      }else{
        this.cerrar()
        this.abrirError()
    }
    }
  }

  modificarVia(){
    if(this.formGroup.valid){
      let via = new Via()
      via.identificador = this.formGroup.get('identificador')?.value
      via.nivel = this.formGroup.get('nivel')?.value
      via.numero = this.formGroup.get('numero')?.value
      via.tipo = this.formGroup.get('tipo')?.value
      via.tipoVia = this.formGroup.get('tipoVia')?.value
      this.viaService.updateVia(via).subscribe(res =>{
        console.log(res);
        this.vias.forEach((element,pos) => {
          if(element.identificador == res.body?.identificador){
            this.vias[pos] = res.body? res.body: new Via()
          }
        });
        this.cerrarModificar()
      })
    }
  }

  borrarVia(idVia: number){
    this.viaService.deleteVia(idVia).subscribe(res =>{
      console.log(res);
      this.vias.forEach((element,pos) => {
        if(element.identificador == idVia){
          this.vias.splice(pos, 1)
        }
      });
    })
  }

  abrir(){
    this.formGroup.reset()
    this.dialogo = true
  }

  cerrar(){
    this.dialogo = false
  }

  abrirModificar(via: Via){
    this.formGroup.reset()

    this.formGroup.get('identificador')?.setValue(via.identificador)
    this.formGroup.get('tipo')?.setValue(via.tipo)
    this.formGroup.get('tipoVia')?.setValue(via.tipoVia)
    this.formGroup.get('numero')?.setValue(via.numero)
    this.formGroup.get('nivel')?.setValue(via.nivel)
    this.dialogoModify = true
  }

  cerrarModificar(){
    this.dialogoModify = false
  }

  abrirError(){
    this.dialogoError = true
  }

  cerrarError(){
    this.dialogoError = false
  }
}
