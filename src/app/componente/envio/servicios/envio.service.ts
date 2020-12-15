import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable()
export class EnvioService {
  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
    }),
  };
  private envioUrl = 'http://localhost:3002/api/modules/envio/';

  constructor(private httpClient: HttpClient) {}

  getEnvios() {
    return this.httpClient.get(this.envioUrl + 'envio');
  }

  guardarEnvio(envio: any) {
    return this.httpClient.post(
      this.envioUrl + 'envio',
      JSON.stringify(envio),
      this.httpOptions
    );
  }

  editarEnvio(idEnvio, envio) {
    return this.httpClient.put(
      this.envioUrl + 'envio/' + idEnvio,
      JSON.stringify(envio),
      this.httpOptions
    );
  }

  borrarEnvio( idEnvio ){
    return this.httpClient.delete(this.envioUrl + 'envio/' + idEnvio, this.httpOptions);
  }
}