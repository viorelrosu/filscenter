import { Component, OnInit, Input } from '@angular/core';
import { FraseMotivadoraService } from '@core/services';
@Component({
  selector: 'shared-call-to-action',
  templateUrl: './call-to-action.component.html',
  styleUrls: ['./call-to-action.component.css'],
  providers: [FraseMotivadoraService]
})
export class CallToActionComponent implements OnInit {
  public callClass: string;
  public callImgUrl: string;
  public callBtnClass: string;

  @Input() paddingTop: string;
  @Input() paddingBottom: string;
  @Input() title: string;
  @Input() classTitle: string;
  @Input() descr: string;
  @Input() img: string;
  @Input() overlayStyle: number;
  @Input() btnTxt: string;
  @Input() btnUrl: string;
  @Input() btnClass: string;

  constructor(
    public _fraseMotivadoraService: FraseMotivadoraService
  ) {
    this.title = 'Te esperamos';
    this.classTitle = 'text-light text-medium';
    this.callClass = 'call-to-action background-image m-b-0 ';
    this.callBtnClass = 'btn btn-light btn-lg btn-rounded';
    this.callImgUrl = 'assets/fitness/images/parallax/haltere.jpg';
    this.overlayStyle = 2; 
    this.btnTxt = 'Inscríbete';   
    this.btnUrl = '/registro';
    this.descr = this._fraseMotivadoraService.getOneFrase().frase;
  }

  ngOnInit(): void {
    if(this.paddingTop) {
      this.callClass += this.paddingTop + ' ';
    } else {
      this.callClass += 'p-t-100 ';
    }
    
    if(this.paddingBottom) {
      this.callClass += this.paddingBottom + ' ';
    } else {
      this.callClass += 'p-b-100';
    }
    
    if(this.img) {
      this.callImgUrl = 'assets/fitness/images/parallax/' + this.img;
    }

    if(this.btnClass) {
      this.callBtnClass = 'btn ' + this.btnClass;
    }
  }

}
