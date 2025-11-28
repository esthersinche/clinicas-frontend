import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { NavbarPublicComponent } from '../../shared/navbar-public/navbar-public';

@Component({
  selector: 'app-nosotros',
  standalone: true,
  imports: [RouterLink, NavbarPublicComponent],
  templateUrl: './nosotros.html',
  styleUrls: ['./nosotros.css']
})
export class NosotrosComponent { }

