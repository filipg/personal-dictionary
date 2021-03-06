import { Component, OnInit } from '@angular/core';
import { DataService } from 'src/app/services/data.service';
import { map, tap, switchMap } from 'rxjs/operators';
import { Word } from 'src/app/interfaces/word.interface';
import { QuizItem, AbcdQuizItem, SingleQuestionResult } from 'src/app/interfaces/quiz.interface';
import { Router } from '@angular/router';

@Component({
  selector: 'app-selection-quiz',
  templateUrl: './selection-quiz.component.html',
  styleUrls: ['./selection-quiz.component.scss']
})
export class SelectionQuizComponent implements OnInit {

  selectedWords: Word[] = [];
  quizItems: AbcdQuizItem[] = [];
  results: SingleQuestionResult[];
  numberOfPossibleAnswers = 4; // abcd (4 possibilities) not abcdef (6 possibilities)
  loading = true;


  constructor(
    private dataService: DataService,
    private router: Router,
  ) { }

  ngOnInit() {
    this.getWordsAndGenerateQuiz(5, 3, 2);
    this.results = new Array(5).fill(undefined);
  }

  private getWordsAndGenerateQuiz(quizSize: number, questionsInEnglish: number, questionsInPolish: number) {
    this.dataService.getWords().pipe(
      map(words => words.sort(() => 0.5 - Math.random()).slice(0, quizSize)),
    ).subscribe(data => {
      this.selectedWords = data;
      this.createQuiz(questionsInEnglish, questionsInPolish);
    });
  }

  private createQuiz(questionsInEnglish: number, questionsInPolish: number) {
    this.dataService.getRandomEnglishWords(questionsInEnglish)
      .pipe(
        tap(englishWords => this.createQuizItems(englishWords, questionsInEnglish, true)),
        switchMap(() => this.dataService.getPolishWords(questionsInPolish)),
        tap(polishWords => this.createQuizItems(polishWords, questionsInPolish, false))
      ).subscribe(() => {
        this.loading = false;
      });
  }

  private createQuizItems(randomWords: QuizItem[], limit: number, englishMode: boolean) {
    const wordsToAdd = this.selectedWords.splice(0, limit);
    const quizQuestions = wordsToAdd.map(el => {
      const randomAnswers = randomWords.splice(0, this.numberOfPossibleAnswers - 1);
      const allAnswers: QuizItem[] = [...randomAnswers, {name: englishMode ? el.wordInEnglish : el.translation[0], correctAnswer: true}];
      allAnswers.sort(() => 0.5 - Math.random());
      return {
        question: englishMode ? el.translation[0] : el.wordInEnglish,
        options: allAnswers
      };
    });
    this.quizItems.push(...quizQuestions);
  }

  onSelect(quizItem: AbcdQuizItem, selectedOption: QuizItem, index: number) {
    this.results[index] = {
      question: quizItem,
      usersAnswer: selectedOption
    };
  }

  submitQuiz() {
    // const wordsToPractise = this.results.filter(e => !e.usersAnswer.correctAnswer).map(el => {
    //     return {
    //       question: el.question.question,
    //       correct: el.question.options.find(option => option.correctAnswer).name
    //     };
    // });
    // console.log(wordsToPractise);
    this.dataService.selectionResultSubject.next(this.results);
    this.router.navigate(['selection-result']);
  }

  disableButton(): boolean {
    return this.results.every(el => el !== undefined);
  }

}
