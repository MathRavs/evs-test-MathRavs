import { Component, Input } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { todoMockFactory, TodoModel } from '@evs-test/api-models';
import { CardComponent } from '@evs-test/ui-components';

import { TodoListComponent } from './todo-list.component';

@Component({
  imports: [TodoListComponent],
  selector: 'evs-todo-wrapper',
  standalone: true,
  template: `<evs-todo-todo-list [todoList]="todoItems"></evs-todo-todo-list>`,
})
class TestWrapperComponent {
  @Input({ required: true }) todoItems!: TodoModel[];
}

describe('TodoListComponent', () => {
  let component: TestWrapperComponent;
  let fixture: ComponentFixture<TestWrapperComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TestWrapperComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(TestWrapperComponent);
    component = fixture.componentInstance;
  });

  it('should display the list or an empty text', () => {
    component.todoItems = [todoMockFactory()];
    fixture.detectChanges();
    expect(
      fixture.debugElement.queryAll(By.directive(CardComponent)).length
    ).toEqual(component.todoItems.length);

    component.todoItems = [];
    fixture.detectChanges();
    expect(
      fixture.debugElement.queryAll(By.directive(CardComponent)).length
    ).toEqual(0);
    expect(
      fixture.debugElement.queryAll(By.css('[data-test-id="empty-text"]'))
        .length
    ).toEqual(1);
  });
});
