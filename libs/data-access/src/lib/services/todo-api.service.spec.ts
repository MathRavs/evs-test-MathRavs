import { provideHttpClient } from '@angular/common/http';
import {
  HttpTestingController,
  provideHttpClientTesting,
} from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';
import { todoMockFactory } from '@evs-test/api-models';

import { provideBaseUrl } from '../providers';
import { TodoApiService } from './todo-api.service';

const baseApiUrl = 'https://localhost/apis/todo-api';
const todoMockList = [todoMockFactory()];

describe('TodoApiService', () => {
  let service: TodoApiService;
  let httpTesting: HttpTestingController;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      providers: [
        provideHttpClient(),
        provideHttpClientTesting(),
        TodoApiService,
        provideBaseUrl(baseApiUrl),
      ],
    }).compileComponents();

    service = TestBed.inject(TodoApiService);
    httpTesting = TestBed.inject(HttpTestingController);
  });

  describe('getTodos', () => {
    it('Should return an array of todos', () => {
      service
        .getTodos()
        .subscribe((result) => expect(result).toEqual(todoMockList));
      const request = httpTesting.expectOne({
        method: 'GET',
        url: `${baseApiUrl}`,
      });

      request.flush(todoMockList);
    });
  });

  describe('addTodo', () => {
    it('should add todo', () => {
      const title = 'new title';
      const description = 'new description';

      const expectedTodo = todoMockFactory({ description, title });

      service
        .addTodo(title, description)
        .subscribe((result) => expect(result).toEqual(expectedTodo));

      const request = httpTesting.expectOne({
        method: 'POST',
        url: `${baseApiUrl}`,
      });

      request.flush(expectedTodo);
    });
  });

  afterEach(() => {
    httpTesting.verify();
  });
});
