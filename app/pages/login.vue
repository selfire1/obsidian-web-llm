<script setup lang="ts">
const submitHandler = async (event: Event) => {
  const target = event.target as HTMLFormElement;
  const formData = new FormData(target);
  const formProps = Object.fromEntries(formData);
  target.reset();
  console.log(formProps);
};
</script>

<template lang="pug">
.is-container.py-2
  form(@submit.prevent="submitHandler")
    label Username
      input(type="text" name="username")
    label Password
      input(type="password" name="password")
    button(type="submit") Submit
</template>
