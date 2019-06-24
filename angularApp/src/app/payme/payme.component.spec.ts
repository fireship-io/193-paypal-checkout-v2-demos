import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PaymeComponent } from './payme.component';

describe('PaymeComponent', () => {
  let component: PaymeComponent;
  let fixture: ComponentFixture<PaymeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PaymeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PaymeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
