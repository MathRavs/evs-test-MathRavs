import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [CommonModule],
  selector: 'lib-add-update-page',
  standalone: true,
  styleUrl: './add-update-page.component.scss',
  templateUrl: './add-update-page.component.html'
})
export class AddUpdatePageComponent {}
