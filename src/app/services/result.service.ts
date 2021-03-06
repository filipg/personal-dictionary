import { Injectable } from '@angular/core';
import { AuthService } from './auth.service';
import { HttpClient } from '@angular/common/http';
import { take, switchMap, map } from 'rxjs/operators';
import { QuizResult } from '../interfaces/quiz.interface';

@Injectable({
  providedIn: 'root'
})
export class ResultService {

  constructor(
    private authService: AuthService,
    private http: HttpClient
  ) { }


  saveOverallResult(resultToSave: QuizResult) {
    return this.authService.user.pipe(
      take(1),
      switchMap(user => this.http.post(`https://hopeful-theorem-196709.firebaseio.com/${user.id}/overallresult.json`, resultToSave)),
    );
  }

  getOverallResult() {
    return this.authService.user.pipe(
      take(1),
      switchMap(user => this.http.get(`https://hopeful-theorem-196709.firebaseio.com/${user.id}/overallresult.json`)),
      map(responseData => this.handleFirebaseConvertion(responseData))
    );
  }

  private handleFirebaseConvertion(responseData: any): any {
    const convertedData = [];
    for (const key in responseData) {
      if (responseData.hasOwnProperty(key)) {
        // convertedData.push({...responseData[key], id: key});
        convertedData.push({...responseData[key]});
      }
    }
    return convertedData;
  }
}
