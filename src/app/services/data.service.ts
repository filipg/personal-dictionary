import { Injectable } from '@angular/core';
import { Word } from '../interfaces/word.interface';
import { HttpClient } from '@angular/common/http';
import { AuthService } from './auth.service';
import { switchMap, take, map } from 'rxjs/operators';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DataService {

  constructor(
    private http: HttpClient,
    private authService: AuthService
  ) {}

  // words: Word[] = [
  //   {id: 1, wordInEnglish: 'good', translation: ['dobrze', 'okej'], description: 'AAA'},
  //   {id: 2, wordInEnglish: 'super', translation: ['dobrze', 'okej'], description: 'AAA'},
  //   {id: 3, wordInEnglish: 'table', translation: ['stół'], description: 'AAA'},
  //   {id: 4, wordInEnglish: 'good', translation: ['dobrze', 'okej'], description: 'AAA'},
  //   {id: 5, wordInEnglish: 'good', translation: ['dobrze', 'okej'], description: 'AAA'},
  //   {id: 6, wordInEnglish: 'good', translation: ['dobrze', 'okej'], description: 'AAA'},
  //   {id: 7, wordInEnglish: 'good', translation: ['dobrze', 'okej'], description: 'AAA'},
  // ];

  getWords(): Observable<any> {
    return this.authService.user.pipe(
      take(1),
      switchMap(user => this.http.get(`https://hopeful-theorem-196709.firebaseio.com/${user.id}.json`)),
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
      switchMap(user => this.http.post(`https://hopeful-theorem-196709.firebaseio.com/${user.id}.json`, word))
    );
  }
}
