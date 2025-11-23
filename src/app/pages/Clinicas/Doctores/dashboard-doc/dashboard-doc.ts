import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { Navbar } from '../shared/navbar/navbar';

@Component({
  selector: 'app-dashboard-doc',
  standalone: true,
    imports: [RouterLink, Navbar],
  templateUrl: './dashboard-doc.html',
  styleUrl: './dashboard-doc.css',
})
export class DashboardDoc {

}
