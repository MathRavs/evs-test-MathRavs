import { signal } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute, Router } from '@angular/router';
import { todoMockFactory } from '@evs-test/api-models';
import { of } from 'rxjs';

import { TodoStore } from '../../store';
import { AddPageComponent } from './add-page.component';

describe('AddPageComponent', () => {
  let component: AddPageComponent;
  let fixture: ComponentFixture<AddPageComponent>;
  let routerSpy: Router;
  let activatedRouteSpy: ActivatedRoute;
  let storeSpy: TodoStore;

  beforeEach(async () => {
    routerSpy = {
      createUrlTree: jest.fn().mockImplementation(() => []),
      events: of(),
      navigate: jest.fn(() => Promise.resolve(undefined)),
      navigateByUrl: jest.fn(() => Promise.resolve(undefined)),
      serializeUrl: jest.fn(),
    } as unknown as Router;
    storeSpy = {
      add: jest.fn(),
      load: jest.fn(),
      state: {
        isLoading: signal(false),
        todos: signal(todoMockFactory()),
      },
    } as unknown as TodoStore;
    await TestBed.configureTestingModule({
      imports: [AddPageComponent],
      providers: [
        {
          provide: Router,
          useValue: routerSpy,
        },
        {
          provide: ActivatedRoute,
          useValue: activatedRouteSpy,
        },
        {
          provide: TodoStore,
          useValue: storeSpy,
        },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(AddPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  describe('createTodo', () => {
    it('should create todo and navigate', async () => {
      const expectedData = { description: 'description', title: 'title' };
      const addTodoSpy = jest.spyOn(storeSpy, 'add');
      const navigateSpy = jest.spyOn(routerSpy, 'navigateByUrl');
      await component.createTodo(expectedData);
      expect(addTodoSpy).toHaveBeenCalledWith(expectedData);
      expect(navigateSpy).toHaveBeenCalled();
    });
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
