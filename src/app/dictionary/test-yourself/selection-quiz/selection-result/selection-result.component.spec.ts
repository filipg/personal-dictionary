import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { SelectionResultComponent } from './selection-result.component';

// import { QuizResultComponent } from './selection-result.component';

describe('QuizResultComponent', () => {
  let component: SelectionResultComponent;
  let fixture: ComponentFixture<SelectionResultComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SelectionResultComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SelectionResultComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
