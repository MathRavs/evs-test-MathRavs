import { Routes } from '@angular/router';

export const TodoRouteEnum = {
  "ADD_UPDATE": "gestion",
  "LIST_PAGE": "liste"
} as const;

export const TodoRoutes: Routes = [
  {
    path: '',
    pathMatch: 'full',
    redirectTo: TodoRouteEnum.LIST_PAGE,
  },
  {
    loadComponent: () => import('./pages/list-page/list-page.component')
      .then((c) => c.ListPageComponent),
    path: TodoRouteEnum.LIST_PAGE,
    title: 'Liste des tâches',
  },
  {
    loadComponent: () => import('./pages/add-update-page/add-update-page.component')
      .then((c) => c.AddUpdatePageComponent),
    path: TodoRouteEnum.ADD_UPDATE,
    title: 'Ajouter/Modifier une tâche'
  }
];