import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
//import { AuthButtonComponent } from '../authButton/authButton.component';
//import { AuthUserComponent } from '../authButton/authUser/authUser.component';


@Component({
  selector: 'home',
  imports: [RouterOutlet],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent { }
