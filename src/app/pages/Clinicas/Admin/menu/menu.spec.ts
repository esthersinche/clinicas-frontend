import { ComponentFixture, TestBed } from '@angular/core/testing';

import { menuAdminComponent } from './menu';

describe('Menu', () => {
  let component: menuAdminComponent;
  let fixture: ComponentFixture<menuAdminComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [menuAdminComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(menuAdminComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
