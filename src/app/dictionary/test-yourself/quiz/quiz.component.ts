import { Component, OnInit, Input } from '@angular/core';
import { Word } from 'src/app/interfaces/word.interface';
import { DataService } from 'src/app/services/data.service';

@Component({
  selector: 'app-quiz',
  templateUrl: './quiz.component.html',
  styleUrls: ['./quiz.component.css']
})
export class QuizComponent implements OnInit {

  @Input() words: Word[] = [];
  @Input() abcdQuiz: boolean;
  selectedWords: Word[] = [];

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
    this.dataService.getRandomEnglishWords(questionsInEnglish).subscribe(data => console.log(data));
  }

  private createTranslationQuiz() {

  }

}
