import { Component, OnInit } from '@angular/core';
import { ResultService } from 'src/app/services/result.service';

interface OverallResult {
  quizSize: number;
  correctAnswers: number;
}

@Component({
  selector: 'app-results',
  templateUrl: './results.component.html',
  styleUrls: ['./results.component.scss']
})
export class ResultsComponent implements OnInit {

  overallResult: OverallResult;
  selectionResults: OverallResult;
  translationResults: OverallResult;
  numberOfQuizes: {selectionQuiz: number, translationQuiz: number};
  loading = true;
  enoughtElements = false;

  constructor(
    private resultService: ResultService
  ) { }

  ngOnInit() {
    this.getResults();
  }

  private getResults() {
    this.resultService.getOverallResult().subscribe(data => {
      this.loading = false;
      if (data.length) {
        this.overallResult = data.reduce(this.reducer);

        this.selectionResults = data.filter(el => el.selectionMode).length ?
          data.filter(el => el.selectionMode).reduce(this.reducer) : {quizSize: 0, correctAnswers: 0};

        this.translationResults = data.filter(el => !el.selectionMode).length ?
          data.filter(el => !el.selectionMode).reduce(this.reducer) : {quizSize: 0, correctAnswers: 0};

        this.numberOfQuizes = {
          selectionQuiz: data.filter(el => el.selectionMode).length,
          translationQuiz: data.filter(el => !el.selectionMode).length
        };
        this.enoughtElements = true;
      }
    });
  }

  private reducer(acc: OverallResult, curr: OverallResult) {
    return {
      quizSize: acc.quizSize + curr.quizSize,
      correctAnswers: acc.correctAnswers + curr.correctAnswers
    };
  }

  countPercentages(result: OverallResult): string {
    return result.quizSize ? Math.round((result.correctAnswers * 100) / result.quizSize) + '%' : '0';
  }

}
