import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-mapa-google',
  templateUrl: './mapa.component.html',
  styleUrls: ['./mapa.component.css']
})
export class MapaComponent implements OnInit {
  public height: number;

  @Input() mapHeight: number;

  constructor() { 
    this.height = 450;
    if(this.mapHeight) {
      this.height = this.mapHeight;
    }

  }

  ngOnInit(): void {
  }

}
