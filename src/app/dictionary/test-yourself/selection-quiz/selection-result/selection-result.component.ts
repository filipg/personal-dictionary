import { Component, OnInit } from '@angular/core';
import { DataService } from 'src/app/services/data.service';
import { QuizResult, QuizItem } from 'src/app/interfaces/quiz.interface';
import { take } from 'rxjs/operators';

@Component({
  selector: 'app-quiz-result',
  templateUrl: './selection-result.component.html',
  styleUrls: ['./selection-result.component.css']
})
export class SelectionResultComponent implements OnInit {

  selectionQuizResult: QuizResult;
  overalResultToDisplay = '';
  loading = true;

  constructor(
    private dataService: DataService
  ) { }

  ngOnInit() {
    this.getQuizResult();
  }

  private getQuizResult() {
    this.dataService.selectionResultSubject.pipe(
      take(1)
    ).subscribe(data => {
      if (data !== null) {
        if (data.abcdQuizMode) {
          this.selectionQuizResult = data;
          this.displaySelectionQuizResult();
        } else {
          this.displayTranslationQuizResult();
        }
      }
    });
  }

  private displaySelectionQuizResult() {
    const correct = this.selectionQuizResult.items.map(el => el.usersAnswer.correctAnswer);
    this.overalResultToDisplay = `${correct.filter(el => el === true).length} / ${correct.length}`;
    this.loading = false;
    console.log(correct);
  }

  private displayTranslationQuizResult() {

  }

  highlightAnswers(option: QuizItem, userAnswer: QuizItem) {
    if ((option.correctAnswer && option === userAnswer) || (option.correctAnswer && option !== userAnswer)) {
      return '#b3ffb3';
    } else if (!option.correctAnswer && option === userAnswer) {
      return '#ffcccc';
    }
    return '';
  }

}
