import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AddWordComponent } from './add-word/add-word.component';
import { WordsComponent } from './words/words.component';
import { TestYourselfComponent } from './test-yourself/test-yourself.component';
import { SelectionQuizComponent } from './test-yourself/selection-quiz/selection-quiz.component';
import { ResultsComponent } from './results/results.component';
import { TranslationQuizComponent } from './test-yourself/translation-quiz/translation-quiz.component';
import { SelectionResultComponent } from './test-yourself/selection-quiz/selection-result/selection-result.component';
import { TranslationResultComponent } from './test-yourself/translation-quiz/translation-result/translation-result.component';
import { SharedModule } from '../shared/shared.module';


@NgModule({
  declarations: [
    AddWordComponent,
    WordsComponent,
    TestYourselfComponent,
    ResultsComponent,
    SelectionQuizComponent,
    TranslationQuizComponent,
    SelectionResultComponent,
    TranslationResultComponent
  ],
  imports: [
    CommonModule,
    SharedModule
  ]
})
export class DictionaryModule { }
