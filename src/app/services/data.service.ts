import { Injectable } from '@angular/core';
import { Word } from '../interfaces/word.interface';
import { Observable, of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DataService {

  words: Word[] = [
    {id: 1, wordInEnglish: 'good', translation: ['dobrze', 'okej'], description: 'AAA'},
    {id: 2, wordInEnglish: 'super', translation: ['dobrze', 'okej'], description: 'AAA'},
    {id: 3, wordInEnglish: 'table', translation: ['stół'], description: 'AAA'},
    {id: 4, wordInEnglish: 'good', translation: ['dobrze', 'okej'], description: 'AAA'},
    {id: 5, wordInEnglish: 'good', translation: ['dobrze', 'okej'], description: 'AAA'},
    {id: 6, wordInEnglish: 'good', translation: ['dobrze', 'okej'], description: 'AAA'},
    {id: 7, wordInEnglish: 'good', translation: ['dobrze', 'okej'], description: 'AAA'},
  ];

  getWords(): Observable<Word[]> {
    return of(this.words);
  }

  saveWord(word: Word) {
    console.log(word);
  }
}
