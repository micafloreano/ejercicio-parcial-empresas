import { Component, OnInit } from '@angular/core';
import {Empresa} from '../../models/empresitas';
import {EmpresaService} from '../../services/empresitas.service'
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
@Component({
  selector: 'app-empresas',
  templateUrl: './empresitas.component.html',
  styleUrls: ['./empresitas.component.css']
})
export class EmpresasComponent implements OnInit {

  Titulo = "Empresas";
  Items: Empresa [] = [];
  FormReg: FormGroup;
  EstadoForm: string;
  EmpresaAlta:  Empresa;

  constructor(private empresasService: EmpresaService, private formBuilder: FormBuilder) { 
  }

  ngOnInit() {
    this.EstadoForm = 'L';
    this.getEmpresa();
    this.FormReg = this.formBuilder.group({
         CantidadEmpleados: ['',[Validators.required]],
         FechaFundacion: ['',[Validators.required]],
         IdEmpresa: ['',[Validators.required]],
         RazonSocial: ['',[Validators.required]]
    }
     
    );
  }

  getEmpresa(){
     this.empresasService.get()
    .subscribe((res:Empresa[])=>{
      this.Items = res;

  });
  }

  Modificar(item){
    this.EstadoForm = 'M';
    console.log(item);
    this.FormReg.setValue(item);
  }

  Agregar(){
    this.FormReg.reset();
    this.EstadoForm = 'A';
  }

  Listar(){
    this.EstadoForm = 'L';
    this.getEmpresa();
  }

  Almacenar(){
     if(this.FormReg.invalid){
       console.log(this.FormReg)
       window.alert("Verifique los datos");
       return;
       }
    
    this.EmpresaAlta = new Empresa;
    this.EmpresaAlta.CantidadEmpleados = this.FormReg.value.CantidadEmpleados;
    this.EmpresaAlta.IdEmpresa = this.FormReg.value.IdEmpresa;
    this.EmpresaAlta.RazonSocial = this.FormReg.value.RazonSocial;
    this.EmpresaAlta.FechaFundacion = this.FormReg.value.FechaFundacion;
    this.empresasService.put(this.EmpresaAlta.IdEmpresa,this.EmpresaAlta).subscribe((res:any)=>{
      window.alert("Empresa grabada");
      this.Listar();
    } );
   
   
   
   
    
  }

  Volver(){
    this.EstadoForm = 'L'
  }

}