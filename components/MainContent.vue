<script setup lang="ts">
const userInput = ref('')
const birthdayWish = ref('')
const isLoading = ref(false)

async function generateWish() {
  isLoading.value = true

  const { data } = await useFetch('/api/generate', { method: 'post', body: { userInput: userInput.value } })

  isLoading.value = false

  if (data.value?.result)
    birthdayWish.value = data.value?.result
}

function clearData() {
  userInput.value = ''
  birthdayWish.value = ''
}
</script>

<template>
  <main class="w-full h-screen flex justify-center">
    <div class="max-w-4xl p-5 sm:py-0 lg:px-0 flex flex-col items-center">
      <h1 class="mt-5 sm:md-10 lg:mt-20 text-4xl sm:text-5xl lg:text-6xl text-center">
        Generate a birthday wish 🎉
      </h1>

      <form action="submit" class="w-full max-w-md flex flex-col mt-10 lg:mt-16" @submit.prevent="generateWish">
        <textarea
          v-model="userInput"
          class="
            w-full
            p-3
            outline-none
            border
            border-green-300
            rounded-md
            focus:outline-green-300
            focus:outline-2
            focus:outline-offset-0
            resize-none
          "
          placeholder="Marty McFly 17 high school student time travel guitar nike"
        />

        <button
          class="mt-5 p-2 border rounded-md bg-green-300 hover:bg-green-200"
          type="submit"
        >
          Generate a wish
        </button>

        <button
          v-if="birthdayWish"
          class="mt-5 p-2 border rounded-md bg-red-300 hover:bg-red-200 text-white"
          @click="clearData"
        >
          Clear Data
        </button>
      </form>

      <div class="h-full w-full flex items-center">
        <div v-if="isLoading" class="w-full grid grid-rows-3 gap-3 animate-pulse">
          <div class="grid grid-cols-3 gap-x-2">
            <div class="h-2 bg-slate-300 rounded col-span-2" />
            <div class="h-2 bg-slate-300 rounded col-span-1" />
          </div>

          <div class="h-2 bg-slate-300 rounded" />

          <div class="grid grid-cols-3 gap-x-2">
            <div class="h-2 bg-slate-300 rounded col-span-1" />
            <div class="h-2 bg-slate-300 rounded col-span-2" />
          </div>
        </div>

        <div v-else-if="birthdayWish" class="w-full p-5 bg-white rounded-xl border border-green-300">
          <p>
            {{ birthdayWish }}
          </p>
        </div>
      </div>
    </div>
  </main>
</template>

<style scoped>

</style>
