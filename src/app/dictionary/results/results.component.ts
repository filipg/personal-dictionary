import { Component, OnInit } from '@angular/core';
import { ResultService } from 'src/app/services/result.service';
import { combineLatest } from 'rxjs';
import { QuizResult, TranslationQuizResult } from 'src/app/interfaces/quiz.interface';

@Component({
  selector: 'app-results',
  templateUrl: './results.component.html',
  styleUrls: ['./results.component.css']
})
export class ResultsComponent implements OnInit {

  overallResult: {quizSize: number, correctAnswers: number}[] = [];
  selectionResults: QuizResult;
  translationResult: TranslationQuizResult;

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
        this.overallResult = data[2];
      });
  }

}
