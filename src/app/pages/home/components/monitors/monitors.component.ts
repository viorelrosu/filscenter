import { Component, OnInit } from '@angular/core';
import { TeamMemberComponent } from '@shared/components/team-member/team-member.component';
import { FraseMotivadoraService } from '@core/services';
import { FraseMotivadora } from '@shared/models/frase.motivadora';

@Component({
  selector: 'home-monitors',
  templateUrl: './monitors.component.html',
  styleUrls: ['./monitors.component.css'],
  providers: [FraseMotivadoraService]
})
export class HomeMonitorsComponent implements OnInit {
  public frases: Array<FraseMotivadora>;

  constructor(
    public _fraseMotivadoraService: FraseMotivadoraService
  ) { 
    this.frases = _fraseMotivadoraService.getFrases(4);
  }

  ngOnInit(): void {
    //console.log(this.frases);
  }

}
