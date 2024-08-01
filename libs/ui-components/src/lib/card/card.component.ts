import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, input } from '@angular/core';

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: {
    class:
      'hover:brightness-75 transition-all flex flex-col rounded-lg py-[18px] px-[15px] gap-[15px] shadow-sm border-[1px]',
  },
  imports: [CommonModule],
  selector: 'ui-card',
  standalone: true,
  templateUrl: './card.component.html',
})
export class CardComponent {
  title = input.required();
  description = input.required();
}
