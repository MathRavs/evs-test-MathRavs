import { Component, Input } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';

import { CardComponent } from './card.component';

@Component({
  imports: [CardComponent],
  standalone: true,
  template: '<ui-card [title]="title" [description]="description"></ui-card>',
})
class TestWrapperComponent {
  @Input({required: true}) title!: string;
  @Input({required: true}) description!: string;
}

describe('CardComponent', () => {
  let component: TestWrapperComponent;
  let fixture: ComponentFixture<TestWrapperComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TestWrapperComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(TestWrapperComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should display title and description', () => {
    component.title = 'test';
    component.description = 'description';
    fixture.detectChanges();

    expect(fixture.debugElement.query(By.css('[data-test-id="description"]')).nativeElement.textContent).toEqual(component.description);
    expect(fixture.debugElement.query(By.css('[data-test-id="title"]')).nativeElement.textContent).toEqual(component.title);
  });
});
