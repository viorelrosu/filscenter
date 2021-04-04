import { Component, OnInit } from '@angular/core';
import { FraseMotivadoraService } from '@core/services';
import { FraseMotivadora } from '@shared/models/frase.motivadora';

@Component({
  selector: 'aboutus-monitores',
  templateUrl: './monitores.component.html',
  styleUrls: ['./monitores.component.css'],
  providers: [FraseMotivadoraService]
})
export class MonitoresComponent implements OnInit {

  public frases: Array<FraseMotivadora>;

  constructor(
    public _fraseMotivadoraService: FraseMotivadoraService
  ) { 
    this.frases = _fraseMotivadoraService.getFrases(4);
  }

  ngOnInit(): void {
  }

}
