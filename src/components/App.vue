<template>
  <div id="app">
    <CalculatorComponent />
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import CalculatorComponent from './Calculator.vue';

export default defineComponent({
  name: 'App',
  components: {
    CalculatorComponent,
  },
});
</script>

<style>
</style>
