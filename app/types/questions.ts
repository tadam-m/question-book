export interface Question {
  id: string
  content: string
  category: Category
}

export enum Category {
  DUMB = 'dumb',
  PSYCHOLOGY = 'psychology',
  PHILOSOPHY = 'philosophy',
  GENERAL = 'general',
}

export interface QuestionCategory {
  category: Category
  name: string
}

export const QUESTION_CATEGORIES: QuestionCategory[] = [
  { category: Category.DUMB, name: 'Questions débiles' },
  { category: Category.PSYCHOLOGY, name: 'Psychologie' },
  { category: Category.PHILOSOPHY, name: 'Philosophie' },
  { category: Category.GENERAL, name: 'Général' },
]
