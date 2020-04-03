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
  pageIndex = 0;
  pageSize = 15;
  lowValue = 0;
  highValue = 15;

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

  getPaginatorData(event) {
    console.log(event);
    if (event.pageIndex === this.pageIndex + 1) {
       this.lowValue = this.lowValue + this.pageSize;
       this.highValue =  this.highValue + this.pageSize;
      }
   else if (event.pageIndex === this.pageIndex - 1) {
      this.lowValue = this.lowValue - this.pageSize;
      this.highValue =  this.highValue - this.pageSize;
     }
    this.pageIndex = event.pageIndex;
  }
}
