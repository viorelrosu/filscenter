import { formatCurrency } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { MailService } from '@core/services/mail.service';
import { Router } from '@angular/router';
declare var $:any;
@Component({
  selector: 'recover-formulario',
  templateUrl: './formulario.component.html',
  styleUrls: ['./formulario.component.css']
})
export class FormularioComponent implements OnInit {
  public email: string;
  public enviando: boolean = false;
  constructor(
    private _serviceMail: MailService,
    private _router: Router
  ) { }

  ngOnInit(): void {
  }

  onSubmit(form:any){
    console.log(this.email);
    this.enviando = true;
    this._serviceMail.resetPass(this.email).subscribe(
      response => {
        console.log(response);
        this.email='';
        this.enviando = false;
        form.resetForm();

        $.notify({
          // options
          icon: 'fas fa-check',
          title: '¡Muy bien!',
          message: 'Hemos enviado un correo con tus nuevas credenciales.',
        },{
          // settings
          type: 'success'
        });

        setTimeout(()=>{
          this.redirectPage();
        },3000);
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

  redirectPage(){
    this._router.navigate(['/iniciar-sesion']).then(() => {
      window.location.reload();
    });
  }

}
