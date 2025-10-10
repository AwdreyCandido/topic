export interface Flashcard {
  id: number;
  question: string;
  answer: string;
  deckId: number;
  tags: number[];
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

export interface Tag {
  id: number;
  name: string;
  color: string;
}


/* :::::::::::::::::::::::::::::::::::::::: */

export type Attribute = {
  type: "bold" | "italic" | "strike" | string;
};

export type Content = {
  type: "text" | string;
  element?: string;
  text: string;
  style: string;
  attributes: Attribute[];
};

export type Block = {
  id: number;
  type: "paragraph" | string;
  element: string;
  position: number;
  content: Content[];
};
