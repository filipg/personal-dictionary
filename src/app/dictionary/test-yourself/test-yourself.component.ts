import { Component, OnInit } from '@angular/core';
import { DataService } from 'src/app/services/data.service';
import { Word } from 'src/app/interfaces/word.interface';
import { QuizResults } from 'src/app/interfaces/quiz.interface';

@Component({
  selector: 'app-test-yourself',
  templateUrl: './test-yourself.component.html',
  styleUrls: ['./test-yourself.component.css']
})
export class TestYourselfComponent implements OnInit {

  selectionMode = true;
  enoughElements: boolean;
  words: Word[] = [];
  isAbcdQuiz: boolean;
  displayResults: boolean;
  quizResults: QuizResults;

  constructor(
    private dataService: DataService
  ) { }

  ngOnInit() {
    this.getWords();
  }

  private getWords() {
    this.dataService.getWords().subscribe(data => {
      this.words = data;
      this.enoughElements = (this.words.length >= 10) ? true : false;
    });
  }

  modeSelection(abcdQuiz: boolean) {
    this.selectionMode = false;
    this.isAbcdQuiz = abcdQuiz;
    this.displayResults = false;
  }

  onResults(results: any) {
    this.quizResults = results;
    this.selectionMode = true;
    this.displayResults = true;
    this.getWords();
    console.log(results);
  }

}
