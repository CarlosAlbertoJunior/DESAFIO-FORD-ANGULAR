import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Caroucel } from './caroucel';

describe('Caroucel', () => {
  let component: Caroucel;
  let fixture: ComponentFixture<Caroucel>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [Caroucel]
    })
      .compileComponents();

    fixture = TestBed.createComponent(Caroucel);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
