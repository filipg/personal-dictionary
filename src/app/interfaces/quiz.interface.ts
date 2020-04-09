export interface AbcdQuizItem {
    question: string;
    options: QuizItem[];
}

export interface QuizItem {
    name: string;
    correctAnswer: boolean;
}

export interface SingleQuestionResult {
    question: AbcdQuizItem;
    usersAnswer: QuizItem;
}

export interface QuizResult {
    abcdQuizMode: boolean;
    items: SingleQuestionResult[];
}

export interface TranslationQuizItem {
    question: string;
    options: string[];
}

export interface TranslationQuizResult {
    abcdQuizMode: boolean;
    items: SingleTranslationQuestionResult[];
}

export interface SingleTranslationQuestionResult {
    question: string;
    options: string | string[];
    usersAnswer: string | string[];
}
