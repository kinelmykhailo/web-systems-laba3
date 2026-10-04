<script setup lang="ts">
import { computed, ref } from 'vue'
import type { User } from '@/types/user'

const props = defineProps<{ user: User }>()

const isDetailsVisible = ref(false)
const age = computed(() => props.user.dob.age)
const fullName = computed(() => `${props.user.name.first} ${props.user.name.last}`)

const ageClasses = computed(() => ({
  'user-card--minor': age.value < 18,
  'user-card--young': age.value >= 18 && age.value <= 30,
  'user-card--adult': age.value >= 31 && age.value <= 50,
  'user-card--senior': age.value > 50,
}))
</script>

<template>
  <article
    class="user-card"
    :class="ageClasses"
  >
    <img
      class="user-card__photo"
      :src="user.picture"
      :alt="`Фото: ${fullName}`"
      width="120"
      height="120"
    >
    <h2 class="user-card__name">
      {{ user.name.title }} {{ fullName }}
    </h2>

    <ul class="user-card__info">
      <li><strong>Стать:</strong> {{ user.gender === 'male' ? 'чоловік' : 'жінка' }}</li>
      <li v-if="age >= 18">
        <strong>Вік:</strong> {{ age }}
      </li>
      <li><strong>Локація:</strong> {{ user.location.city }}, {{ user.location.state }}, {{ user.location.country }}</li>
      <li><strong>Email:</strong> {{ user.email }}</li>
      <li><strong>Телефон:</strong> {{ user.phone }}</li>
    </ul>

    <div>
      <strong>Хобі:</strong>
      <ul class="user-card__hobbies">
        <li
          v-for="hobby in user.hobbies"
          :key="hobby"
        >
          {{ hobby }}
        </li>
      </ul>
    </div>

    <button
      type="button"
      @click="isDetailsVisible = !isDetailsVisible"
    >
      {{ isDetailsVisible ? 'Приховати деталі' : 'Показати деталі' }}
    </button>
    <p v-show="isDetailsVisible">
      {{ user.details }}
    </p>
  </article>
</template>

<style scoped>
.user-card {
  display: flex;
  flex-direction: column;
  gap: 10px;
  padding: 20px;
  border: 2px solid transparent;
  border-radius: 12px;
  background: #fff;
  box-shadow: 0 2px 8px rgb(0 0 0 / 8%);
}
.user-card--minor { background: #e0f2fe; border-color: #38bdf8; }
.user-card--young { background: #dcfce7; border-color: #4ade80; }
.user-card--adult { background: #fef9c3; border-color: #facc15; }
.user-card--senior { background: #fee2e2; border-color: #f87171; }

.user-card__photo { align-self: center; border-radius: 50%; object-fit: cover; }
.user-card__name { margin: 0; font-size: 1.15rem; text-align: center; }
.user-card__info { margin: 0; padding: 0; list-style: none; font-size: 0.92rem; word-break: break-word; }
.user-card__hobbies { display: flex; flex-wrap: wrap; gap: 6px; margin: 6px 0 0; padding: 0; list-style: none; }
.user-card__hobbies li { padding: 2px 10px; border-radius: 999px; background: rgb(0 0 0 / 8%); font-size: 0.85rem; }
</style>