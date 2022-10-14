import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModifierCategoryComponent } from './modifier-category.component';

describe('ModifierCategoryComponent', () => {
  let component: ModifierCategoryComponent;
  let fixture: ComponentFixture<ModifierCategoryComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ModifierCategoryComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ModifierCategoryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
