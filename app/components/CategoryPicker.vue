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
    <div
      v-for="category in QUESTION_CATEGORIES"
      :key="category.name"
      :class="{
        'outline-2': isCategorySelected(category.category),
      }"
      class="rounded-md overflow-hidden shadow-xl relative min-w-[200px]"
      @click="$emit('select', category.category)"
    >
      <NuxtImg
        :src="`/images/${category.src}`"
        alt="Background image"
        loading="lazy"
        sizes="sm:200px md:220px lg:220px"
      />
      <div
        class="absolute top-1/2 left-1/2 -translate-1/2 rounded-full w-3/4 h-3/4 flex items-center justify-center p-2"
      >
        <p class="text-center text-lg font-bold">{{ category.name }}</p>
      </div>
    </div>
  </div>
</template>
