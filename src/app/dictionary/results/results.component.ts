import { Component, OnInit } from '@angular/core';
import { ResultService } from 'src/app/services/result.service';

@Component({
  selector: 'app-results',
  templateUrl: './results.component.html',
  styleUrls: ['./results.component.css']
})
export class ResultsComponent implements OnInit {

  constructor(
    private resultService: ResultService
  ) { }

  ngOnInit() {
    this.resultService.getSelectionQuizResult().subscribe(data => console.log(data));
  }

}
