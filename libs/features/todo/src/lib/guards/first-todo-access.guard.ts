import { inject } from '@angular/core';

import { TodoStore } from '../store';

export const firstTodoAccessGuard = (): boolean => {
  const todoStore = inject(TodoStore);
  if (!todoStore.state.todos()) {
    todoStore.load(undefined);
  }
  return true;
};
