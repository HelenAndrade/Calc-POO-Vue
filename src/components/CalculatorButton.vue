<template>
    <button @click="handleClick">{{ label }}</button>
  </template>
  
  <script lang="ts">
  import { defineComponent, PropType } from 'vue';
  
  export default defineComponent({
    name: 'CalculatorButton',
    props: {
      label: {
        type: String,
        required: true
      },
      onClick: {
        type: Function as PropType<() => void>,
        required: true
      }
    },
    methods: {
      handleClick() {
        this.onClick();
      }
    }
  });
  </script>
  
  <style scoped>
  button {
    width: 100%;
    height: 60px;
    font-size: 24px;
  }
  </style>
  