import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { Navbar } from '../shared/navbar/navbar';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [RouterLink, Navbar],
  templateUrl: './dashboard.html',
  styleUrl: './dashboard.css',
})
export class DashboardRecep {

}
