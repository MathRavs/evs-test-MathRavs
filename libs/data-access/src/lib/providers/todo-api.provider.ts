import { Provider } from '@angular/core';

import { TodoApiAbstract } from '../abstract';
import { BASE_URL_TOKEN } from '../injection-tokens';
import { TodoApiService } from '../services/todo-api.service';

export const provideBaseUrl = (baseUrl: string): Provider => ({
  provide: BASE_URL_TOKEN,
  useValue: baseUrl
});

export const provideTodoApi = (baseUrl: string): Provider[] => {
  return [{
    provide: TodoApiAbstract,
    useClass: TodoApiService
  }, provideBaseUrl(baseUrl)];
};

