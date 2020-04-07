import { Component, OnInit } from '@angular/core';
import { DataService } from 'src/app/services/data.service';
import { map, tap, switchMap } from 'rxjs/operators';
import { Word } from 'src/app/interfaces/word.interface';
import { QuizItem, AbcdQuizItem, QuizResults } from 'src/app/interfaces/quiz.interface';

@Component({
  selector: 'app-selection-quiz',
  templateUrl: './selection-quiz.component.html',
  styleUrls: ['./selection-quiz.component.css']
})
export class SelectionQuizComponent implements OnInit {

  selectedWords: Word[] = [];
  quizItems: AbcdQuizItem[] = [];
  results: any[];
  numberOfPossibleAnswers = 4; // abcd (4 possibilities) not abcdef (6 possibilities)
  loading = true;


  constructor(
    private dataService: DataService
  ) { }

  ngOnInit() {
    this.getWordsAndGenerateQuiz(5, 3, 2);
    this.results = new Array(5);
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
        console.log(this.quizItems);
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
    // api call to save results !!!
    const toEmit: QuizResults = {
      abcdQuizMode: true,
      items: this.results
    };
    console.log(toEmit);
    // this.words = [];
    // this.abcdQuiz = null;
    // this.selectedWords = [];
    // this.abcdQuizItems = [];
    // this.results = [];
    // this.emitResults.emit(toEmit);
  }

}
