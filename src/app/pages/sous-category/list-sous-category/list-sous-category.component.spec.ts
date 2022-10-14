import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListSousCategoryComponent } from './list-sous-category.component';

describe('ListSousCategoryComponent', () => {
  let component: ListSousCategoryComponent;
  let fixture: ComponentFixture<ListSousCategoryComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ListSousCategoryComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ListSousCategoryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
