import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-pagetitle',
  templateUrl: './pagetitle.component.html',
  styleUrls: ['./pagetitle.component.css']
})
export class PagetitleComponent implements OnInit {

  @Input() pageTitle: string;
  @Input() pageDesc: string;
  @Input() pageImg: string;

  public pageImgUrl: string;

  constructor() { 
  }

  ngOnInit(): void {
    this.pageImgUrl = 'assets/fitness/images/parallax/' + this.pageImg;
  }

}
