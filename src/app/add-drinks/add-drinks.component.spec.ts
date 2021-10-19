import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddDrinksComponent } from './add-drinks.component';

describe('AddDrinksComponent', () => {
  let component: AddDrinksComponent;
  let fixture: ComponentFixture<AddDrinksComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddDrinksComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AddDrinksComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
