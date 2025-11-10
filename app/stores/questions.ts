import { Category, type Question } from '~/types/questions'
import { useStorage } from '@vueuse/core'
import { useQuestionParser } from '~/composables/parser'
import { defineStore } from 'pinia'

export const useQuestionStore = defineStore('questions', () => {
  /** === State === */
  const jsonData = useStorage<string>('questions', '')
  const usedQuestions = useStorage<string[]>('used-questions', [])
  const questions = ref<Question[]>([])
  const currentQuestion = ref<Question | null>(null)
  const categories = ref<Category[]>([Category.GENERAL])

  /** === Parser === */
  const { loadJsonData, parseJsonToQuestions, initializeFromExistingData } = useQuestionParser(jsonData, (parsed) => {
    questions.value = parsed
  })

  const initializeStore = () => {
    if (jsonData.value) {
      initializeFromExistingData()
    } else {
      loadJsonData()
    }

    currentQuestion.value = getRandomQuestion()
  }

  const randomizeQuestion = () => {
    currentQuestion.value = getRandomQuestion()
  }

  const getRandomQuestion = (): Question | null => {
    if (questions.value.length === 0) return null
    const availableQuestions = questions.value.filter((question) => !usedQuestions.value.includes(question.id))

    if (availableQuestions.length === 0) {
      usedQuestions.value = []
      return getRandomQuestion()
    }

    const filteredQuestion =
      categories.value.length > 0 && !categories.value.includes(Category.GENERAL)
        ? availableQuestions.filter((question) => categories.value.includes(question.category))
        : availableQuestions

    const randomIndex = Math.floor(Math.random() * filteredQuestion.length)
    const randomQuestion = filteredQuestion[randomIndex]

    if (!randomQuestion) return null

    usedQuestions.value.push(randomQuestion.id)

    return randomQuestion
  }

  const addCategoryFilter = (category: Category) => {
    if (category === Category.GENERAL) {
      categories.value = [Category.GENERAL]
      getRandomQuestion()
      return
    } else if (categories.value.includes(Category.GENERAL)) {
      categories.value = []
    }

    if (categories.value.includes(category)) {
      categories.value = categories.value.filter((cat) => cat !== category)
    } else {
      categories.value.push(category)
    }

    getRandomQuestion()
  }

  return {
    questions,
    currentQuestion,
    categories,

    addCategoryFilter,
    initializeStore,
    randomizeQuestion,
  }
})
