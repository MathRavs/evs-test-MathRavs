import { Component } from '@angular/core';
import { RouterModule, RouterOutlet } from '@angular/router';
import { FullScreenPageComponent } from '@evs-test/ui-components';

@Component({
  imports: [RouterModule, RouterOutlet, FullScreenPageComponent],
  selector: 'evs-front-root',
  standalone: true,
  styleUrl: './app.component.scss',
  templateUrl: './app.component.html',
})
export class AppComponent {}
