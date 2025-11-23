import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { Navbar } from '../shared/navbar/navbar';

@Component({
  selector: 'app-menu',
  standalone: true,
  imports: [RouterLink, Navbar],
  templateUrl: './menu.html',
  styleUrl: './menu.css',
})
export class menuAdminComponent {

}
