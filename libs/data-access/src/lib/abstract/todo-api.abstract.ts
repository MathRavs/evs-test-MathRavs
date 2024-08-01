import { TodoModel } from '@evs-test/api-models';
import { Observable } from 'rxjs';

export abstract class TodoApiAbstract {
  abstract addTodo(title: string, description: string): Observable<TodoModel>;
  abstract getTodos(): Observable<TodoModel[]>;
}
