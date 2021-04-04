import { Component, OnInit } from '@angular/core';
import { FraseMotivadoraService } from '@core/services'
@Component({
  selector: 'home-slider',
  templateUrl: './slider.component.html',
  styleUrls: ['./slider.component.css'],
  providers: [FraseMotivadoraService]
})
export class HomeSliderComponent implements OnInit {
  public frase: string;

  constructor(
    public _fraseMotivadoraService: FraseMotivadoraService
  ) { 
    this.frase = _fraseMotivadoraService.getOneFrase().frase;
  }

  ngOnInit(): void {
  }

}
