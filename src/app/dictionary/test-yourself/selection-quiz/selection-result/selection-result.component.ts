import { Component, OnInit } from '@angular/core';
import { DataService } from 'src/app/services/data.service';
import { QuizItem, SingleQuestionResult, QuizResult } from 'src/app/interfaces/quiz.interface';
import { take } from 'rxjs/operators';
import { ResultService } from 'src/app/services/result.service';

@Component({
  selector: 'app-quiz-result',
  templateUrl: './selection-result.component.html',
  styleUrls: ['./selection-result.component.css']
})
export class SelectionResultComponent implements OnInit {

  selectionQuizResult: SingleQuestionResult[] = [];
  overalResultToDisplay = '';
  loading = true;

  constructor(
    private dataService: DataService,
    private resultService: ResultService
  ) { }

  ngOnInit() {
    this.getQuizResult();
  }

  private getQuizResult() {
    this.dataService.selectionResultSubject.pipe(
      take(1)
    ).subscribe(data => {
      if (data !== null) {
        this.selectionQuizResult = data;
        this.displaySelectionQuizResult();
      }
    });
  }

  private displaySelectionQuizResult() {
    const correct = this.selectionQuizResult.map(el => el.usersAnswer.correctAnswer);
    this.overalResultToDisplay = `${correct.filter(el => el === true).length} / ${correct.length}`;
    const resultToSave: QuizResult = {
      quizSize: correct.length,
      correctAnswers: correct.filter(el => el === true).length,
      selectionMode: true
    };

    this.resultService.saveOverallResult(resultToSave).subscribe(() => {
      this.loading = false;
    });
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
