import { Component } from '@angular/core';
import { Router, RouterLink } from '@angular/router';

@Component({
  selector: 'app-header',
  imports: [RouterLink],
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent {
  activeRoute: string = '';

  constructor(private router: Router) {
    this.activeRoute = this.router.url; // Initialise le chemin actuel
  }

  navigate(route: string): void {
    this.router.navigate([route]);
    this.activeRoute = route; // Met à jour l’onglet actif
  }
}
