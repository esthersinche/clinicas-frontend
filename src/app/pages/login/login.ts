import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './login.html',
  styleUrls: ['./login.css']
})
export class LoginComponent {
  username: string = '';
  password: string = '';

  constructor(private router: Router) { }

  onLogin() {
    const users: any = {
      recep: { pass: 'recep123', route: '/recep/DashboardRep' },
      admin: { pass: 'admin123', route: '/admin/menu' },
      doctor: { pass: 'doctor123', route: '/doctor/DashboardDoc' }
    };

    const user = users[this.username];

    if (user && user.pass === this.password) {
      alert('Ingreso exitoso');
      this.router.navigate([user.route]);
    } else {
      alert('Usuario o contraseña incorrectos');
    }
  }
}
