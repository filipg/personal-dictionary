import { Injectable } from '@angular/core';
import { Word } from '../interfaces/word.interface';
import { HttpClient } from '@angular/common/http';
import { AuthService } from './auth.service';
import { switchMap, take, map, tap } from 'rxjs/operators';
import { Observable, Subject, of, BehaviorSubject } from 'rxjs';
import { QuizItem, SingleQuestionResult, SingleTranslationQuestionResult } from '../interfaces/quiz.interface';

@Injectable({
  providedIn: 'root'
})
export class DataService {

  subject = new Subject<boolean>();
  selectionResultSubject = new BehaviorSubject<SingleQuestionResult[]>(null);
  translationResultSubject = new BehaviorSubject<SingleTranslationQuestionResult[]>(null);

  // to change
  polishWords = ["dobrze", "stół", "krzesło", "tablet", "kubek", "długopis", "pióro", 'okej', 'jest'];


  constructor(
    private http: HttpClient,
    private authService: AuthService
  ) {}

  getWords(): Observable<any> {
    return this.authService.user.pipe(
      take(1),
      switchMap(user => this.http.get(`https://hopeful-theorem-196709.firebaseio.com/${user.id}/dictionary.json`)),
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

  saveWord(word: Word) {
    return this.authService.user.pipe(
      take(1),
      switchMap(user => this.http.post(`https://hopeful-theorem-196709.firebaseio.com/${user.id}/dictionary.json`, word)),
      tap(() => this.subject.next(true))
    );
  }

  deleteWord(id: number | string) {
    return this.authService.user.pipe(
      take(1),
      switchMap(user => this.http.delete(`https://hopeful-theorem-196709.firebaseio.com/${user.id}/dictionary/${id}.json`))
    );
  }

  getRandomEnglishWords(numberOfWords: number) {
    return this.http.get(`https://api.allorigins.win/raw?url=https://random-word-api.herokuapp.com/word?number=${numberOfWords * 3}`)
      .pipe(
        map((data: string[]) => data.map(el => {
          return {
            name: el,
            correctAnswer: false
          };
        }))
      );
  }

  getPolishWords(size: number = 2): Observable<QuizItem[]> {
    return of(this.polishWords).pipe(
      map(words => words.sort(() => 0.5 - Math.random()).slice(0, size * 3)),
      map((data: string[]) => data.map(el => {
        return {
          name: el,
          correctAnswer: false
        };
      })),
    );
  }
}
