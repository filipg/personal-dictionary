import { Component, OnInit, Input } from '@angular/core';
import { Word } from 'src/app/interfaces/word.interface';
import { DataService } from 'src/app/services/data.service';
import { map, tap, switchMap } from 'rxjs/operators';
import { QuizItem, AbcdQuizItem } from 'src/app/interfaces/quiz.interface';

@Component({
  selector: 'app-quiz',
  templateUrl: './quiz.component.html',
  styleUrls: ['./quiz.component.css']
})
export class QuizComponent implements OnInit {

  @Input() words: Word[] = [];
  @Input() abcdQuiz: boolean;
  selectedWords: Word[] = [];
  abcdQuizItems: AbcdQuizItem[] = [];
  numberOfPossibleAnswers = 4; // abcd (4 possibilities) not abcdef (6 possibilities)

  constructor(
    private dataService: DataService
  ) { }

  ngOnInit() {
    this.chooseQuizWords(5, 3, 2);
  }

  private chooseQuizWords(quizSize: number, questionsInEnglish: number, questionsInPolish: number) {
    this.selectedWords = this.words.sort(() => 0.5 - Math.random()).slice(0, quizSize);

    if (this.abcdQuiz) {
      this.createAbcdQuiz(questionsInEnglish, questionsInPolish);
    } else {
      this.createTranslationQuiz();
    }
  }

  private createAbcdQuiz(questionsInEnglish: number, questionsInPolish: number) {
    this.dataService.getRandomEnglishWords(questionsInEnglish)
      .pipe(
        tap(englishWords => this.createQuizItems(englishWords, questionsInEnglish, true)),
        switchMap(() => this.dataService.getPolishWords(questionsInPolish)),
        tap(polishWords => this.createQuizItems(polishWords, questionsInPolish, false))
      ).subscribe(() => {
        console.log(this.abcdQuizItems);
      });
  }

  private createTranslationQuiz() {
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
    this.abcdQuizItems.push(...quizQuestions);
  }

}
