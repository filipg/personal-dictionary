import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TestYourselfComponent } from './test-yourself.component';

describe('TestYourselfComponent', () => {
  let component: TestYourselfComponent;
  let fixture: ComponentFixture<TestYourselfComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TestYourselfComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TestYourselfComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
