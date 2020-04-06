export interface AbcdQuizItem {
    question: string;
    options: QuizItem[];
}

export interface QuizItem {
    name: string;
    correctAnswer: boolean;
}

export interface QuizResults {
    abcdQuizMode: boolean;
    items: AbcdQuizItem[];
}
