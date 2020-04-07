import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './auth/login/login.component';
import { RegisterComponent } from './auth/register/register.component';
import { AuthGuard } from './auth/auth.guard';
import { AddWordComponent } from './dictionary/add-word/add-word.component';
import { WordsComponent } from './dictionary/words/words.component';
import { TestYourselfComponent } from './dictionary/test-yourself/test-yourself.component';
import { ResultsComponent } from './dictionary/results/results.component';
import { SelectionQuizComponent } from './dictionary/test-yourself/selection-quiz/selection-quiz.component';
import { TranslationQuizComponent } from './dictionary/test-yourself/translation-quiz/translation-quiz.component';
import { QuizResultComponent } from './dictionary/test-yourself/quiz-result/quiz-result.component';


const routes: Routes = [
  {path: 'login', component: LoginComponent},
  {path: 'register', component: RegisterComponent},
  {path: 'add-word', component: AddWordComponent, canActivate: [AuthGuard]},
  {path: 'words', component: WordsComponent, canActivate: [AuthGuard]},
  {path: 'test-yourself', component: TestYourselfComponent, canActivate: [AuthGuard]},
  {path: 'selection-quiz', component: SelectionQuizComponent, canActivate: [AuthGuard]},
  {path: 'translation-quiz', component: TranslationQuizComponent, canActivate: [AuthGuard]},
  {path: 'quiz-result', component: QuizResultComponent, canActivate: [AuthGuard]},
  {path: 'results', component: ResultsComponent, canActivate: [AuthGuard]},
  {path: '**', pathMatch: 'full', redirectTo: 'words'},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
