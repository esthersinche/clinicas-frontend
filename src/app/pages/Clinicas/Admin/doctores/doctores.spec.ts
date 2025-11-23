import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GestionDocComponent } from './doctores';

describe('Doctores', () => {
  let component: GestionDocComponent;
  let fixture: ComponentFixture<GestionDocComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [GestionDocComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(GestionDocComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
