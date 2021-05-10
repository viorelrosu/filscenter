import { Component, OnInit } from '@angular/core';
import { ContactoUsuario } from '@shared/models/contacto.usuario';
import { MapaComponent } from '@shared/components/mapa/mapa.component';
import { MailService } from '@core/services/mail.service';
declare var $:any;
@Component({
  selector: 'contacto-contenido',
  templateUrl: './contenido.component.html',
  styleUrls: ['./contenido.component.css']
})
export class ContenidoComponent implements OnInit {
  public mensajeUsuario: ContactoUsuario;
  public mapHeight: number;
  public enviando: boolean = false;
  constructor(
    private _serviceMail: MailService
  ) { 
    this.mensajeUsuario = new ContactoUsuario('','','','','');
    this.mapHeight = 300;
  }

  ngOnInit(): void {
  }

  onSubmit(form:any) {
    //console.log(this.mensajeUsuario);
    this.enviando = true;
    this._serviceMail.contactoSend(this.mensajeUsuario).subscribe(
      result => {
        this.mensajeUsuario.from='';
        this.mensajeUsuario.text='';
        this.mensajeUsuario.subject='';
        this.mensajeUsuario.nombre='';
        this.enviando = false;
        form.resetForm();
        $.notify({
          // options
          icon: 'fas fa-check',
          title: '¡Muy bien!',
          message: 'Tu mensaje ha sido enviado.',
        },{
          // settings
          type: 'success'
        });
      },
      err => {
        //console.log(err);
        $.notify({
          // options
          icon: 'fas fa-close',
          title: 'Lo sentimos, ha habido un error!',
          message: err.error.message,
        },{
          // settings
          type: 'danger'
        });
      }
    );

  }

}
