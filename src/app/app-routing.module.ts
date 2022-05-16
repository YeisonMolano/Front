import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AgnteComponent } from './components/agnte/agnte.component';
import { AsignacionComponent } from './components/asignacion/asignacion.component';
import { PrincipalComponent } from './components/principal/principal.component';
import { ViaComponent } from './components/via/via.component';

const routes: Routes = [
  {
    path: '',
    component: PrincipalComponent,
  },
  {
    path: 'asignaciones',
    component: AsignacionComponent,
  },
  {
    path: 'vias',
    component: ViaComponent,
  },
  {
    path: 'agentes',
    component: AgnteComponent,
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})

export class AppRoutingModule { }
