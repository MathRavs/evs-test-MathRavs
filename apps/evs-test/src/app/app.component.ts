import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';

@Component({
  imports: [RouterModule],
  selector: 'evs-front-root',
  standalone: true,
  styleUrl: './app.component.scss',
  templateUrl: './app.component.html',
})
export class AppComponent {
  title = 'evs-test';
}
