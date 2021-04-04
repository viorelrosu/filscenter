import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'galeria-portfolio-item',
  templateUrl: './portfolio-item.component.html',
  styleUrls: ['./portfolio-item.component.css']
})
export class PortfolioItemComponent implements OnInit {

  @Input() itemImage: string;
  @Input() itemTitle: string;
  @Input() itemTxt: string;

  constructor() { }

  ngOnInit(): void {
  }

}
