import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { EnvioService } from './servicios/envio.service';

@Component({
  selector: 'app-envio',
  templateUrl: './envio.component.html',
  styleUrls: ['./envio.component.css']
})
export class EnvioComponent implements OnInit {

  itemForm: FormGroup;
  envios: any[] = [];
  idEnvio: any;
  text: string = 'Mostrar Formulario';
  show: any = false;
    displayedColumns: string[] = ['nombreRemitente', 'direccion', 'descripcionPaquete', 'fechaEntrega', 'editar', 'borrar'];

  constructor(private fb: FormBuilder, private envioService: EnvioService) { }

  ngOnInit(): void {
    this.iniciarFormulario();

    this.getEnvio();
  }

  iniciarFormulario() {
    this.itemForm = this.fb.group({
      nombreRemitente: [''],
      direccion: [''],
      descripcionPaquete: [''],
      fechaEntrega: ['']
    });
  }

  getEnvio() {
    this.envioService.getEnvios().subscribe((envios: any) => {
      this.envios = envios;
    });
  }

  editarEnvio(envio: any) {
    this.idEnvio = envio._id;
    this.itemForm.patchValue({
      nombreRemitente: envio.nombreRemitente,
      direccion: envio.direccion,
      descripcionPaquete: envio.descripcionPaquete,
      fechaEntrega: envio.fechaEntrega,
    });
  }

  borrarEnvio(envio: any) {
    this.idEnvio = envio._id;
    this.envioService.borrarEnvio(this.idEnvio).subscribe(result => console.log('Se borro a: ', envio));
    this.getEnvio();
  }

  submit() {
    if (this.idEnvio) {
      this.envioService.editarEnvio(this.idEnvio, this.itemForm.value).subscribe((envio) => {
        console.log('Envio Editado: ', envio);
      });
    } else {
      this.envioService.guardarEnvio(this.itemForm.value).subscribe((envio) => {
        console.log('Envio Nuevo: ', envio);
      });
    }
    this.getEnvio();
  }

  showForm() {
    this.show = !this.show;
    console.log(this.envios);
    if (this.show) {
      this.text = 'Ocultar Formulario';
    }
    else {
      this.text = 'Mostrar Formulario';
    }
  }
}
