import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { Navbar } from '../shared/navbar/navbar';

@Component({
  selector: 'app-pacientes',
  standalone: true,
  imports: [RouterLink, Navbar],
  templateUrl: './pacientes.html',
  styleUrl: './pacientes.css',
})
export class Pacientes {

}
