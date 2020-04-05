import { Component, OnInit } from '@angular/core';
import { DataService } from 'src/app/services/data.service';
import { Word } from 'src/app/interfaces/word.interface';

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
  }

}
