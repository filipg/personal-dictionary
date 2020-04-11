import { Component, OnInit } from '@angular/core';
import { DataService } from 'src/app/services/data.service';
import { SingleTranslationQuestionResult, QuizResult } from 'src/app/interfaces/quiz.interface';
import { take } from 'rxjs/operators';
import { ResultService } from 'src/app/services/result.service';

@Component({
  selector: 'app-translation-result',
  templateUrl: './translation-result.component.html',
  styleUrls: ['./translation-result.component.css']
})
export class TranslationResultComponent implements OnInit {

  translationQuizResult: SingleTranslationQuestionResult[] = [];
  overalResultToDisplay = '';
  loading = true;

  constructor(
    private dataService: DataService,
    private resultService: ResultService
  ) { }

  ngOnInit() {
    this.getResult();
  }

  private getResult() {
    this.dataService.translationResultSubject.pipe(
      take(1),
    ).subscribe(data => {
      this.translationQuizResult = data;
      if (data) {
        this.displayTranslationQuizResult();
      }
    });
  }

  private displayTranslationQuizResult() {
    const correct = this.translationQuizResult.map(el => Array.from(el.options)
      .some(option => option.replace(/\s+/g, '') === String(el.usersAnswer).replace(/\s+/g, '')));

    this.overalResultToDisplay = `${correct.filter(el => el === true).length} / ${correct.length}`;

    const resultToSave: QuizResult = {
      quizSize: correct.length,
      correctAnswers: correct.filter(el => el === true).length,
      selectionMode: false
    };

    this.resultService.saveOverallResult(resultToSave).subscribe(() => {
      this.loading = false;
    });
  }

  checkIfCorrect(options: string[], usersAnswer: string): boolean {
    return Array.from(options).some(el => el.replace(/\s+/g, '') === String(usersAnswer).replace(/\s+/g, ''));
  }

}
