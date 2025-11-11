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
  src?: string
}

export const QUESTION_CATEGORIES: QuestionCategory[] = [
  { category: Category.GENERAL, name: 'Général', src: 'grainy-bg-09.jpg' },
  { category: Category.DUMB, name: 'Questions débiles', src: 'grainy-bg-01.jpg' },
  { category: Category.PSYCHOLOGY, name: 'Psychologie', src: 'grainy-bg-03.jpg' },
  { category: Category.PHILOSOPHY, name: 'Philosophie', src: 'grainy-bg-06.jpg' },
]
