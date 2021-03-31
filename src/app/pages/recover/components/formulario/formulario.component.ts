import { formatCurrency } from '@angular/common';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'recover-formulario',
  templateUrl: './formulario.component.html',
  styleUrls: ['./formulario.component.css']
})
export class FormularioComponent implements OnInit {
  public email: string;
  constructor() { }

  ngOnInit(): void {
  }

  onSubmit(form){
    console.log(this.email);
    form.reset();
  }

}
