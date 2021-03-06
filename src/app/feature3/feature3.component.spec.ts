import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { Feature3Component } from './feature3.component';
import { RouterTestingModule } from '@angular/router/testing';

describe('Feature3Component', () => {
  let component: Feature3Component;
  let fixture: ComponentFixture<Feature3Component>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        RouterTestingModule
      ],
      declarations: [ Feature3Component ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(Feature3Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
