import { Injectable } from '@angular/core';
import { Word } from '../interfaces/word.interface';
import { HttpClient } from '@angular/common/http';
import { AuthService } from './auth.service';
import { switchMap, take, map, tap } from 'rxjs/operators';
import { Observable, Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DataService {

  subject = new Subject<boolean>();

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
    return this.http.get(`https://api.allorigins.win/raw?url=https://random-word-api.herokuapp.com/word?number=${numberOfWords*3}`)
      .pipe(
        map((data: string[]) => data.map(el => {
          return {
            name: el,
            correctAnswer: false
          };
        }))
      );
  }
}
