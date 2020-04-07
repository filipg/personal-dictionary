import { Component, OnInit } from '@angular/core';
import { DataService } from 'src/app/services/data.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-test-yourself',
  templateUrl: './test-yourself.component.html',
  styleUrls: ['./test-yourself.component.css']
})
export class TestYourselfComponent implements OnInit {

  enoughElements: boolean;
  isAbcdQuiz: boolean;
  loading = true;

  constructor(
    private dataService: DataService,
    private router: Router
  ) { }

  ngOnInit() {
    this.getWords();
  }

  private getWords() {
    this.dataService.getWords().subscribe(data => {
      this.enoughElements = (data.length >= 10) ? true : false;
      this.loading = false;
    });
  }

  modeSelection(isAbcdQuiz: boolean) {
    this.isAbcdQuiz = isAbcdQuiz;
    this.router.navigate([`${this.isAbcdQuiz ? 'selection-quiz' : 'translation-quiz'}`]);
  }

}
