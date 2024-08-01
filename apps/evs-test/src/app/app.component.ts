import { Component } from '@angular/core';
import { RouterModule, RouterOutlet } from '@angular/router';

@Component({
  imports: [RouterModule, RouterOutlet],
  selector: 'evs-front-root',
  standalone: true,
  styleUrl: './app.component.scss',
  templateUrl: './app.component.html',
})
export class AppComponent {
  title = 'evs-test';
}
