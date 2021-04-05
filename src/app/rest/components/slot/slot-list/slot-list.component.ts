import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Slot } from '@modelsRest/Slot';
import { SlotServiceService } from '@servicesRest/slot/slot-service.service';


@Component({
  selector: 'app-slot-list',
  templateUrl: './slot-list.component.html',
  styleUrls: ['./slot-list.component.css']
})
export class SlotListComponent implements OnInit {
  mostrarSlotAdd: boolean = false;
  slots : Slot[];

  constructor(private service:SlotServiceService, private router:Router) { }

  ngOnInit(): void {
    document.getElementById("minus").hidden = true;
    this.service.getSlots().subscribe((data) => {
      this.slots = data;
    });
  }

  delete(slot:Slot){
    this.service.deleteSlot(slot).subscribe((data) => {
      this.slots = this.slots.filter((p) => p!= slot);
      alert("Slot Eliminado");
    })
  }


  habilitarSlot(){
    this.mostrarSlotAdd = true;
    document.getElementById("plus").hidden = true;
    document.getElementById("minus").hidden = false;
  }

  deshabilitarSlot(){
    this.mostrarSlotAdd = false;
    document.getElementById("plus").hidden = false;
    document.getElementById("minus").hidden = true;
  }
}
