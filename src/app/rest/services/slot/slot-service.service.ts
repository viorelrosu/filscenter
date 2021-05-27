import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Slot } from '@modelsRest/Slot';
import { Observable } from 'rxjs';
import { appSettings } from '@core/helpers/appSettings';

@Injectable({
  providedIn: 'root'
})
export class SlotServiceService {

  constructor(private _http: HttpClient) {}

  url = appSettings.apiUrl + 'slot';

  getSlots(): Observable<any> {
    return this._http.get(this.url);
  }

  getSlotsBySala(id:number): Observable<any> {
    return this._http.get(this.url + '/sala/' + id);
  }

  getSlot(slot:number):Observable<any>{
    return this._http.get<Slot>(this.url+"/"+slot);
  }

  deleteSlot(slot:Slot){
    return this._http.delete<Slot>(this.url+"/"+slot.id);
  }

  createSlot(slot:Slot):Observable<any>{
    return this._http.post<Slot>(this.url,slot);
  }

  updateSlot(slot: Slot): Observable<any> {
    return this._http.put<Slot>(this.url + "/" + slot.id, slot);
  }

}
