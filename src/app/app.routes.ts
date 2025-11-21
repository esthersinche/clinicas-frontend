import { Routes } from '@angular/router';
import { NosotrosComponent } from './pages/nosotros/nosotros';
import { LoginComponent } from './pages/login/login';

export const routes: Routes = [
  { path: '', redirectTo: '/nosotros', pathMatch: 'full' },
  { path: 'nosotros', component: NosotrosComponent },
  { path: 'login', component: LoginComponent }
];
