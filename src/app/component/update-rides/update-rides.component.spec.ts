import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UpdateRidesComponent } from './update-rides.component';

describe('UpdateRidesComponent', () => {
  let component: UpdateRidesComponent;
  let fixture: ComponentFixture<UpdateRidesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UpdateRidesComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(UpdateRidesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
