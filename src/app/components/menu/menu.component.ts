import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.css']
})
export class MenuComponent implements OnInit {

  constructor(private router:Router) { }

  ngOnInit(): void {
  }

  irVias():void{
    this.router.navigate(['/vias'])
  }

  irAasignacion():void{
    this.router.navigate(['/asignaciones'])
  }

  irAgente():void{
    this.router.navigate(['/agentes'])
  }

}
