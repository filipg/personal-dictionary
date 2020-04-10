import { Component, OnInit } from '@angular/core';
import { ResultService } from 'src/app/services/result.service';
import { combineLatest } from 'rxjs';
import { SingleQuestionResult, SingleTranslationQuestionResult } from 'src/app/interfaces/quiz.interface';

interface OverallResult {
  quizSize: number;
  correctAnswers: number;
}

@Component({
  selector: 'app-results',
  templateUrl: './results.component.html',
  styleUrls: ['./results.component.css']
})
export class ResultsComponent implements OnInit {

  overallResult: OverallResult;
  selectionResults: SingleQuestionResult[] = [];
  translationResult: SingleTranslationQuestionResult[] = [];

  constructor(
    private resultService: ResultService
  ) { }

  ngOnInit() {
    this.getResults();
  }

  private getResults() {
    combineLatest(
      this.resultService.getSelectionQuizResult(),
      this.resultService.getTranslationQuizResult(),
      this.resultService.getOverallResult()
      ).subscribe(data => {
        this.selectionResults = data[0];
        this.translationResult = data[1];
        this.overallResult = data[2].reduce(this.reducer);
      });
  }

  private reducer(acc: OverallResult, curr: OverallResult) {
    return {
      quizSize: acc.quizSize + curr.quizSize,
      correctAnswers: acc.correctAnswers + curr.correctAnswers
    };
  }

}
