<script setup lang="ts">
import { computed, ref } from 'vue'
import usersData from '@/data/user.json'
import UserCard from '@/components/UserCard.vue'
import type { AgeFilter, GenderFilter, SortOption, User } from '@/types/user'

const users = ref<User[]>(usersData as User[])

const genderFilter = ref<GenderFilter>('all')
const ageFilter = ref<AgeFilter>('all')
const sortOption = ref<SortOption>('none')

const genderButtons: { value: GenderFilter; label: string }[] = [
  { value: 'all', label: 'Всі' },
  { value: 'male', label: 'Чоловіки' },
  { value: 'female', label: 'Жінки' },
]
const ageButtons: { value: AgeFilter; label: string }[] = [
  { value: 'all', label: 'Всі' },
  { value: 'adult', label: '18 +' },
]
const sortButtons: { value: SortOption; label: string }[] = [
  { value: 'name-asc', label: 'Ім’я ↑' },
  { value: 'name-desc', label: 'Ім’я ↓' },
  { value: 'age-asc', label: 'Вік ↑' },
  { value: 'age-desc', label: 'Вік ↓' },
]

const fullName = (u: User): string => `${u.name.first} ${u.name.last}`

// 1) фільтруємо, 2) сортуємо копію — тому сортування не ламає фільтри
const visibleUsers = computed<User[]>(() => {
  const result = users.value.filter(
    (u) =>
      (genderFilter.value === 'all' || u.gender === genderFilter.value) &&
      (ageFilter.value === 'all' || u.dob.age >= 18),
  )
  switch (sortOption.value) {
    case 'name-asc': return result.sort((a, b) => fullName(a).localeCompare(fullName(b), 'uk'))
    case 'name-desc': return result.sort((a, b) => fullName(b).localeCompare(fullName(a), 'uk'))
    case 'age-asc': return result.sort((a, b) => a.dob.age - b.dob.age)
    case 'age-desc': return result.sort((a, b) => b.dob.age - a.dob.age)
    default: return result
  }
})

function resetAll(): void {
  genderFilter.value = 'all'
  ageFilter.value = 'all'
  sortOption.value = 'none'
}
</script>

<template>
  <section>
    <div class="toolbar">
      <div class="toolbar__group">
        <button
          v-for="b in genderButtons"
          :key="b.value"
          type="button"
          :class="{ active: genderFilter === b.value }"
          @click="genderFilter = b.value"
        >
          {{ b.label }}
        </button>
      </div>
      <div class="toolbar__group">
        <button
          v-for="b in ageButtons"
          :key="b.value"
          type="button"
          :class="{ active: ageFilter === b.value }"
          @click="ageFilter = b.value"
        >
          {{ b.label }}
        </button>
      </div>
      <div class="toolbar__group">
        <button
          v-for="b in sortButtons"
          :key="b.value"
          type="button"
          :class="{ active: sortOption === b.value }"
          @click="sortOption = b.value"
        >
          {{ b.label }}
        </button>
      </div>
      <button
        type="button"
        @click="resetAll"
      >
        Очистити все
      </button>
    </div>

    <div
      v-if="visibleUsers.length"
      class="list"
    >
      <UserCard
        v-for="user in visibleUsers"
        :key="user.id"
        :user="user"
      />
    </div>
    <p
      v-else
      class="empty"
    >
      Список юзерів пустий
    </p>
  </section>
</template>

<style scoped>
.toolbar { display: flex; flex-wrap: wrap; gap: 16px; margin-bottom: 24px; }
.toolbar__group { display: flex; gap: 6px; }
button { padding: 6px 12px; border: 1px solid #9ca3af; border-radius: 8px; background: #fff; cursor: pointer; }
button.active { border-color: #2563eb; background: #2563eb; color: #fff; }
.list { display: grid; grid-template-columns: repeat(auto-fill, minmax(260px, 1fr)); gap: 20px; }
.empty { text-align: center; font-size: 1.2rem; color: #6b7280; }
</style>