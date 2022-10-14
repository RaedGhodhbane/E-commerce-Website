import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AjouterSousCategoryComponent } from './ajouter-sous-category.component';

describe('AjouterSousCategoryComponent', () => {
  let component: AjouterSousCategoryComponent;
  let fixture: ComponentFixture<AjouterSousCategoryComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AjouterSousCategoryComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AjouterSousCategoryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
