import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { Navbar } from '../shared/navbar/navbar';

@Component({
  selector: 'app-info',
  standalone: true,
  imports: [RouterLink, Navbar],
  templateUrl: './info.html',
  styleUrl: './info.css',
})
export class adminInfo {

}
