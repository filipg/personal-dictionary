export interface AbcdQuizItem {
    question: string;
    options: {
        name: string;
        correctAnswer: boolean;
    }[];
}
