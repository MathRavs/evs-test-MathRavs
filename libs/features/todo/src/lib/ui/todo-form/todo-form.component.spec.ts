import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TodoFormComponent } from './todo-form.component';

describe('TodoFormComponent', () => {
  let component: TodoFormComponent;
  let fixture: ComponentFixture<TodoFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TodoFormComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(TodoFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  describe('create todo', () => {
    it('should create todo', () => {
      const spy = jest.spyOn(component.todoCreated, 'emit');
      const expectedValues = {
        description: 'test',
        title: 'test',
      };
      component.form.patchValue(expectedValues);
      component.createTodo();
      expect(spy).toHaveBeenCalledWith(expectedValues);
    });
  });
});
