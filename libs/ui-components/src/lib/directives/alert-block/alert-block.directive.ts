import { Directive } from '@angular/core';

@Directive({
  host: {
    class: 'p-[15px] flex justify-center items-center bg-red-500 rounded-lg',
  },
  selector: 'div[uiAlertBlock]',
  standalone: true,
})
export class AlertBlockDirective {}
