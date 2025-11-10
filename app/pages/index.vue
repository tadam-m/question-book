<script lang="ts" setup>
import { useQuestionStore } from '~/stores/questions'
import type { Category } from '~/types/questions'

const questionStore = useQuestionStore()
const { currentQuestion, categories } = storeToRefs(questionStore)

const colorMode = useColorMode()
const isDark = computed({
  get() {
    return colorMode.value === 'dark'
  },
  set(_isDark) {
    colorMode.preference = _isDark ? 'dark' : 'light'
  },
})

const selectCategory = (category: Category) => {
  questionStore.addCategoryFilter(category)
}

onMounted(() => {
  questionStore.initializeStore()
})
</script>

<template>
  <div class="h-full max-h-screen flex flex-col">
    <div class="w-full flex justify-between items-center gap-4 p-4">
      <ClientOnly v-if="!colorMode?.forced">
        <UButton
          :icon="isDark ? 'i-lucide-moon' : 'i-lucide-sun'"
          color="neutral"
          variant="ghost"
          @click="isDark = !isDark"
        />

        <template #fallback>
          <div class="size-8" />
        </template>
      </ClientOnly>

      <UDrawer :overlay="false" placement="right">
        <UButton class="text-center" color="neutral" label="Styles" size="xl" variant="ghost" />
        <template #content>
          <div class="h-48 m-4">
            <CategoryPicker :selected-categories="categories" @select="selectCategory" />
          </div>
        </template>
      </UDrawer>
    </div>

    <UContainer class="grow h-full flex flex-col gap-32 justify-center items-center">
      <transition mode="out-in" name="fade">
        <p :key="currentQuestion?.id" class="text-xl text-center">
          {{ currentQuestion?.content }}
        </p>
      </transition>

      <UButton color="neutral" size="xl" variant="soft" @click="questionStore.randomizeQuestion()"> Random </UButton>
    </UContainer>
  </div>
</template>

<style scoped>
.fade-enter-active,
.fade-leave-active {
  transition: all 0.3s ease;
}

.fade-enter-from {
  opacity: 0;
  transform: translateY(10px);
}

.fade-leave-to {
  opacity: 0;
  transform: translateY(-10px);
}
</style>
