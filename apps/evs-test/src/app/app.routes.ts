import { Route } from '@angular/router';
import { AppRoutesEnum } from '@evs-test/front/app.routes.constant';


export const appRoutes: Route[] = [{
  path: '',
  pathMatch: 'full',
  redirectTo: AppRoutesEnum.TODO,
}, {
  loadChildren: () =>  import('@evs-test/todo').then(m => m.TodoRoutes),
  path: AppRoutesEnum.TODO,
}];
