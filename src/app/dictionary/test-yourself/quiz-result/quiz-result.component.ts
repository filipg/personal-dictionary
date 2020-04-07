import { Component, OnInit } from '@angular/core';
import { DataService } from 'src/app/services/data.service';
import { QuizResult } from 'src/app/interfaces/quiz.interface';
import { take } from 'rxjs/operators';

@Component({
  selector: 'app-quiz-result',
  templateUrl: './quiz-result.component.html',
  styleUrls: ['./quiz-result.component.css']
})
export class QuizResultComponent implements OnInit {

  selectionQuizResult: QuizResult;
  overalResultToDisplay = '';

  constructor(
    private dataService: DataService
  ) { }

  ngOnInit() {
    this.getQuizResult();
  }

  private getQuizResult() {
    this.dataService.quizResultSubject.pipe(
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
    console.log(correct);
  }

  private displayTranslationQuizResult() {

  }

}
