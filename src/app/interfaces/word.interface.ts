export interface Word {
    wordInEnglish: string;
    translation: string[];
    learned: boolean;
    description?: string;
    id?: number | string;
}
