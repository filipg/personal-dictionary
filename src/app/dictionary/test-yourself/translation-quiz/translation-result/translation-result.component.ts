import { Component, OnInit } from '@angular/core';
import { DataService } from 'src/app/services/data.service';
import { TranslationQuizResult } from 'src/app/interfaces/quiz.interface';
import { take } from 'rxjs/operators';

@Component({
  selector: 'app-translation-result',
  templateUrl: './translation-result.component.html',
  styleUrls: ['./translation-result.component.css']
})
export class TranslationResultComponent implements OnInit {

  translationQuizResult: TranslationQuizResult;
  overalResultToDisplay = '';
  loading = true;

  constructor(
    private dataService: DataService
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
    const correct = this.translationQuizResult.items.map(el => Array.from(el.options)
      .some(option => option.replace(/\s+/g, '') === String(el.usersAnswer).replace(/\s+/g, '')));

    console.log(correct);
    this.overalResultToDisplay = `${correct.filter(el => el === true).length} / ${correct.length}`;
    this.loading = false;
  }

  checkIfCorrect(options: string[], usersAnswer: string): boolean {
    return Array.from(options).some(el => el.replace(/\s+/g, '') === String(usersAnswer).replace(/\s+/g, ''));
  }

}
