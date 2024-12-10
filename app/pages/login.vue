<script setup lang="ts">
const submitHandler = async (event: Event) => {
  const target = event.target as HTMLFormElement;
  const formData = new FormData(target);

  const response = await $fetch(
    "/api/auth/login",
    {
      method: "POST",
      body: formData,
      onResponse: (data) => {
        console.log(data.response)
      }
    })

  target.reset();
};
</script>

<template lang="pug">
.is-container.py-2
  form(@submit.prevent="submitHandler")
    label Username
      input(type="text" name="username" autocomplete="username" required)
    label Password
      input(type="password" name="password" autocomplete="current-password" required)
    button(type="submit") Submit
</template>
