import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AddUpdatePageComponent } from './add-update-page.component';

describe('AddUpdatePageComponent', () => {
  let component: AddUpdatePageComponent;
  let fixture: ComponentFixture<AddUpdatePageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AddUpdatePageComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(AddUpdatePageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
