import { Component, OnInit, Input } from '@angular/core';

import { UsuarioServiceService as UsuarioService } from "@servicesRest/usuario/usuario-service.service";
import { UploadFileService } from '@core/services/upload-file.service';
import { TokenStorageService } from '@core/services/token-storage.service';
import { HttpEventType, HttpResponse } from '@angular/common/http';
import { Observable, Subscription } from 'rxjs';
import { HelperService } from '@core/services/helper.service';
declare var $:any;
@Component({
  selector: 'cuenta-upload-image',
  templateUrl: './upload-image.component.html',
  styleUrls: ['./upload-image.component.css']
})
export class CuentaUploadImageComponent implements OnInit {

  public fileName: any;
  uploadProgress:number;
  uploadSub: Subscription;

  private selectedFiles?: FileList;
  private currentFile?: File;
  public progress = 0;
  public message = '';
  public messageClass='danger';
  public isImageUploaded: boolean = false;
  public image:string;
  public imagenAnterior: string;

  fileInfos?: Observable<any>;

  @Input() user: any;

  constructor(
    private _serviceUploadFile: UploadFileService,
    private _serviceUsuario: UsuarioService,
    private _tokenStorageService: TokenStorageService,
    private _helperService: HelperService

  ) { }

  ngOnInit(): void {
    //console.log(this.user);
    this.image = (this.user.imagen) ? this.user.imagen : 'user-perfil.jpg';
    //this.fileInfos = this._serviceUploadFile.getFiles();
  }

  cancelUpload() {
    this.uploadSub.unsubscribe();
    this.reset();
  }

  reset() {
    this.progress = 0;
    this.uploadSub = null;
  }

  async onFileSelected(event) {
    this.progress = 0;

      const file:File = event.target.files[0];
  
      if (file) {
        this.currentFile = file;
        this.fileName = file.name;
        console.log(file);

        var reader = new FileReader();
        reader.onload = function (e) {
          //console.log(e.target.result);
          $('#imgAvatar').attr('src', e.target.result);
        }
        reader.readAsDataURL(file);
        
        this.imagenAnterior = this.user.imagen;
        this.isImageUploaded = await this.showAndSaveAvatar();
        if(this.fileName != this.imagenAnterior) {
          await this.deleteOldFile();
        }

      }
  }

  async deleteOldFile(){
    await new Promise((resolve, reject) => {
      this._serviceUploadFile.deleteFile(this.imagenAnterior).toPromise()
      .then((data)=>{
        console.log(data);
        resolve;
      })
      .catch((err)=>{
        console.log(err);
        console.log(err.error.message);
        reject;
      });
    });
  }

  async showAndSaveAvatar() {

    await new Promise((resolve, reject) => {
      
      this.uploadSub = this._serviceUploadFile.upload(this.currentFile).subscribe(
        (event: any) => {
          if (event.type === HttpEventType.UploadProgress) {
            this.progress = Math.round(100 * event.loaded / event.total);
          } else if (event instanceof HttpResponse) {
            this.message = event.body.message;
            this.messageClass = 'success';
          }
        },
        (err: any) => {
          console.log(err);
          console.log(err.error.message);
          this.progress = 0;
  
          if (err.error && err.error.message) {
            this.message = err.error.message;
          } else {
            this.message = 'No se ha podido subir la imagen!';
          }
  
          this.currentFile = undefined;
      });

      resolve(true);
    })
    .then(()=>{
      return this.updateImageUser();   
    })
    .then((data)=>{
      console.log(data);
      return this._tokenStorageService.saveUser(this.user);
    })
    .then((user)=>{
      //console.log(user);
      this.isImageUploaded = true;
    });

    return true;
  }

  updateImageUser(){
    return this._serviceUsuario.getUsuario(this.user.id).toPromise()
      .then((user) => {
        console.log(this.fileName);
        user.imagen = this.fileName;
        return user;
      })
      .then((user)=>{
        this.user = user;
        console.log(user);
        return this._serviceUsuario.updateUsuario(user).toPromise();
      });
  }

}
