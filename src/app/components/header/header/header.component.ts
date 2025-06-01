import { Component } from '@angular/core';
// import { IConnectionListener } from '../../technical/iconnection-listener';
// import { UsersService } from '../../services/users.service';
// import { ConnectionCentralizer } from '../../technical/connection-centralizer';
import { Router, RouterLink, RouterLinkActive } from '@angular/router';
import { CommonModule } from '@angular/common';

// @Component({
//   selector: 'app-header',
//   imports: [CommonModule, RouterLink, RouterLinkActive],
//   templateUrl: './header.component.html',
//   styleUrl: './header.component.scss',
//   standalone: true,
// })
// export class HeaderComponent implements IConnectionListener {
//   connectionChanged(newProfile: User | null): void {
//     throw new Error('Method not implemented.');
//   }
//   getName(): string {
//     throw new Error('Method not implemented.');
//   }
//   menuOpen = false;

//   toggleMenu() {
//     this.menuOpen = !this.menuOpen;
//   }

// connectedUser : User | null;

//   constructor(private router : Router ,private userservice : UsersService) {
//      ConnectionCentralizer.getInstance().addListener(this);
//      this.connectedUser = ConnectionCentralizer.getInstance().user;
//    }

//    connectionChanged(newProfile: User | null): void {
//     this.connectedUser = newProfile;
//    }

//    getName(): string {
//        return "AppComponent";
//    }

//    connect() {
//     this.router.navigateByUrl("connect");
//    }

//   // connect() {
//   //    this.userservice.login("toto", "azerty");
//   // }

//   disconnect(){
//   this.userservice.disconnect(); }
// }
