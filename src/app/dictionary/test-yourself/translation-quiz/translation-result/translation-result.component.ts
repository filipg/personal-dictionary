import { Component, OnInit } from '@angular/core';
import { DataService } from 'src/app/services/data.service';
import { TranslationQuizResult } from 'src/app/interfaces/quiz.interface';

@Component({
  selector: 'app-translation-result',
  templateUrl: './translation-result.component.html',
  styleUrls: ['./translation-result.component.css']
})
export class TranslationResultComponent implements OnInit {

  translationQuizResult: TranslationQuizResult;

  constructor(
    private dataService: DataService
  ) { }

  ngOnInit() {
    this.getResult();
  }

  private getResult() {
    this.dataService.translationResultSubject.subscribe(data => {
      this.translationQuizResult = data;
      console.log(this.translationQuizResult);
    });
  }

}
