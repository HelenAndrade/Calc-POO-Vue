<template>
  <div class="calculator">
    <div class="display">{{ displayText }}</div>
    <div class="buttons">
      <CalculatorButton
        v-for="(label, index) in buttonLabels"
        :key="index"
        :label="label"
        :onClick="() => handleButtonClick(label)"
      />
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref, inject } from 'vue';

export default defineComponent({
  name: 'CalculatorComponent',
  setup() {
    const calculator = inject('calculator') as any;
    const operation = inject('operation') as any;
    const display = ref<string>('');
    const displayText = ref<string>('');
    let currentOperation: typeof operation | null = null;
    let currentInput: string = '';

    const buttonLabels = [
      '7', '8', '9', operation.DIVIDE,
      '4', '5', '6', operation.MULTIPLY,
      '1', '2', '3', operation.SUBTRACT,
      'C', '0', '=', operation.ADD
    ];

    const handleButtonClick = (label: string) => {
      if (label === 'C') {
        clear();
        return;
      }

      if (Object.values(operation).includes(label as typeof operation)) {
        setOperation(label as typeof operation);
        return;
      }

      if (label === '=') {
        calculate();
        return;
      }

      addToInput(label);
    };

    const addToInput = (value: string) => {
      currentInput += value;
      if (currentOperation === null) {
        calculator.setNumA(parseFloat(currentInput));
      } else {
        calculator.setNumB(parseFloat(currentInput));
      }
      updateDisplay();
    };

    const setOperation = (op: typeof operation) => {
      if (currentInput === '' && currentOperation) {
        currentOperation = op;
        updateDisplay();
        return;
      }

      if (currentOperation !== null) {
        calculate();
      }

      currentOperation = op;
      currentInput = '';
      updateDisplay();
    };

    const calculate = () => {
      if (currentOperation !== null) {
        try {
          calculator.setOperation(currentOperation);
          const result = calculator.calculate();
          display.value = result.toString();
          calculator.setNumA(result);
          currentOperation = null;
          currentInput = result.toString();
        } catch (error) {
          display.value = (error as Error).message;
          clear();
        }
      }
      updateDisplay();
    };

    const clear = () => {
      currentInput = '';
      currentOperation = null;
      display.value = '';
      displayText.value = '';
      calculator.setNumA(0);
      calculator.setNumB(0);
    };

    const updateDisplay = () => {
      if (currentOperation === null) {
        displayText.value = currentInput;
      } else {
        displayText.value = `${calculator.getNumA()} ${currentOperation} ${currentInput}`;
      }
    };

    return {
      displayText,
      buttonLabels,
      handleButtonClick
    };
  }
});
</script>

<style scoped>
.calculator {
  width: 220px;
  margin: 0 auto;
  border: 1px solid #ccc;
  border-radius: 5px;
  padding: 10px;
}

.display {
  height: 50px;
  font-size: 24px;
  text-align: right;
  margin-bottom: 10px;
  border: 1px solid #ccc;
  border-radius: 5px;
  padding: 10px;
}

.buttons {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 5px;
}

button {
  width: 100%;
  height: 60px;
  font-size: 24px;
  margin: 5px;
}
</style>
