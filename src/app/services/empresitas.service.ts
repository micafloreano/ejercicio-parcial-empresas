import { Injectable } from '@angular/core';
import {
  HttpClient,
  HttpHeaders,
  HttpErrorResponse,
  HttpParams
} from "@angular/common/http";
import { of } from "rxjs";
import { Empresa } from "../models/empresitas";
@Injectable({
  providedIn: 'root'
})

export class EmpresaService {
  resourceUrl: string;


  constructor(private hhtpCliente: HttpClient) {
    this.resourceUrl = "https://pavii.ddns.net/api/empresas"
     
   }

   get(){
     return this.hhtpCliente.get(this.resourceUrl)
   }


  put(Id: number, obj:Empresa) {
    return this.hhtpCliente.put(this.resourceUrl +'/'+ Id, obj);
  }

   }

