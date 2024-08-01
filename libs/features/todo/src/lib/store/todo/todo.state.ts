import { ErrorHandler, inject, Injectable } from '@angular/core';
import { TodoModel } from '@evs-test/api-models';
import { TodoApiAbstract } from '@evs-test/evs-test-data-access';
import { tapResponse } from '@ngrx/operators';
import { patchState, signalState } from '@ngrx/signals';
import { rxMethod } from '@ngrx/signals/rxjs-interop';
import { pipe, switchMap, tap } from 'rxjs';

import { AddTodoActionInput } from './todo.type';

type TodoState = {
  error: null | string;
  isLoading: boolean;
  todos: null | TodoModel[];
};

const initialState: TodoState = {
  error: null,
  isLoading: false,
  todos: null,
};

@Injectable()
export class TodoStore {
  private readonly _apiService = inject(TodoApiAbstract);
  private readonly errorHandler = inject(ErrorHandler);

  readonly state = signalState(initialState);

  readonly load = rxMethod(
    pipe(
      tap(() =>
        patchState<TodoState>(this.state, { error: null, isLoading: true })
      ),
      switchMap(() =>
        this._apiService.getTodos().pipe(
          // signal store v18 is still in beta , there are some issues with the typing
          tapResponse({
            error: (error) => {
              this.errorHandler.handleError(error);
              patchState<TodoState>(this.state, {
                error:
                  'Une erreur est survenue pendant la récupération des tâches , veuillez réessayer',
              });
            },
            finalize: () => patchState(this.state, { isLoading: false }),
            next: (todos) => patchState<TodoState>(this.state, { todos }),
          })
        )
      )
    )
  );
  readonly add = rxMethod<AddTodoActionInput>(
    pipe(
      tap(() =>
        patchState<TodoState>(this.state, { error: null, isLoading: true })
      ),
      switchMap(({ description, title }) =>
        this._apiService.addTodo(title, description)
      ),
      tapResponse({
        error: (error) => {
          this.errorHandler.handleError(error);
          patchState<TodoState>(this.state, {
            error: "Une erreur est survenue pendant l'ajout de la tâche",
          });
        },
        finalize: () => patchState(this.state, { isLoading: false }),
        next: (todo) => {
          const currentTodos = this.state.todos();
          patchState(this.state, {
            isLoading: false,
            todos: currentTodos ? [todo, ...currentTodos] : null,
          });
        },
      })
    )
  );
}
