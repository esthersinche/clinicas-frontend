import { Routes } from '@angular/router';
import { NosotrosComponent } from './pages/nosotros/nosotros';
import { LoginComponent } from './pages/login/login';

import { menuAdminComponent } from './pages/Clinicas/Admin/menu/menu';
import { GestionDocComponent } from './pages/Clinicas/Admin/doctores/doctores';
import { GestionRecepComponent } from './pages/Clinicas/Admin/recepcionistas/recepcionistas';
import { adminInfo } from './pages/Clinicas/Admin/info/info';

import { DashboardDoc } from './pages/Clinicas/Doctores/dashboard-doc/dashboard-doc';

import { DashboardRecep } from './pages/Clinicas/Recepcionista/dashboard/dashboard';
import { Pacientes } from './pages/Clinicas/Recepcionista/pacientes/pacientes';
import { Citas } from './pages/Clinicas/Recepcionista/citas/citas';

import { AdquirirServicioComponent } from './pages/adquirir-servicio/adquirir-servicio';
import { ResenasComponent } from './pages/resenas/resenas';

export const routes: Routes = [
  { path: '', redirectTo: '/nosotros', pathMatch: 'full' },
  { path: 'nosotros', component: NosotrosComponent },
  { path: 'login', component: LoginComponent },
  { path: 'adquirir-servicio', component: AdquirirServicioComponent },
  { path: 'resenas', component: ResenasComponent },

  { path: 'admin/menu', component: menuAdminComponent },
  { path: 'admin/gestiondoctores', component: GestionDocComponent },
  { path: 'admin/gestionrecepcionistas', component: GestionRecepComponent },
  { path: 'admin/InfoClinica', component: adminInfo },

  { path: 'doctor/DashboardDoc', component: DashboardDoc },

  { path: 'recep/DashboardRep', component: DashboardRecep },
  { path: 'recep/paciente', component: Pacientes },
  { path: 'recep/citas', component: Citas },
];
