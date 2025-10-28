import type { Question } from '~/types/questions'
import { useStorage } from '@vueuse/core'
import { useQuestionParser } from '~/composables/parser'
import { defineStore } from 'pinia'

export const useQuestionStore = defineStore('questions', () => {
  /** === State === */
  const jsonData = useStorage<string>('questions', '')
  const usedQuestions = useStorage<string[]>('used-questions', [])
  const questions = ref<Question[]>([])
  const currentQuestion = ref<Question | null>(null)

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

    const randomIndex = Math.floor(Math.random() * availableQuestions.length)
    const randomQuestion = availableQuestions[randomIndex]

    if (!randomQuestion) return null

    usedQuestions.value.push(randomQuestion.id)

    return randomQuestion
  }
  return {
    questions,
    currentQuestion,

    initializeStore,
    randomizeQuestion,
  }
})
