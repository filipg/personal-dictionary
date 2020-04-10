import { Component, OnInit } from '@angular/core';
import { DataService } from 'src/app/services/data.service';
import { QuizResult, QuizItem } from 'src/app/interfaces/quiz.interface';
import { take } from 'rxjs/operators';
import { ResultService } from 'src/app/services/result.service';

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
    const correct = this.selectionQuizResult.items.map(el => el.usersAnswer.correctAnswer);
    this.overalResultToDisplay = `${correct.filter(el => el === true).length} / ${correct.length}`;
    this.resultService.saveOverallResult(correct.length, correct.filter(el => el === true).length).subscribe(() => {
      this.loading = false;
      console.log(correct);
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
