import { Component, OnInit, Input } from '@angular/core';
import { Word } from 'src/app/interfaces/word.interface';

@Component({
  selector: 'app-quiz',
  templateUrl: './quiz.component.html',
  styleUrls: ['./quiz.component.css']
})
export class QuizComponent implements OnInit {

  @Input() words: Word[] = [];
  @Input() abcdQuiz: boolean;

  constructor() { }

  ngOnInit() {
    console.log(this.words);
    console.log(this.abcdQuiz);
  }

}
