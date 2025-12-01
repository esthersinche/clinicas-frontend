import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-navbar-public',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './navbar-public.html',
  styleUrls: ['./navbar-public.css']
})
export class NavbarPublicComponent {
  menuAbierto: boolean = false;

  toggleMenu(): void {
    this.menuAbierto = !this.menuAbierto;
  }

  cerrarMenu(): void {
    this.menuAbierto = false;
  }
}
