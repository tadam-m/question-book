<script lang="ts" setup>
import { type Category, QUESTION_CATEGORIES } from '~/types/questions'

const props = defineProps<{
  selectedCategories: Category[]
}>()

defineEmits(['select'])

const isCategorySelected = (category: Category) => {
  return props.selectedCategories.some((selectedCat) => selectedCat.toString() === category)
}
</script>

<template>
  <div class="h-full flex flex-row gap-8 items-center overflow-x-auto px-2">
    <UCard
      v-for="category in QUESTION_CATEGORIES"
      :key="category.name"
      :class="{
        'outline-2 outline-primary outline': isCategorySelected(category.category),
      }"
      :ui="{ body: 'p-0 sm:p-0' }"
      class="cursor-pointer min-w-48 transition-all duration-200"
      @click="$emit('select', category.category)"
    >
      <div class="h-24 w-full bg-black"></div>
      <template #footer>
        <div class="h-8">
          <p class="text-md text-black dark:text-white">{{ category.name }}</p>
        </div>
      </template>
    </UCard>
  </div>
</template>
