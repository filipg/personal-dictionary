import { Component, OnInit } from '@angular/core';
import { DataService } from 'src/app/services/data.service';
import { Word } from 'src/app/interfaces/word.interface';


@Component({
  selector: 'app-words',
  templateUrl: './words.component.html',
  styleUrls: ['./words.component.scss']
})
export class WordsComponent implements OnInit {

  words: Word[] = [];
  pageIndex = 0;
  pageSize = 15;
  lowValue = 0;
  highValue = 15;
  loading = true;

  constructor(
    private dataService: DataService,
  ) { }

  ngOnInit() {
    this.getWords();
  }

  private getWords() {
    this.dataService.getWords().subscribe(data => {
      this.words = data;
      this.loading = false;
    });
  }

  deleteWord(id: number | string, index: number) {
    this.dataService.deleteWord(id).subscribe(data => {
      this.words.splice(index, 1);
    }, error => {
      console.log(error);
    });
  }

  getPaginatorData(event) {
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
