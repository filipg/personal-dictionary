import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SelectionQuizComponent } from './selection-quiz.component';

describe('SelectionQuizComponent', () => {
  let component: SelectionQuizComponent;
  let fixture: ComponentFixture<SelectionQuizComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SelectionQuizComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SelectionQuizComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
