import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GestionRecepComponent } from './recepcionistas';

describe('Recepcionistas', () => {
  let component: GestionRecepComponent;
  let fixture: ComponentFixture<GestionRecepComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [GestionRecepComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(GestionRecepComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
