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

export interface QuizResults {
    abcdQuizMode: boolean;
    items: SingleQuestionResult[];
}
