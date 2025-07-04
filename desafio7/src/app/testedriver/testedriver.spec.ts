import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Testedriver } from './testedriver';

describe('Testedriver', () => {
  let component: Testedriver;
  let fixture: ComponentFixture<Testedriver>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [Testedriver]
    })
    .compileComponents();

    fixture = TestBed.createComponent(Testedriver);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
