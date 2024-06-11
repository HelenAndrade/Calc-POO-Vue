<template>
    <button @click="handleClick">{{ label }}</button>
  </template>
  
  <script lang="ts">
  import { defineComponent } from 'vue';
  import type { PropType } from 'vue';
  
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
  
  <style >
  button {
    width: 100%;
    height: 60px;
    font-size: 24px;
  }
  </style>
  