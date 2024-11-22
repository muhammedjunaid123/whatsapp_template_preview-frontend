import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Template } from '../../types/interface';

@Injectable({
  providedIn: 'root'
})
export class TemplateService {

  constructor(private _http: HttpClient) { }

  template_create(data: any) {
    return this._http.post('/template/create', data)
  }
  getAll() {
    return this._http.get('/template/getAll')
  }
  template_get(id: string) {
    return this._http.get(`/template/get?id=${id}`)
  }
  template_update(data:Template) {
    return this._http.put(`/template/update`,data)
  }
}
