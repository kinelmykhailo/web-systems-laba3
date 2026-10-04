   import js from '@eslint/js'
   import pluginVue from 'eslint-plugin-vue'
   import { defineConfigWithVueTs, vueTsConfigs } from '@vue/eslint-config-typescript'

   export default defineConfigWithVueTs(
     { ignores: ['dist/**', 'node_modules/**'] },
     js.configs.recommended,
     pluginVue.configs['flat/recommended'],
     vueTsConfigs.recommended,
     {
       files: ['src/components/Users.vue'],
       rules: { 'vue/multi-word-component-names': 'off' },
     },
   )