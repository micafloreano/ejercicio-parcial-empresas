import { Component, OnInit } from "@angular/core";
import { Empresa } from "../../models/empresa";
import { EmpresaService } from "../../services/empresa.service";
import { FormGroup, FormBuilder, Validators } from "@angular/forms";
@Component({
  selector: "app-empresas",
  templateUrl: "./empresas.component.html",
  styleUrls: ["./empresas.component.css"]
})
export class EmpresasComponent implements OnInit {
  submitted = false;
  Titulo = "Empresas";
  Items: Empresa[] = [];
  RegistrosTotal: number;
  FormReg: FormGroup;
    FormFiltro: FormGroup;
  EstadoForm: string;
  EmpresaAlta: Empresa;
  SinBusquedasRealizadas = true;

  constructor(
    private empresasService: EmpresaService,
    private formBuilder: FormBuilder
  ) {}

  ngOnInit() {
    this.EstadoForm = "L";
    this.getEmpresa();
    this.FormReg = this.formBuilder.group({
      CantidadEmpleados: ["", [Validators.required]],
      FechaFundacion: ["", [Validators.required]],
      IdEmpresa: ["", [Validators.required]],
      RazonSocial: ["", [Validators.required]]
    });
  }

  getEmpresa() {
    this.empresasService.get().subscribe((res: Empresa[]) => {
      this.Items = res;
    });
  }

  Modificar(dto) {
    this.EstadoForm = "M";
  }

  Agregar() {
    this.FormReg.reset();
    this.EstadoForm = "A";
  }

  Listar() {
    this.EstadoForm = "L";
    this.getEmpresa();
  }

  Almacenar() {
    if (this.FormReg.invalid) {
      console.log(this.FormReg);
      window.alert("Verifique los datos");
      return;
    }

    this.EmpresaAlta = new Empresa();
    this.EmpresaAlta.CantidadEmpleados = this.FormReg.value.CantidadEmpleados;
    this.EmpresaAlta.IdEmpresa = this.FormReg.value.IdEmpresa;
    this.EmpresaAlta.RazonSocial = this.FormReg.value.RazonSocial;
    this.EmpresaAlta.FechaFundacion = this.FormReg.value.FechaFundacion;
    this.empresasService.post(this.EmpresaAlta).subscribe((res: any) => {
      window.alert("Empresa grabada");
      this.Listar();
    });
  }

  Grabar() {
    this.submitted = true;
    // verificar que los validadores esten OK
    if (this.FormReg.invalid) {
      return;
    }

    //hacemos una copia de los datos del formulario, para modificar la fecha y luego enviarlo al servidor
    const itemCopy = { ...this.FormReg.value };

    //convertir fecha de string dd/MM/yyyy a ISO para que la entienda webapi
    var arrFecha = itemCopy.FechaAlta.substr(0, 10).split("/");
    if (arrFecha.length == 3)
      itemCopy.FechaAlta = new Date(
        arrFecha[2],
        arrFecha[1] - 1,
        arrFecha[0]
      ).toISOString();

    // agregar post
    if (itemCopy.IdEmpresa == 0 || itemCopy.IdEmpresa == null) {
      this.empresaService.post(itemCopy).subscribe((res: any) => {
        this.Volver();
        window.alert("Registro agregado correctamente.");
        this.Buscar();
      });
    } else {
      // modificar put
      this.empresaService
        .put(itemCopy.IdEmpresa, itemCopy)
        .subscribe((res: any) => {
          this.Volver();
          window.alert("Registro modificado correctamente.");
          this.Buscar();
        });
    }
  }
  Buscar() {
    this.SinBusquedasRealizadas = false;
    this.empresaService
      .get(this.FormFiltro.value.Nombre, this.FormFiltro.value.Activo)
      .subscribe((res: any) => {
        this.Lista = res.Lista;
        this.RegistrosTotal = res.RegistrosTotal;
      });
  }
  // Obtengo un registro especifico según el Id
  BuscarPorId(Dto, AccionABMC) {
    window.scroll(0, 0); // ir al incio del scroll

    this.empresaService.getById(Dto.IdArticulo).subscribe((res: any) => {
      this.FormReg.patchValue(res);

      //formatear fecha de  ISO 8061 a string dd/MM/yyyy
      var arrFecha = res.FechaAlta.substr(0, 10).split("-");
      this.FormReg.controls.FechaAlta.patchValue(
        arrFecha[2] + "/" + arrFecha[1] + "/" + arrFecha[0]
      );

      this.AccionABMC = AccionABMC;
    });
  }

  Volver() {
    this.EstadoForm = "L";
  }
}
