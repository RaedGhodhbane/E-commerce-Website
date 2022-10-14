import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModifierSousCategoryComponent } from './modifier-sous-category.component';

describe('ModifierSousCategoryComponent', () => {
  let component: ModifierSousCategoryComponent;
  let fixture: ComponentFixture<ModifierSousCategoryComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ModifierSousCategoryComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ModifierSousCategoryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
