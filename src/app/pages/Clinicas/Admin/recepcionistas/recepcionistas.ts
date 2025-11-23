import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { Navbar } from '../shared/navbar/navbar';

@Component({
  selector: 'app-recepcionistas',
  standalone: true,
  imports: [RouterLink, Navbar],
  templateUrl: './recepcionistas.html',
  styleUrl: './recepcionistas.css',
})
export class GestionRecepComponent {

}
