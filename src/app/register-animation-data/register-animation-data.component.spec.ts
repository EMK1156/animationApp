import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RegisterAnimationDataComponent } from './register-animation-data.component';

describe('RegisterAnimationDataComponent', () => {
  let component: RegisterAnimationDataComponent;
  let fixture: ComponentFixture<RegisterAnimationDataComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RegisterAnimationDataComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RegisterAnimationDataComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
