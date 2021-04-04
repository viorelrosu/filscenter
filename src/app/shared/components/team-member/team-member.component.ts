import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'team-member',
  templateUrl: './team-member.component.html',
  styleUrls: ['./team-member.component.css']
})
export class TeamMemberComponent implements OnInit {

  @Input() memberNombre: string;
  @Input() memberTitulo: string;
  @Input() memberBio: string;
  @Input() memberImg: string;
  @Input() facebook: string;
  @Input() twitter: string;
  @Input() instagram: string;
  @Input() email: string;

  public memberImgUrl: string;

  constructor() { }

  ngOnInit(): void {
    this.memberImgUrl = 'assets/fitness/images/trainers/1.png';
    if(this.memberImg) {
      this.memberImgUrl = 'assets/fitness/images/trainers/' + this.memberImg;
    }
  }

}
