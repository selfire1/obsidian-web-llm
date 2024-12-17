<script setup lang="ts">
import type { FetchError } from "ofetch"
const errorMsg = ref("")
const responseMsg = ref("")

const submitHandler = async (event: Event) => {
  // reset variables
  errorMsg.value = ""
  responseMsg.value = ""

  const target = event.target as HTMLFormElement;
  const formData = new FormData(target);

  try {
    const fetchResponse = await $fetch(
      "/api/auth/login",
      {
        method: "POST",
        body: formData,
      })
    responseMsg.value = JSON.stringify(fetchResponse, null, 2)
    target.reset();
    if (useRoute().query.redirect) {
      await navigateTo(useRoute().query.redirect as string)
    }
  } catch (e) {
    errorMsg.value = (e as FetchError)?.data
  }
}

const getSecret = async () => {
  try {
    const fetchResponse = await $fetch(
      "/api/secret/test",
      {
        method: "GET",
      })
    responseMsg.value = JSON.stringify(fetchResponse, null, 2)
  } catch (e) {
    errorMsg.value = (e as FetchError)?.data
  }
}
</script>

<template lang="pug">
.is-container.py-2.space-y-10
  template(v-if="$route.query.redirect")
    pre You need to log in first.

  form(@submit.prevent="submitHandler")
    label Username
      input(type="text" name="username" autocomplete="username" required)
    label Password
      input(type="password" name="password" autocomplete="current-password" required)
    button(type="submit") Submit
  div
    pre response: {{ responseMsg }}
    pre error: {{ errorMsg }}
    button(@click="getSecret") Get secret
</template>
