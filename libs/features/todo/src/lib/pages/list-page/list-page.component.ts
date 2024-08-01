import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { TodoRouteEnum } from '@evs-test/todo';

import { TodoStore } from '../../store';
import { TodoListComponent } from '../../ui/todo-list/todo-list.component';

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: {
    'class': 'lg:min-w-[40vw] md:min-w-[60vw] min-w-[90vw] bg-white p-[18px] rounded-lg shadow-md border-w-[1px] border-solid border-slate-50'
  },
  imports: [CommonModule, TodoListComponent, RouterLink],
  selector: 'evs-todo-list-page',
  standalone: true,
  templateUrl: './list-page.component.html'
})
export class ListPageComponent {
  private readonly todoStore = inject(TodoStore);
  private readonly router = inject(Router);
  private readonly activatedRoute = inject(ActivatedRoute);
  readonly todos$$ = this.todoStore.state.todos;
  readonly loading$$ = this.todoStore.state.isLoading;
  readonly managementPageLink = this.router.createUrlTree([`../${TodoRouteEnum.ADD_UPDATE}`], {
    relativeTo: this.activatedRoute
  });
}
