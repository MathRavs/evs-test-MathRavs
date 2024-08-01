import { fakeAsync, TestBed, tick } from '@angular/core/testing';
import { todoMockFactory } from '@evs-test/api-models';
import { TodoApiAbstract } from '@evs-test/evs-test-data-access';
import { delay, of, throwError } from 'rxjs';

import { TodoStore } from './todo.state';

import clearAllMocks = jest.clearAllMocks;

const todoMock = todoMockFactory();
const todoMocks = [todoMock];

describe('TodoState', () => {
  let todoApiSpy: TodoApiAbstract;
  let todoStore: TodoStore;

  beforeEach(async () => {
    todoApiSpy = {
      addTodo: jest.fn().mockImplementation(() => of(todoMock).pipe(delay(1))),
      getTodos: jest
        .fn()
        .mockImplementation(() => of(todoMocks).pipe(delay(1))),
    };
    await TestBed.configureTestingModule({
      providers: [
        {
          provide: TodoApiAbstract,
          useValue: todoApiSpy,
        },
        TodoStore,
      ],
    }).compileComponents();

    todoStore = TestBed.inject(TodoStore);
  });

  describe('add', () => {
    it('should add the todo item', fakeAsync(() => {
      const addTodoApiSpy = jest.spyOn(todoApiSpy, 'addTodo');

      const addInput = {
        description: 'description',
        title: 'title',
      };

      todoStore.add(addInput);

      expect(todoStore.state.isLoading()).toBe(true);
      tick(1);

      expect(addTodoApiSpy).toHaveBeenCalled();
      expect(todoStore.state.isLoading()).toBe(false);
      expect(todoStore.state.todos()).toEqual(null);
      addTodoApiSpy.mockClear();

      todoStore.load(undefined);
      tick(1);
      todoStore.add(addInput);
      tick(1);
      expect(todoStore.state.todos()).toEqual([todoMock, ...todoMocks]);
    }));

    it('should handle error', () => {
      // eslint-disable-next-line no-console
      console.error = jest.fn();

      todoApiSpy.addTodo = jest
        .fn()
        .mockImplementation(() => throwError(() => new Error()));
      const addInput = {
        description: 'description',
        title: 'title',
      };

      todoStore.add(addInput);
      expect(todoStore.state.error).toBeTruthy();
    });
  });

  describe('get', () => {
    it('should list todo items', fakeAsync(() => {
      const getTodosApiSpy = jest.spyOn(todoApiSpy, 'getTodos');
      todoStore.load(undefined);
      expect(todoStore.state.isLoading()).toBe(true);
      tick(1);
      expect(getTodosApiSpy).toHaveBeenCalled();
      expect(todoStore.state.isLoading()).toBe(false);
      expect(todoStore.state.todos()).toEqual(todoMocks);
    }));

    it('should handle error', () => {
      // eslint-disable-next-line no-console
      console.error = jest.fn();

      todoApiSpy.getTodos = jest
        .fn()
        .mockImplementation(() => throwError(() => new Error()));

      todoStore.load(undefined);
      expect(todoStore.state.error).toBeTruthy();
    });
  });

  afterEach(() => {
    clearAllMocks();
  });
});
