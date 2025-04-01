export interface Flashcard {
  id: number;
  question: string;
  answer: string;
  deckId: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface Topic {
  id: number;
  name: string;
  description?: string;
  flashcards: Flashcard[];
  createdAt: Date;
  updatedAt: Date;
}