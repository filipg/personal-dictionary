import { Component, OnInit, OnChanges } from '@angular/core';
import { DataService } from 'src/app/services/data.service';
import { Word } from 'src/app/interfaces/word.interface';

@Component({
  selector: 'app-words',
  templateUrl: './words.component.html',
  styleUrls: ['./words.component.css']
})
export class WordsComponent implements OnInit {

  words: Word[] = [];

  constructor(
    private dataService: DataService
  ) { }

  ngOnInit() {
    this.getWords();
    this.getNewWords();
  }

  private getWords() {
    this.dataService.getWords().subscribe(data => {
      this.words = data;
      console.log(this.words);
    });
  }

  private getNewWords() {
    this.dataService.subject.subscribe(data => this.getWords());
  }

  deleteWord(id: number | string, index: number) {
    this.dataService.deleteWord(id).subscribe(data => {
      this.words.splice(index, 1);
    }, error => {
      console.log(error);
    });
  }
}
