import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { TodoModel } from '@evs-test/api-models';
import { Observable } from 'rxjs';

import { TodoApiAbstract } from '../abstract';
import { BASE_URL_TOKEN } from '../injection-tokens';

@Injectable()
export class TodoApiService extends TodoApiAbstract {
  private readonly httpClient = inject(HttpClient);
  private readonly baseUrl = inject(BASE_URL_TOKEN);

  /**
   * @description add item
   * @description /items
   * @POST
   * @param title
   * @param description
   */
  addTodo(title: string, description: string): Observable<TodoModel> {
    return this.httpClient.post<TodoModel>(this.baseUrl, {
      description,
      title,
    });
  }

  /**
   * @description get the list of items
   * @GET
   */
  getTodos(): Observable<TodoModel[]> {
    return this.httpClient.get<TodoModel[]>(this.baseUrl);
  }
}
