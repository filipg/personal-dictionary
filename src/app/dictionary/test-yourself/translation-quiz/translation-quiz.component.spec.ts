import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TranslationQuizComponent } from './translation-quiz.component';

describe('TranslationQuizComponent', () => {
  let component: TranslationQuizComponent;
  let fixture: ComponentFixture<TranslationQuizComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TranslationQuizComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TranslationQuizComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
