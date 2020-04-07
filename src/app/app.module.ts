import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AppMaterialModule } from './app-material/app-material.module';

import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { LayoutModule } from '@angular/cdk/layout';
import { NavComponent } from './nav/nav.component';
import { LoginComponent } from './auth/login/login.component';
import { RegisterComponent } from './auth/register/register.component';
import { ReactiveFormsModule } from '@angular/forms';
import { AuthInterceptorService } from './auth/auth-interceptor';
import { AddWordComponent } from './dictionary/add-word/add-word.component';
import { WordsComponent } from './dictionary/words/words.component';
import { TestYourselfComponent } from './dictionary/test-yourself/test-yourself.component';
import { ResultsComponent } from './dictionary/results/results.component';
import { SelectionQuizComponent } from './dictionary/test-yourself/selection-quiz/selection-quiz.component';
import { TranslationQuizComponent } from './dictionary/test-yourself/translation-quiz/translation-quiz.component';
import { QuizResultComponent } from './dictionary/test-yourself/quiz-result/quiz-result.component';

@NgModule({
  declarations: [
    AppComponent,
    NavComponent,
    LoginComponent,
    RegisterComponent,
    AddWordComponent,
    WordsComponent,
    TestYourselfComponent,
    ResultsComponent,
    SelectionQuizComponent,
    TranslationQuizComponent,
    QuizResultComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    AppMaterialModule,
    HttpClientModule,
    LayoutModule,
    ReactiveFormsModule
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthInterceptorService,
      multi: true
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
