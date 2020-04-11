import { Component, OnInit } from '@angular/core';
import { ResultService } from 'src/app/services/result.service';

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
  selectionResults: OverallResult;
  translationResults: OverallResult;
  numberOfQuizes: {selectionQuiz: number, translationQuiz: number};
  loading = true;

  constructor(
    private resultService: ResultService
  ) { }

  ngOnInit() {
    this.getResults();
  }

  private getResults() {
    this.resultService.getOverallResult().subscribe(data => {
      this.overallResult = data.reduce(this.reducer);
      this.selectionResults = data.filter(el => el.selectionMode).reduce(this.reducer);
      this.translationResults = data.filter(el => !el.selectionMode).reduce(this.reducer);
      this.numberOfQuizes = {
        selectionQuiz: data.filter(el => el.selectionMode).length,
        translationQuiz: data.filter(el => !el.selectionMode).length
      };
      this.loading = false;
    });
  }

  private reducer(acc: OverallResult, curr: OverallResult) {
    return {
      quizSize: acc.quizSize + curr.quizSize,
      correctAnswers: acc.correctAnswers + curr.correctAnswers
    };
  }

  countPercentages(result: OverallResult): string {
    return Math.round((result.correctAnswers * 100) / result.quizSize) + '%';
  }

}
