import { TestBed } from '@angular/core/testing';
import { TodoApiAbstract, TodoApiMock } from '@evs-test/evs-test-data-access';

import { TodoStore } from '../store';
import { firstTodoAccessGuard } from './first-todo-access.guard';

describe('firstTodoAccessGuard', () => {
  let todoStore: TodoStore;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      providers: [
        TodoStore,
        {
          provide: TodoApiAbstract,
          useClass: TodoApiMock,
        },
      ],
    }).compileComponents();

    todoStore = TestBed.inject(TodoStore);
  });

  it('should load the data on the first access', () => {
    const loadSpy = jest.spyOn(todoStore, 'load');

    TestBed.runInInjectionContext(() => {
      firstTodoAccessGuard();
      expect(loadSpy).toHaveBeenCalled();

      firstTodoAccessGuard();
      expect(loadSpy).toHaveBeenCalledTimes(1);
    });
  });
});
