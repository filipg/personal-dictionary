import { Component, OnInit } from '@angular/core';
import { DataService } from 'src/app/services/data.service';
import { map, tap } from 'rxjs/operators';
import { TranslationQuizItem, TranslationQuizResult, SingleTranslationQuestionResult } from 'src/app/interfaces/quiz.interface';
import { Word } from 'src/app/interfaces/word.interface';
import { FormGroup, FormBuilder, FormArray } from '@angular/forms';
import { Router } from '@angular/router';
import { ResultService } from 'src/app/services/result.service';

@Component({
  selector: 'app-translation-quiz',
  templateUrl: './translation-quiz.component.html',
  styleUrls: ['./translation-quiz.component.css']
})
export class TranslationQuizComponent implements OnInit {

  quizItems: TranslationQuizItem[] = [];
  form: FormGroup;
  items: FormArray;
  quizResult: TranslationQuizResult;
  loading = true;

  constructor(
    private dataService: DataService,
    private fb: FormBuilder,
    private router: Router,
    private resultService: ResultService
  ) { }

  ngOnInit() {
    this.getWordsAndGenerateQuiz(5, 3, 2);
  }

  private getWordsAndGenerateQuiz(quizSize: number, questionsInEnglish: number, questionsInPolish: number) {
    this.dataService.getWords().pipe(
      map(words => words.sort(() => 0.5 - Math.random()).slice(0, quizSize)),
      tap(randomWords => {
        this.createQuizItems(randomWords, questionsInEnglish, true);
        this.createQuizItems(randomWords, questionsInPolish, false);
      })
    ).subscribe(() => {
      this.createForm();
    });
  }

  private createQuizItems(randomWords: Word[], limit: number, englishMode: boolean) {
    const items: TranslationQuizItem[] = randomWords.splice(0, limit).map(el => {
      return {
        question: englishMode ? el.wordInEnglish : el.translation[0],
        options: englishMode ? el.translation : [el.wordInEnglish]
      };
    });
    this.quizItems.push(...items);
  }

  private createForm() {
    this.form = this.fb.group({
      items: this.fb.array([])
    });
    this.quizItems.forEach(() => this.addItem());
    this.loading = false;
    console.log(this.form.value);
    console.log(this.quizItems);
  }

  private addItem(): void {
    this.items = this.form.get('items') as FormArray;
    this.items.push(this.createItem());
  }

  private createItem(): FormGroup {
    return this.fb.group({
      name: '',
    });
  }

  onSubmit() {
    const items: SingleTranslationQuestionResult[] = this.quizItems.map((el, index) => {
      return {
        question: el.question,
        options: this.removePolishSigns(el.options, true),
        usersAnswer: this.removePolishSigns(this.form.value.items[index].name, false)
      };
    });
    this.quizResult = {
      abcdQuizMode: false,
      items
    };
    this.resultService.saveTranslationQuizResult(this.quizResult).subscribe(() => {
      this.dataService.translationResultSubject.next(this.quizResult);
      this.router.navigate(['translation-result']);
    });
  }

  private removePolishSigns(items: string | string[], isArray: boolean): string | string[] {
    return isArray ? Array.from(items).map(el => el.normalize('NFD').replace(/[\u0300-\u036f]/g, ''))
     : String(items).normalize('NFD').replace(/[\u0300-\u036f]/g, '');
  }

}
