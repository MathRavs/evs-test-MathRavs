import { Injectable } from '@angular/core';
import { todoMockFactory, TodoModel } from '@evs-test/api-models';
import { Observable, of } from 'rxjs';

import { TodoApiAbstract } from '../abstract';

@Injectable()
export class TodoApiMock extends TodoApiAbstract {
  addTodo(title: string, description: string): Observable<TodoModel> {
    return of(
      todoMockFactory({
        description,
        title,
      })
    );
  }

  getTodos(): Observable<TodoModel[]> {
    return of([todoMockFactory()]);
  }
}
