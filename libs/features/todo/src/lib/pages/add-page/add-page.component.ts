import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { TodoRouteEnum } from '@evs-test/todo';

import { AddTodoActionInput, TodoStore } from '../../store';
import { TodoFormComponent } from '../../ui/todo-form/todo-form.component';

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: {
    class: 'lg:min-w-[40vw] md:min-w-[60vw] min-w-[90vw] bg-white p-[18px] rounded-lg shadow-md border-w-[1px] border-solid border-slate-50'
  },
  imports: [CommonModule, RouterLink, TodoFormComponent],
  selector: 'evs-todo-add-page',
  standalone: true,
  templateUrl: './add-page.component.html'
})
export class AddPageComponent {
  private readonly todoStore = inject(TodoStore);
  private readonly router = inject(Router);
  private readonly activatedRoute = inject(ActivatedRoute);
  readonly todos$$ = this.todoStore.state.todos;
  
  readonly loading$$ = this.todoStore.state.isLoading;
  readonly listPageLink = this.router.createUrlTree([`../${TodoRouteEnum.LIST_PAGE}`], {
    relativeTo: this.activatedRoute
  });

  async createTodo(data: AddTodoActionInput): Promise<void> {
    this.todoStore.add(data);
    await this.router.navigateByUrl(this.listPageLink);
  }
}
