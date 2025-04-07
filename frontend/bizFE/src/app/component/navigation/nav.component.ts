import { Component } from '@angular/core';
import { RouterOutlet, RouterModule } from '@angular/router';
import { AuthButtonComponent } from '../authButton/authButton.component';
//import { AuthUserComponent } from '../authButton/authUser/authUser.component';

@Component({
  selector: 'navigation',
  imports: [RouterOutlet,RouterModule, AuthButtonComponent],
  templateUrl: './nav.component.html',
  styleUrl: './nav.component.css'
})
export class NavComponent { }
