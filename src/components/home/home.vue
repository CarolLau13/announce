<template>
  <div id="home">
    <button @click="getData">开始</button>
  </div>
</template>

<script>
import { getMultidata } from "network/home.js";
export default {
  name: "Home",
  methods: {
    getData() {},
  },
};
</script>

<style scoped>
button {
  display: block;
  margin: 0 auto;
}
</style>