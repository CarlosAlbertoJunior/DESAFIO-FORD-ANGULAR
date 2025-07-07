import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Testedrive } from './testedrive';

describe('Testedriver', () => {
  let component: Testedrive;
  let fixture: ComponentFixture<Testedrive>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [Testedrive]
    })
    .compileComponents();

    fixture = TestBed.createComponent(Testedrive);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
