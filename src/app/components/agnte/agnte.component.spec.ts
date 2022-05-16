import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AgnteComponent } from './agnte.component';

describe('AgnteComponent', () => {
  let component: AgnteComponent;
  let fixture: ComponentFixture<AgnteComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AgnteComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AgnteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
