export type Gender = 'male' | 'female'

export interface User {
  id: number
  gender: Gender
  name: { title: string; first: string; last: string }
  location: { city: string; state: string; country: string }
  email: string
  phone: string
  picture: string
  dob: { date: string; age: number }
  hobbies: string[]
  details: string
}

export type GenderFilter = 'all' | Gender
export type AgeFilter = 'all' | 'adult'
export type SortOption = 'none' | 'name-asc' | 'name-desc' | 'age-asc' | 'age-desc'