import { Component, OnInit } from '@angular/core';
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
  }

  private getWords() {
    this.dataService.getWords().subscribe(data => console.log(data));
  }

}
