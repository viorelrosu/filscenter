import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'clases-all-clases',
  templateUrl: './all-clases.component.html',
  styleUrls: ['./all-clases.component.css']
})
export class AllClasesComponent implements OnInit {

  constructor(
    private _router: Router
  ) { }

  ngOnInit(): void {
  }

  redirectHorario() {
    this._router.navigate(['/horario']);
  }

}
