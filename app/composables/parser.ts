import type { Ref } from 'vue'
import type { Question } from '~/types/questions'
import defaultJson from '@/assets/data/questions.json'

export function useQuestionParser(jsonData: Ref<string>, onParsed?: (questions: Question[]) => void) {
  const parseJsonToQuestions = (jsonString?: string): Question[] => {
    const dataToParse = jsonString || jsonData.value

    if (!dataToParse) return []

    try {
      const parsed: Question[] = JSON.parse(dataToParse)
      onParsed?.(parsed)
      return parsed
    } catch (e) {
      console.warn('Error while parsing json:', e)
      return []
    }
  }

  const loadJsonData = (): Question[] => {
    jsonData.value = JSON.stringify(defaultJson)
    return parseJsonToQuestions(jsonData.value)
  }

  // Parse automatiquement les données existantes au chargement
  const initializeFromExistingData = (): Question[] => {
    if (jsonData.value) {
      return parseJsonToQuestions()
    }
    return []
  }

  return {
    parseJsonToQuestions,
    loadJsonData,
    initializeFromExistingData,
  }
}
