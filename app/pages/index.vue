<script setup lang="ts">
const responseData = ref<Reponse | null>()
const isPending = ref(false)

type Reponse = {
  answer: string,
  notes: {
    id: number,
    text: string,
    title: string,
    path: string,
  }[]
}

const submitHandler = async (event: Event) => {
  responseData.value = null
  isPending.value = true
  const target = event?.target as HTMLFormElement;
  const formData = new FormData(target);
  const query = formData.get('query')

  const response = await $fetch<Reponse>("/api/secret/query", {
    params: { query: query?.toString() ?? "" },
  })
    .catch(async (error) => {
      isPending.value = false
      if (error.statusCode == 401) {
        await navigateTo({
          path: "/login",
          query: { redirect: "/" },
        })
      }
    })

  responseData.value = response || null
  target.reset();
  isPending.value = false
}
</script>

<template lang="pug">
.space-y-8
  form(@submit.prevent="submitHandler")
    label Your query
      input(type="text" name="query" required)
    button(type="submit") Ask
  pre {{ isPending ? "Please wait..." : "" }}
  template(v-if="responseData")
    p {{ responseData.answer }}
    ul.flex.items-center.gap-4
      template(v-for="item in responseData.notes" :key='item.id')
        li.text-sm
          p {{ item.title }}
          p.text-xs {{ item.path }}
</template>
