import { NgClass } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  Output,
} from '@angular/core';
import {
  FormControl,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import {
  ActionButtonDirective,
  AlertBlockDirective,
} from '@evs-test/ui-components';

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: {
    class:
      'block bg-white p-[18px] rounded-lg shadow-md border-[1px] border-solid border-slate-100',
  },
  imports: [
    ReactiveFormsModule,
    FormsModule,
    NgClass,
    ActionButtonDirective,
    AlertBlockDirective,
  ],
  selector: 'evs-todo-todo-form',
  standalone: true,
  templateUrl: './todo-form.component.html',
})
export class TodoFormComponent {
  readonly form = new FormGroup({
    description: new FormControl('', {
      nonNullable: true,
      validators: [Validators.required],
    }),
    title: new FormControl('', {
      nonNullable: true,
      validators: [Validators.required],
    }),
  });

  @Output() readonly todoCreated = new EventEmitter<{
    description: string;
    title: string;
  }>();

  createTodo(): void {
    this.todoCreated.emit({
      description: this.form.controls.description.value,
      title: this.form.controls.title.value,
    });
  }
}
