import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';

@Component({
  host: {
    'class': 'w-[100vw] max-w-[100vw] h-[100vh] max-h-[100vh] flex items-center justify-center'
  },
  imports: [CommonModule],
  selector: 'ui-full-screen-page',
  standalone: true,
  styleUrl: './full-screen-page.component.scss',
  templateUrl: './full-screen-page.component.html',
})
export class FullScreenPageComponent {}
