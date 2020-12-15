import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { EnvioComponent } from './componente/envio/envio.component';


const routes: Routes = [
    { path: 'envio-component', component: EnvioComponent,},
    { path: '', redirectTo: 'envio-component', pathMatch: 'full' },
    { path: '**', component: EnvioComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
