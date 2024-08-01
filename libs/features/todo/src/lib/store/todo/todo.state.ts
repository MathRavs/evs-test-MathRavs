import { inject, Injectable } from '@angular/core';
import { TodoModel } from '@evs-test/api-models';
import { TodoApiAbstract } from '@evs-test/evs-test-data-access';
import { patchState, signalState } from '@ngrx/signals';
import { rxMethod } from '@ngrx/signals/rxjs-interop';
import { finalize, pipe, switchMap, tap } from 'rxjs';

import { AddTodoActionInput } from './todo.type';

type TodoState = {
  isLoading: boolean;
  todos: null | TodoModel[];
}

const initialState: TodoState = {
  isLoading: false,
  todos: null,
};

@Injectable()
export class TodoStore {
  private readonly _apiService = inject(TodoApiAbstract);

  readonly state = signalState(initialState);
  
  readonly load = rxMethod(
    pipe(
      tap(() => patchState(this.state, { isLoading: true })),
      switchMap(() => this._apiService.getTodos().pipe(
        // signal store v18 is still in beta , there are some issues with the typing
        tap((todos) => patchState<TodoState>(this.state, {todos})),
        finalize(() => patchState(this.state,{ isLoading: false }))
      ))
    )
  );
  readonly add = rxMethod<AddTodoActionInput>(
    pipe(
      tap(() => patchState(this.state,{ isLoading: true })),
      switchMap(({description, title}) => this._apiService.addTodo(title, description)),
      tap((todo) => {
        const currentTodos = this.state.todos();
        patchState(this.state, {isLoading: false, todos: currentTodos ? [todo, ...currentTodos] : null});
      })
    )
  )
}

