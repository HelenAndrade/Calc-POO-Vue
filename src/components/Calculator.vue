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
import { defineComponent, inject } from 'vue';
import CalculatorButton from './CalculatorButton.vue';
import { Operation } from '../store/modules/Operation'; // Assumindo que você importará o enum a partir de um arquivo chamado operation.ts

export default defineComponent({
  name: 'CalculatorComponent',
  components: {
    CalculatorButton,
  },
  data() {
    return {
      calculator: inject('calculator') as any,
      operation: Operation,
      display: '',
      displayText: '',
      currentOperation: null as Operation | null,
      currentInput: '',
      buttonLabels: [
        '7', '8', '9', Operation.DIVIDE,
        '4', '5', '6', Operation.MULTIPLY,
        '1', '2', '3', Operation.SUBTRACT,
        'C', '0', '=', Operation.ADD
      ]
    };
  },
  methods: {
    handleButtonClick(label: string) {
      if (!label) return; // Adiciona verificação para label undefined

      if (label === 'C') {
        this.clear();
        return;
      }

      if (Object.values(this.operation).includes(label as Operation)) {
        this.setOperation(label as Operation);
        return;
      }

      if (label === '=') {
        this.calculate();
        return;
      }

      this.addToInput(label);
    },
    addToInput(value: string) {
      this.currentInput += value;
      if (this.currentOperation === null) {
        this.calculator.setNumA(parseFloat(this.currentInput));
      } else {
        this.calculator.setNumB(parseFloat(this.currentInput));
      }
      this.updateDisplay();
    },
    setOperation(op: Operation) {
      if (this.currentInput === '' && this.currentOperation) {
        this.currentOperation = op;
        this.updateDisplay();
        return;
      }

      if (this.currentOperation !== null) {
        this.calculate();
      }

      this.currentOperation = op;
      this.currentInput = '';
      this.updateDisplay();
    },
    calculate() {
      if (this.currentOperation !== null) {
        try {
          this.calculator.setOperation(this.currentOperation);
          const result = this.calculator.calculate();
          this.display = result.toString();
          this.calculator.setNumA(result);
          this.currentOperation = null;
          this.currentInput = result.toString();
        } catch (error) {
          this.display = (error as Error).message;
          this.clear();
        }
      }
      this.updateDisplay();
    },
    clear() {
      this.currentInput = '';
      this.currentOperation = null;
      this.display = '';
      this.displayText = '';
      this.calculator.setNumA(0);
      this.calculator.setNumB(0);
    },
    updateDisplay() {
      if (this.currentOperation === null) {
        this.displayText = this.currentInput;
      } else {
        this.displayText = `${this.calculator.getNumA()} ${this.currentOperation} ${this.currentInput}`;
      }
    }
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
