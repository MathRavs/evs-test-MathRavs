import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [CommonModule],
  selector: 'lib-list-page',
  standalone: true,
  styleUrl: './list-page.component.scss',
  templateUrl: './list-page.component.html'
})
export class ListPageComponent {}
