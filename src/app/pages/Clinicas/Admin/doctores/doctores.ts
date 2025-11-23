import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { Navbar } from '../shared/navbar/navbar';

@Component({
  selector: 'app-doctores',
  standalone: true,
  imports: [RouterLink, Navbar],
  templateUrl: './doctores.html',
  styleUrl: './doctores.css',
})
export class GestionDocComponent {

}
