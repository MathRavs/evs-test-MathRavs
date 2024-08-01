import { Component, input } from '@angular/core';
import { TodoModel } from '@evs-test/api-models';
import { CardComponent } from '@evs-test/ui-components';

@Component({
  host: {
    class: 'flex flex-col gap-[8px]',
  },
  imports: [
    CardComponent
  ],
  selector: 'evs-todo-todo-list',
  standalone: true,
  templateUrl: './todo-list.component.html',
})
export class TodoListComponent {
  todoList = input.required<TodoModel[]>();
}
