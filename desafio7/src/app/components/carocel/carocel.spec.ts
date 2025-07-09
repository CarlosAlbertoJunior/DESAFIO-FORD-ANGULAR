import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Carocel } from './carocel';

describe('Carocel', () => {
  let component: Carocel;
  let fixture: ComponentFixture<Carocel>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [Carocel]
    })
    .compileComponents();

    fixture = TestBed.createComponent(Carocel);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
