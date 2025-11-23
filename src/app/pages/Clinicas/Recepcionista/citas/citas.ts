import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { Navbar } from '../shared/navbar/navbar';

@Component({
  selector: 'app-citas',
  standalone: true,
  imports: [RouterLink, Navbar],
  templateUrl: './citas.html',
  styleUrl: './citas.css',
})
export class Citas {

}
