import { Injectable } from '@angular/core';
import {
  HttpClient,
  HttpHeaders,
  HttpErrorResponse,
  HttpParams
} from "@angular/common/http";
import { of } from "rxjs";
import { Empresa } from "../models/empresa";
@Injectable({
  providedIn: 'root'
})

export class EmpresaService {
  resourceUrl: string;


  constructor(private httpCliente: HttpClient) {
    this.resourceUrl = "https://pavii.ddns.net/api/empresas"
     
   }

   get(){
     return this.httpCliente.get(this.resourceUrl)
   }


  getById(Id: Empresa) {
    return this.httpCliente.get(this.resourceUrl + Id);
  }

  post(obj:Empresa) {
    return this.httpCliente.post(this.resourceUrl, obj);
  }

  put(Id: number, obj:Empresa) {
    return this.httpCliente.put(this.resourceUrl + Id, obj);
  }

  delete(Id) {
    return this.httpCliente.delete(this.resourceUrl + Id);
  }

}