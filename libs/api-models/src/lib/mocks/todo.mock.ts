import { TodoModel } from '@evs-test/api-models';

export const todoMockFactory = (todo?: Partial<TodoModel>): TodoModel => ({
  description: 'a freshly created todo - description',
  title: 'a freshly created todo',
   ...todo,
})