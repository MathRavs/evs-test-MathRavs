import { Routes } from '@angular/router';

import { firstTodoAccessGuard } from './guards/first-todo-access.guard';
import { TodoStore } from './store';

export const TodoRouteEnum = {
  ADD_UPDATE: 'gestion',
  LIST_PAGE: 'liste',
} as const;

export const TodoRoutes: Routes = [
  {
    canActivate: [firstTodoAccessGuard],
    children: [
      {
        path: '',
        pathMatch: 'full',
        redirectTo: TodoRouteEnum.LIST_PAGE,
      },
      {
        loadComponent: () =>
          import('./pages/list-page/list-page.component').then(
            (c) => c.ListPageComponent
          ),
        path: TodoRouteEnum.LIST_PAGE,
        title: 'Liste des tâches',
      },
      {
        loadComponent: () =>
          import('./pages/add-page/add-page.component').then(
            (c) => c.AddPageComponent
          ),
        path: TodoRouteEnum.ADD_UPDATE,
        title: 'Ajouter/Modifier une tâche',
      },
    ],
    path: '',
    providers: [TodoStore],
  },
];
