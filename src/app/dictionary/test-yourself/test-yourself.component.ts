import { Component, OnInit } from '@angular/core';
import { DataService } from 'src/app/services/data.service';
import { Word } from 'src/app/interfaces/word.interface';
import { QuizResults } from 'src/app/interfaces/quiz.interface';
import { Router } from '@angular/router';

@Component({
  selector: 'app-test-yourself',
  templateUrl: './test-yourself.component.html',
  styleUrls: ['./test-yourself.component.css']
})
export class TestYourselfComponent implements OnInit {

  // selectionMode = true;
  enoughElements: boolean;
  // words: Word[] = [];
  isAbcdQuiz: boolean;
  loading = true;
  // displayResults: boolean;
  // quizResults: QuizResults;

  constructor(
    private dataService: DataService,
    private router: Router
  ) { }

  ngOnInit() {
    this.getWords();
  }

  private getWords() {
    this.dataService.getWords().subscribe(data => {
      // this.words = data;
      this.enoughElements = (data.length >= 10) ? true : false;
      this.loading = false;
    });
  }

  modeSelection(isAbcdQuiz: boolean) {
    // this.selectionMode = false;
    this.isAbcdQuiz = isAbcdQuiz;
    this.router.navigate([`${this.isAbcdQuiz ? 'selection-quiz' : 'translation-quiz'}`]);
    // this.displayResults = false;
  }

  // onResults(results: any) {
  //   this.quizResults = results;
  //   this.selectionMode = true;
  //   this.displayResults = true;
  //   this.getWords();
  //   console.log(results);
  // }

}
