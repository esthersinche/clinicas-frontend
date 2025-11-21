import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DashboardDoc } from './dashboard-doc';

describe('DashboardDoc', () => {
  let component: DashboardDoc;
  let fixture: ComponentFixture<DashboardDoc>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DashboardDoc]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DashboardDoc);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
