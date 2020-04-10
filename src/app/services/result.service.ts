import { Injectable } from '@angular/core';
import { AuthService } from './auth.service';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { take, switchMap, tap, map } from 'rxjs/operators';
import { QuizResult } from '../interfaces/quiz.interface';

@Injectable({
  providedIn: 'root'
})
export class ResultService {

  constructor(
    private authService: AuthService,
    private http: HttpClient
  ) { }

  saveSelectionQuizResult(result: QuizResult) {
    return this.authService.user.pipe(
      take(1),
      switchMap(user => this.http.post(`https://hopeful-theorem-196709.firebaseio.com/${user.id}/result.json`, result)),
    );
  }

  getSelectionQuizResult(): Observable<any> {
    return this.authService.user.pipe(
      take(1),
      switchMap(user => this.http.get(`https://hopeful-theorem-196709.firebaseio.com/${user.id}/result.json`)),
      map(responseData => {
        const convertedData = [];
        for (const key in responseData) {
          if (responseData.hasOwnProperty(key)) {
            convertedData.push({...responseData[key], id: key});
          }
        }
        return convertedData;
      })
    );
  }
}
