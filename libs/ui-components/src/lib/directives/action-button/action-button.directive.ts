import { Directive } from '@angular/core';

@Directive({
  host: {
    class:
      'hover:brightness-75 transition-all px-[12px] py-[4px] font-semibold text-sm bg-orange-400 text-white rounded-xl shadow-lg',
  },
  selector: 'button[uiActionButton]',
  standalone: true,
})
export class ActionButtonDirective {}
