<script lang="ts" setup>
import { useQuestionStore } from '~/stores/questions'

const questionStore = useQuestionStore()
const { currentQuestion } = storeToRefs(questionStore)

const colorMode = useColorMode()
const isDark = computed({
  get() {
    return colorMode.value === 'dark'
  },
  set(_isDark) {
    colorMode.preference = _isDark ? 'dark' : 'light'
  },
})

onMounted(() => {
  questionStore.initializeStore()
})
</script>

<template>
  <div class="h-full">
    <ClientOnly v-if="!colorMode?.forced">
      <UButton
        :icon="isDark ? 'i-lucide-moon' : 'i-lucide-sun'"
        class="absolute left-0"
        color="neutral"
        variant="ghost"
        @click="isDark = !isDark"
      />

      <template #fallback>
        <div class="size-8" />
      </template>
    </ClientOnly>

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
